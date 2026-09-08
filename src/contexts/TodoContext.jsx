import { createContext, useContext, useReducer } from "react";

/**
 * TodoContext + useReducer 리팩토링 개요
 *
 * 기존에는 App.jsx가 useState로 todos / selectedCategory를 들고,
 * 등록·수정·삭제·필터 함수를 props로 자식에게 내려줬다 (Prop Drilling).
 *
 * 이제는
 *  1) useReducer 가 "어떤 일이 일어났는지(action)"에 따라 상태를 한곳에서 갱신하고
 *  2) Context     가 그 상태와 액션 함수를 트리 어디서든 꺼내 쓸 수 있게 한다.
 *
 * 모달 열림 여부, 폼 입력값처럼 한 컴포넌트에서만 쓰는 UI 상태는
 * 전역으로 올리지 않고 기존처럼 로컬 useState를 유지한다.
 */

// ---------------------------------------------------------------------------
// 1. 초기 데이터 / 초기 상태
// ---------------------------------------------------------------------------

/** 앱 시작 시 보여줄 샘플 할일 목록 (더미 데이터) */
const dummyTodos = [
  {
    id: 1,
    title: "React 공부",
    summary: "React를 공부한다.",
    category: "TODO",
  },
  {
    id: 2,
    title: "점심 먹기",
    summary: "점심을 먹는다.",
    category: "PROGRESS",
  },
  {
    id: 3,
    title: "커피 마시기",
    summary: "커피를 마신다.",
    category: "DONE",
  },
];

/**
 * useReducer의 초기 state.
 * todos: 전체 할일 목록
 * selectedCategory: 필터 드롭다운 값 (ALL | TODO | PROGRESS | DONE)
 */
const initialState = {
  todos: dummyTodos,
  selectedCategory: "ALL",
};

// ---------------------------------------------------------------------------
// 2. 액션 타입 상수
// ---------------------------------------------------------------------------
// 문자열을 여기저기 직접 쓰면 오타가 나도 런타임에야 발견된다.
// 상수로 모아 두면 dispatch({ type: TODO_ACTIONS.ADD }) 처럼 안전하게 쓸 수 있다.

export const TODO_ACTIONS = {
  ADD: "ADD", // 할일 등록
  UPDATE: "UPDATE", // 할일 수정
  DELETE: "DELETE", // 할일 삭제
  FILTER: "FILTER", // 카테고리 필터 변경
};

// ---------------------------------------------------------------------------
// 3. Reducer — 순수 함수로 상태 전환만 담당
// ---------------------------------------------------------------------------
/**
 * reducer(state, action) => nextState
 *
 * - 반드시 새로운 객/배열을 반환한다 (불변성). 기존 state를 직접 수정하면 리렌더가 안 된다.
 * - 사이드이펙트(API 호출, UUID 생성 등)는 reducer 안에서 하지 않는다.
 *   UUID는 Provider의 addTodo에서 만든 뒤 payload로 넘긴다.
 *
 * @param {{ todos: Array, selectedCategory: string }} state 현재 상태
 * @param {{ type: string, payload?: any }} action 발생한 일
 */
const todoReducer = (state, action) => {
  switch (action.type) {
    // payload: { id, title, summary, category }
    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    // payload: { id, title, summary, category }  (id가 같은 항목만 교체)
    case TODO_ACTIONS.UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    // payload: 삭제할 할일의 id
    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    // payload: 'ALL' | 'TODO' | 'PROGRESS' | 'DONE'
    case TODO_ACTIONS.FILTER:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    // 알 수 없는 액션은 현재 상태를 그대로 반환 (안전장치)
    default:
      return state;
  }
};

// ---------------------------------------------------------------------------
// 4. Context 객체
// ---------------------------------------------------------------------------
// createContext()로 만든 객체 자체는 "통로"일 뿐, 실제 값은 Provider가 넣어 준다.

// 1. 할 일 데이터를 제공하는 컨텍스트 (객체 생성)
const TodoContext = createContext(null);

// ---------------------------------------------------------------------------
// 5. Provider — App 트리를 감싸서 state / dispatch 기반 함수를 공급
// ---------------------------------------------------------------------------

export const TodoProvider = ({ children }) => {
  // useReducer(리듀서함수, 초기상태) → [현재상태, dispatch]
  // dispatch({ type, payload }) 를 호출하면 reducer가 실행되고, 새 state로 리렌더된다.
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // ----- 컴포넌트에서 쓰기 쉬운 액션 함수 (dispatch를 감싼 헬퍼) -----

  /** 할일 등록. 폼에서 받은 객체에 id를 붙여 ADD 액션을 보낸다. */
  const addTodo = (todo) => {
    dispatch({
      type: TODO_ACTIONS.ADD,
      payload: {
        id: self.crypto.randomUUID(),
        ...todo,
      },
    });
  };

  /**
   * 할일 수정
   * @param {Object} updateTodo id를 포함한 갱신된 할일 객체
   */
  const updateTodo = (updateTodo) => {
    dispatch({
      type: TODO_ACTIONS.UPDATE,
      payload: updateTodo,
    });
  };

  /** 할일 삭제 */
  const deleteTodo = (id) => {
    dispatch({
      type: TODO_ACTIONS.DELETE,
      payload: id,
    });
  };

  /** 필터 카테고리 변경 */
  const setFilter = (category) => {
    dispatch({
      type: TODO_ACTIONS.FILTER,
      payload: category,
    });
  };

  // 필터링 결과는 state에 넣지 않고, 매번 파생(derived)한다.
  // ALL이면 전체, 그 외에는 category가 일치하는 항목만.
  const filteredTodos =
    state.selectedCategory === "ALL"
      ? state.todos
      : state.todos.filter((todo) => todo.category === state.selectedCategory);

  // Provider의 value가 바뀌면, 이 Context를 구독하는 모든 컴포넌트가 리렌더된다.
  const value = {
    todos: state.todos,
    selectedCategory: state.selectedCategory,
    filteredTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// ---------------------------------------------------------------------------
// 6. 커스텀 훅 — Context를 안전하게 꺼내 쓰기
// ---------------------------------------------------------------------------
/**
 * 자식 컴포넌트는 useTodos()만 호출하면 된다.
 * Provider 밖에서 호출하면 바로 에러를 던져, 감싸는 위치를 놓친 실수를 빨리 찾는다.
 */
export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error(
      "useTodos는 TodoProvider 안에서만 사용할 수 있습니다. App을 TodoProvider로 감싸 주세요.",
    );
  }

  return context;
};
