import { useState } from "react";
import Modal from "../ui/Modal";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";

import { createPortal } from "react-dom";

/**
 * 할일 등록 버튼 + 필터.
 * 등록/필터 로직은 Context(useTodos)가 담당하므로
 * 더 이상 onAdd, category, onFilter 를 props로 받지 않는다.
 *
 * openModal만 이 컴포넌트의 로컬 상태다 — 모달을 연 곳에서만 필요한 UI 상태이기 때문.
 */
const TodoHeader = () => {
  // Modal의 열기/닫기 여부를 관리하는 상태값
  const [openModal, open] = useState(false);

  return (
    <div className="flex items-center justify-between mb-2" id="task-control">
      <button
        onClick={() => open(true)}
        className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
        data-cy="add-todo-button"
      >
        할일 등록
      </button>

      {openModal &&
        createPortal(
          // Modal 컴포넌트에게 onClose라는 이름의 props로 닫기 함수를 전달
          <Modal onClose={() => open(false)}>
            <TodoForm actionTitle={"등록"} onClose={() => open(false)} />
          </Modal>, // 렌더링할 대상 컴포넌트
          document.body, // 렌더링할 위치
        )}

      <TodoFilter />
    </div>
  );
};

export default TodoHeader;
