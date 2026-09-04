import { useState } from "react";
import { createPortal } from "react-dom";
import { TODO_CATEGORY_ICON } from "@/constants/icon";
import Modal from "./ui/Modal";
import TodoForm from "./TodoForm";

// rafce -> 'R'eact 'A'rrow 'f'unction 'C'omponent 'e'xport default
/**
 * 할 일 1개를 그리는 컴포넌트
 * @param {Object} todo - 할 일 데이터 { id, title, summary, category }
 * @param {Function} onUpdate - App의 updateTodoHandler
 * @param {Function} onDelete - App의 deleteTodoHandler
 */
const TodoItem = ({ todo, onUpdate, onDelete }) => {
  // 📌 수정 모달도 "열림/닫힘"이 필요한 로컬 UI 상태 → 이 컴포넌트 안에서 useState로 관리
  // (할 일 데이터 자체는 App이 소유, 모달 표시 여부만 TodoItem이 소유)
  const [openModal, open] = useState(false);

  return (
    <li className="flex gap-4 justify-between my-4 py-4 px-4 border-[1px] bg-gray-700 rounded-md shadow-xl">
      <div>
        <span className="text-lg font-medium text-gray-300">
          {TODO_CATEGORY_ICON[todo.category]}
        </span>
        <div>
          <h2
            data-test="title"
            className="mb-0 text-lg font-bold text-gray-100 uppercase"
          >
            {todo.title}
          </h2>
          <p className="mt-2 text-base text-gray-200">{todo.summary}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* 수정 버튼: 모달을 연다 (실제 데이터 수정은 TodoForm → onUpdate → App) */}
        <button type="button" onClick={() => open(true)}>
          {`✏️`}
        </button>
        {/*
          삭제 버튼:
          onClick={() => onDelete(todo.id)}
          → "지금 바로 삭제"가 아니라, "클릭되면 id를 넘겨서 onDelete를 호출해라"라는 함수를 등록
          부모(App)의 deleteTodoHandler가 실행되며 filter로 해당 id를 제거함
        */}
        <button type="button" onClick={() => onDelete(todo.id)}>
          {`🗑️`}
        </button>
      </div>

      {/* 수정용 Modal — Add Todo와 같은 createPortal 패턴 */}
      {openModal &&
        createPortal(
          <Modal onClose={() => open(false)}>
            {/*
              수정 모드: todo prop을 넘기면 TodoForm이 기존 값으로 채워짐
              onUpdate만 넘기고 onAdd는 안 넘김 (역할이 다름)
            */}
            <TodoForm
              todo={todo}
              onUpdate={onUpdate}
              onClose={() => open(false)}
            />
          </Modal>,
          document.body,
        )}
    </li>
  );
};

export default TodoItem;
