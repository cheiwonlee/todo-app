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
  // console.log(todoList); // [<TodoItem/>, <TodoItem/>, <TodoItem/>];가 들어있음

  return (
    <>
      <DefaultLayout>
        <TodoHeader />
        <TodoBody todos={dummyTodos} />
      </DefaultLayout>
    </>
  );
}

export default App;
