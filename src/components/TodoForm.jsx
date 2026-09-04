import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { useState } from "react";

/**
 * 할 일 등록 / 수정 폼 (하나의 컴포넌트로 두 모드 처리)
 *
 * 📌 props로 "모드"를 구분하는 패턴
 * - todo가 없으면 → 등록(Add) 모드
 * - todo가 있으면 → 수정(Edit) 모드 (기존 값을 초기값으로 사용)
 *
 * @param {Function} onClose - 모달 닫기
 * @param {Function} [onAdd] - 등록 시 App의 addTodoHandler 호출
 * @param {Function} [onUpdate] - 수정 시 App의 updateTodoHandler 호출
 * @param {Object} [todo] - 수정 대상 할 일 (있으면 수정 모드)
 */
const TodoForm = ({ onClose, onAdd, onUpdate, todo }) => {
  // todo가 있으면 true → 수정 모드
  const isEditMode = !!todo;

  // title, summary, category까지 사용자가 입력한 값을 바인딩하여 보관
  // useState(초기값) - 초기값은 ''(공백), 숫자, 문자, 배열, 객체 등 모두 가능
  // const [상태변수, 상태를 변경하는 "유일한" 트리거 함수]
  //
  // 📌 수정 모드면 기존 todo 값으로 초기화, 등록 모드면 빈 문자열/기본 카테고리
  // todo?.title ?? "" → todo가 있으면 title, 없으면 ""
  const [title, setTitle] = useState(todo?.title ?? "");
  const [summary, setSummary] = useState(todo?.summary ?? "");
  // 카테고리 옵션 value와 맞추기 위해 대문자 "TODO" 사용
  const [category, setCategory] = useState(todo?.category ?? "TODO");

  // 등록 또는 수정 제출
  const handleSubmit = () => {
    if (isEditMode) {
      // 수정: id는 유지하고, 입력한 값만 갱신해서 부모에게 전달
      onUpdate({
        id: todo.id,
        title,
        summary,
        category,
      });
    } else {
      // 등록: id는 App의 addTodoHandler에서 붙임
      const newTodo = { title, summary, category };
      onAdd(newTodo);
    }
    onClose();
  };

  return (
    <>
      {/* 모드에 따라 제목만 다르게 표시 */}
      <h3 className="text-3xl text-red-200">
        {isEditMode ? "할일 수정" : "할일 등록"}
      </h3>
      <form className="my-2">
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="title">
            Title
          </label>
          {/*
            📌 제어 컴포넌트: value={title} + onChange로 state와 input을 양방향 연결
            - 사용자가 타이핑 → setTitle → title 변경 → value가 다시 반영
            - 수정 모드에서 기존 값이 보이려면 value 연결이 필수
          */}
          <input
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="summary">
            Summary
          </label>
          <textarea
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="summary"
            rows="5"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="category">
            Category
          </label>
          <select
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="TODO">{TODO_CATEGORY_ICON.TODO} To do</option>
            <option value="PROGRESS">
              {TODO_CATEGORY_ICON.PROGRESS} On progress
            </option>
            <option value="DONE">{TODO_CATEGORY_ICON.DONE} Done</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-xl text-white"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 text-xl text-red-200"
            type="button"
          >
            {/* 모드에 따라 버튼 문구도 다르게 */}
            {isEditMode ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
