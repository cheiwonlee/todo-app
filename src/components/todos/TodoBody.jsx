import { useTodos } from "@/contexts/TodoContext";
import TodoItem from "./TodoItem";

/**
 * 필터링된 할일 목록을 렌더링한다.
 * App → TodoBody 로 todos / onUpdate / onDelete 를 넘기던 Prop Drilling이 사라졌다.
 * 목록 데이터는 Context의 filteredTodos(파생 값)를 사용한다.
 */
const TodoBody = () => {
  const { filteredTodos } = useTodos();

  const todoList = filteredTodos.map((todo) => (
    // 각 항목의 todo 객체만 props로 넘긴다.
    // 수정/삭제는 TodoItem이 Context에서 직접 호출한다.
    <TodoItem todo={todo} key={todo.id} />
  ));

  return <>{todoList}</>;
};

export default TodoBody;
