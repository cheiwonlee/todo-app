import TodoBody from "./components/TodoBody";
import TodoHeader from "./components/TodoHeader";
import DefaultLayout from "./layouts/DefaultLayout";

// App이라는 이름의 함수(JS 문법)
function App() {
  // console.log(todoList); // [<TodoItem/>, <TodoItem/>, <TodoItem/>];가 들어있음

  return (
    <>
      <DefaultLayout>
        <TodoHeader />

        {/* TodoItem이라는 이름으로 3개를 렌더링해보기 */}
        {/* <TodoItem /> */}

        {/* todo는 todos 배열에서 첫 번째 요소(할일 객체)를 하나씩 순회할때 사용할 지역변수 */}
        {/* {todoList} */}
        <TodoBody></TodoBody>
      </DefaultLayout>
    </>
  );
}

export default App;
