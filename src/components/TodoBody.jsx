import TodoItem from "./TodoItem";

// 전달된 Props 객체 내부에서 todos라는 키(Key)만 바로 쏙 꺼내서 변수로 사용하겠다는 뜻
// todos로 쓸 때 (중괄호 없음)
// 첫 번째 인자 전체(Props 객체)를 todos라는 이름의 변수로 받게 됨.

const TodoBody = ({ todos }) => {
  const todoList = todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

  return <div>{todoList}</div>;
};

export default TodoBody;
