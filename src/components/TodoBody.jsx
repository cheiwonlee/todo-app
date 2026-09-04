import TodoItem from "./TodoItem";

// todos 더미데이터
const todos = [
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

const todoList = todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

const TodoBody = () => {
  return <div>{todoList}</div>;
};

export default TodoBody;
