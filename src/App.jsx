import { useState } from "react";
import TodoBody from "./components/TodoBody";
import TodoHeader from "./components/TodoHeader";
import DefaultLayout from "./layouts/DefaultLayout";

// 서버에서 받은 todos 더미데이터(TodoBody에 내려줘야 함 부모 -> 자식)
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

// App이라는 이름의 함수(JS 문법)
function App() {
  console.log("App.jsx 렌더링 됨");

  // todos라는 상태변수의 초기값을 dummyTodos로 초기화
  // 📌 state: 컴포넌트가 "기억"하는 값. 바뀌면 화면이 다시 그려짐(리렌더링)
  const [todoList, setTodos] = useState(dummyTodos);

  // 📌 필터 상태: "어떤 카테고리만 보여줄지"를 기억
  // ALL | TODO | PROGRESS | DONE
  const [filter, setFilter] = useState("ALL");

  /**
   * @param {Object} todo - 할 일 객체 { title, summary, category }
   */
  // 할 일 등록 추가 함수
  const addTodoHandler = (todo) => {
    // id 값을 추가한 새로운 할 일 객체
    const newTodo = {
      // randomUUID() ← 괄호가 있어야 "함수 호출"이 되어 실제 UUID 문자열이 생성됨
      id: self.crypto.randomUUID(),
      ...todo, // spreading(풀어헤침): 객체 내 프로퍼티를 풀어헤침
    };
    // 불변성(immutability): 기존 배열을 직접 수정하지 않고, 새 배열을 만들어 교체
    // [...todoList, newTodo] = 기존 할 일들 + 새 할 일
    const updatedTodos = [...todoList, newTodo];
    // 상태값 변경 가능한 유일 트리거 함수, 새 할 일 목록 전달
    setTodos(updatedTodos);
  };

  /**
   * @param {Object} updatedTodo - 수정된 할 일 객체 { id, title, summary, category }
   */
  // 할 일 수정 함수
  // 📌 고차함수 map: 배열의 각 요소를 변환해서 "같은 길이의 새 배열"을 만듦
  //    → "이 id만 바꾸고, 나머지는 그대로" 패턴에 자주 씀
  const updateTodoHandler = (updatedTodo) => {
    const updatedTodos = todoList.map((todo) =>
      // 삼항 연산자: 조건 ? 참일 때 값 : 거짓일 때 값
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);
  };

  /**
   * @param {string|number} id - 삭제할 할 일의 id
   */
  // 할 일 삭제 함수
  // 📌 고차함수 filter: 조건에 맞는 요소만 남긴 "새 배열"을 만듦
  //    → "이 id만 빼고 나머지 유지" 패턴에 자주 씀
  const deleteTodoHandler = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  /**
   * @param {string} selectedFilter - 선택한 필터 값 (ALL | TODO | PROGRESS | DONE)
   */
  // 필터 변경 함수 (TodoFilter → TodoHeader → App 으로 props 전달받아 호출됨)
  const filterChangeHandler = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // 📌 화면에 보여줄 목록 = filter 상태에 따라 todoList를 걸러낸 결과
  // filter가 "ALL"이면 전부, 아니면 category가 일치하는 것만
  const filteredTodos = todoList.filter((todo) => {
    if (filter === "ALL") {
      return true; // 전부 통과(표시)
    }
    return todo.category === filter;
  });

  return (
    <>
      <DefaultLayout>
        {/*
          📌 props 내려주기(부모 → 자식):
          - onAdd: 등록 함수
          - filter / onFilter: 필터 값과 변경 함수
          자식은 상태 자체를 직접 바꾸지 못하고, 부모가 준 함수를 호출해서 요청함
        */}
        <TodoHeader
          onAdd={addTodoHandler}
          filter={filter}
          onFilter={filterChangeHandler}
        />
        {/*
          원본 todoList가 아니라 filteredTodos를 내려줌
          → 필터링은 App에서, 화면 표시는 TodoBody에서 담당 (역할 분리)
        */}
        <TodoBody
          todos={filteredTodos}
          onUpdate={updateTodoHandler}
          onDelete={deleteTodoHandler}
        />
      </DefaultLayout>
    </>
  );
}

export default App;
