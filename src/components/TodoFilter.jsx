import { TODO_CATEGORY_ICON } from "@/constants/icon";

/**
 * 필터 선택 UI
 * 📌 제어 컴포넌트(controlled component) 예시
 * - value={filter}: 현재 선택된 값이 "부모 state"에서 내려옴
 * - onChange: 사용자가 바꾸면 부모에게 "이 값으로 바꿔줘"라고 알림
 * → 진짜 데이터(상태)의 주인은 App, 이 컴포넌트는 UI만 담당
 */
const TodoFilter = ({ filter, onFilter }) => {
  return (
    <select
      className="p-2 text-gray-100 bg-gray-800 rounded"
      data-cy="todo-filter"
      // 📌 value로 현재 filter 상태를 연결 → 화면과 데이터가 항상 일치
      value={filter}
      // 📌 event.target.value = 사용자가 선택한 <option>의 value
      onChange={(event) => onFilter(event.target.value)}
    >
      <option value="ALL">All</option>
      <option value="TODO">{TODO_CATEGORY_ICON.TODO} To do</option>
      <option value="PROGRESS">
        {TODO_CATEGORY_ICON.PROGRESS} On progress
      </option>
      <option value="DONE">{TODO_CATEGORY_ICON.DONE} Done</option>
    </select>
  );
};

export default TodoFilter;
