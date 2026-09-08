import TodoBody from "./components/todos/TodoBody";
import TodoHeader from "./components/todos/TodoHeader";
import { TodoProvider } from "./contexts/TodoContext";
import DefaultLayout from "./layouts/DefaultLayout";

/**
 * App은 더 이상 할일 상태(useState)와 핸들러를 직접 들고 있지 않다.
 * TodoProvider가 Context + useReducer로 상태를 관리하고,
 * 자식들은 useTodos()로 필요한 값만 꺼내 쓴다.
 */
function App() {
  return (
    <TodoProvider>
      <DefaultLayout>
        <h1 className="pt-8 mx-auto text-red-200 max-w-max text-7xl">
          <img
            className="ml-4"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png"
            alt="Thought Balloon"
            width="75"
            height="75"
          />
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seal.png"
            alt="Seal"
            width="75"
            height="75"
          />
        </h1>
        {/* 등록/필터에 쓰이던 onAdd, category, onFilter props를 제거했다 */}
        <TodoHeader />
        {/* 목록에 쓰이던 todos, onUpdate, onDelete props를 제거했다 */}
        <TodoBody />
      </DefaultLayout>
    </TodoProvider>
  );
}

export default App;
