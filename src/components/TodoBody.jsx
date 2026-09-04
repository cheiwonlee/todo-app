import TodoItem from "./TodoItem";

// 전달된 Props 객체 내부에서 todos라는 키(Key)만 바로 쏙 꺼내서 변수로 사용하겠다는 뜻
// todos로 쓸 때 (중괄호 없음)
// 첫 번째 인자 전체(Props 객체)를 todos라는 이름의 변수로 받게 됨.

/**
 * 할 일 목록을 화면에 그리는 컴포넌트
 * @param {Array} todos - 화면에 보여줄 할 일 배열 (이미 App에서 필터링된 결과)
 * @param {Function} onUpdate - 수정 요청을 App으로 올릴 함수
 * @param {Function} onDelete - 삭제 요청을 App으로 올릴 함수
 */
const TodoBody = ({ todos, onUpdate, onDelete }) => {
  // 📌 고차함수 map: 배열 → JSX 배열로 변환 (데이터 1개당 <TodoItem /> 1개)
  // key={todo.id}: React가 "어떤 항목이 바뀌었는지" 빠르게 구분하기 위한 고유 식별자
  //   (index를 key로 쓰면 삭제/정렬 시 버그가 날 수 있어서 id를 권장)
  const todoList = todos.map((todo) => (
    <TodoItem
      todo={todo}
      key={todo.id}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  ));

  // 필터 결과가 비어 있을 때 안내 문구 (학습용 UX)
  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-gray-600">
        표시할 할 일이 없습니다.
      </p>
    );
  }

  return <div>{todoList}</div>;
};

export default TodoBody;
