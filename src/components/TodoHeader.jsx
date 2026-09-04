import TodoFilter from "./TodoFilter";

// TodoHeader라는 변수에 화살표 함수를 할당 -> 함수형(태) 컴포넌트 => HTML 엘리먼트 묶음을 반환
const TodoHeader = () => {
  return (
    <div>
      <header>
        <h1 className="pt-8 mx-auto text-red-200 max-w-max text-7xl">
          <img
            className="ml-4"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Thought%20Balloon.png"
            alt="Thought Balloon"
            width="75"
            height="75"
          />
          <img
            src="https://avatars.githubusercontent.com/u/94828802?s=400&u=6c8d715f0388550cc27c112c587a7957083de0a8&v=4"
            alt="Seal"
            width="75"
            height="75"
          />
        </h1>
      </header>
      <div className="flex items-center justify-between mb-2" id="task-control">
        <button
          className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
          data-cy="add-todo-button"
        >
          Add Todo
        </button>

        <TodoFilter />
      </div>
    </div>
  );
};

export default TodoHeader;
