import { useState } from "react";
import TodoFilter from "./TodoFilter";
import { createPortal } from "react-dom";
import Modal from "./ui/Modal";
import TodoForm from "./TodoForm";
// react-dom 이라는 최상위 객체(object)에서 createPortal이라는 함수 프로퍼티만 추출

// TodoHeader라는 변수에 화살표 함수를 할당 -> 함수형(태) 컴포넌트 => HTML 엘리먼트 묶음을 반환
const TodoHeader = () => {
  const [openModal, open] = useState(false); // 2개 요소 배열을 반환 (변수, 함수)
  // openModal은 true/false 중 하나의 값을 가진 상태 변수
  // open : 상태 변수의 값을 변경시키는 트리거 함수
  // openModal, open이라는 이름은 임의적으로 정한 것
  console.log(openModal); //true/false가 잘 변경되는지?

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
          onClick={() => open(true)}
          className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
          data-cy="add-todo-button"
        >
          Add Todo
        </button>

        {/* Modal 렌더링 코드 */}
        {openModal &&
          createPortal(
            /// Modal 컴포넌트에게 onClose라는 이름의 props로 open 함수 시그니처를 전달
            // 여기서 () => open(false)는 "지금 즉시 open(false)를 실행해라!"가 아니라,
            // "open(false)를 실행하는 동작을 상자에 예쁘게 담아서(포장해서) 자식에게 넘겨줘라!"라는 뜻
            <Modal onClose={() => open(false)}>
              <TodoForm onClose={() => open(false)} />
            </Modal>, // 렌더링할 컴포넌트
            document.body, // 렌더링할 위치
          )}

        <TodoFilter />
      </div>
    </div>
  );
};

export default TodoHeader;
