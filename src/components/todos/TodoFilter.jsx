import { TODO_CATEGORY_ICON } from "@/constants/icon";
import { useTodos } from "@/contexts/TodoContext";

/**
 * 카테고리 필터 셀렉트.
 * selectedCategory와 setFilter를 Context에서 바로 가져오므로
 * TodoHeader를 거쳐 props를 받을 필요가 없다.
 */
const TodoFilter = () => {
  const { selectedCategory, setFilter } = useTodos();

  return (
    <select
      className="p-2 text-gray-100 bg-gray-800 rounded"
      data-cy="todo-filter"
      value={selectedCategory}
      onChange={(event) => setFilter(event.target.value)}
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
