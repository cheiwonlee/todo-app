import React, { useState } from "react";
import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { useTodos } from "@/contexts/TodoContext";
import IconButton from "../ui/IconButton";
import TodoForm from "./TodoForm";
import { createPortal } from "react-dom";
import Modal from "../ui/Modal";

/**
 * 할일 한 건을 보여주는 카드.
 * todo 자체는 "이 아이템의 데이터"이므로 props로 받는 것이 맞다.
 * (전역 Context에 현재 클릭한 항목을 넣으면 다른 카드와 상태가 섞인다)
 *
 * 삭제/수정은 useTodos()의 deleteTodo / updateTodo(폼 내부)를 사용한다.
 */
const TodoItem = ({ todo }) => {
  const { deleteTodo } = useTodos();

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
        <IconButton icon={"✏️"} onClick={() => open(true)} />
        <IconButton icon={"🗑"} onClick={() => deleteTodo(todo.id)} />
      </div>

      {openModal &&
        createPortal(
          <Modal onClose={() => open(false)}>
            <TodoForm
              actionTitle={"수정"}
              onClose={() => open(false)}
              todo={todo}
            />
          </Modal>,
          document.body,
        )}
    </li>
  );
};

export default TodoItem;
