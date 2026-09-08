import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { useTodos } from "@/contexts/TodoContext";
import { useState } from "react";

/**
 * 할일 등록/수정 폼.
 * 예전에는 onAction(등록 또는 수정 함수)을 props로 내려받았다.
 * 이제는 useTodos()로 addTodo / updateTodo를 직접 꺼내 쓴다.
 *
 * 제목·요약·카테고리 입력값은 이 폼이 열려 있는 동안만 필요하므로 로컬 useState를 유지한다.
 *
 * @param {string} actionTitle '등록' 또는 '수정' — 모드를 구분하는 플래그
 * @param {Function} onClose 모달 닫기 (UI 상태이므로 Header/Item이 넘겨 줌)
 * @param {Object} [todo] 수정 모드일 때 기존 할일 객체
 */
const TodoForm = ({ actionTitle, onClose, todo }) => {
  const { addTodo, updateTodo } = useTodos();

  const isNewTodoForm = actionTitle.startsWith("등록") ? true : false;

  const [title, setTitle] = useState(isNewTodoForm ? "" : todo.title);
  const [summary, setSummary] = useState(isNewTodoForm ? "" : todo.summary);
  const [category, setCategory] = useState(
    isNewTodoForm ? "TODO" : todo.category,
  );

  // 활성화된 Modal의 구분에 따라 할일 등록/수정 처리
  const todoActionHandler = () => {
    if (isNewTodoForm) {
      // 등록: id는 Context의 addTodo 안에서 생성한다
      addTodo({ title, summary, category });
    } else {
      // 수정: 기존 할일의 id를 함께 넘겨 reducer가 같은 항목을 교체하게 한다
      updateTodo({
        id: todo.id,
        title,
        summary,
        category,
      });
    }

    onClose();
  };

  return (
    <>
      <h3 className="text-3xl text-red-200">할일 {actionTitle}</h3>
      <form className="my-2">
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="title">
            Title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            type="text"
            id="title"
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="summary">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="summary"
            rows="5"
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="category">
            Category
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="category"
          >
            <option value="TODO">{TODO_CATEGORY_ICON.TODO} To do</option>
            <option value="PROGRESS">
              {TODO_CATEGORY_ICON.PROGRESS} On progress
            </option>
            <option value="DONE">{TODO_CATEGORY_ICON.DONE} Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-xl text-white" type="button">
            취소
          </button>
          <button
            onClick={todoActionHandler}
            className="px-6 py-3 text-xl text-red-200"
            type="button"
          >
            {actionTitle}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
