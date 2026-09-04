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
  }, //
];

// App이라는 이름의 함수(JS 문법)
function App() {
  // console.log(todoList); // [<TodoItem/>, <TodoItem/>, <TodoItem/>];가 들어있음
  console.log("App.jsx 렌더링 됨");

  // todos라는 상태변수의 초기값을 dummyTodos로 초기화
  const [todoList, setTodos] = useState(dummyTodos);

  // 문서화 주석
  /**
   * @param {Object} todo, 할 일 객체
   */

  // 할 일 등록 추가 함수
  const addTodoHandler = (todo) => {
    console.log(todo);
    // TODO: 이따 구현하기

    // id 값을 추가한 새로운 할 일 객체
    const newTodo = {
      id: self.crypto.randomUUID, // todoList 마지막 값 +1, 랜덤값 등. ID 식별용 랜덤값 생성 코드
      // title: todo.title,
      // summay:todo.summary

      ...todo, // spreding (풀어헤침) : 객체 내 프로퍼티를 풀어헤침
      // 프로퍼티들이 현재 객체 내부에 분리됨
    };
    // 할 일 상태값 업데이트
    // 업데이트 할 새로운 할 일 배열(객체) 생성 (배열도 객체)
    const updatedTodoes = [...todoList, newTodo]; // 🆕
    // dummyTodos.push(todo);
    // 상태값 변경 가능한 유일 트리거 함수, 새 할 일 목록 전달
    setTodos(updatedTodoes);
  };

  return (
    <>
      <DefaultLayout>
        <TodoHeader onAdd={addTodoHandler} />
        <TodoBody todos={todoList} />
      </DefaultLayout>
    </>
  );
}

export default App;
