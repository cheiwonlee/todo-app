// 메인 페이지에서 사용할 전체 기본 레이아웃이 되는 컴포넌트
const DefaultLayout = ({ children }) => {
  // children props
  return (
    <div className="w-full h-full overflow-y-scroll bg-cyan-100">
      <div className="max-w-xl mx-auto min-w-[20rem]">{children}</div>
    </div>
  );
};

export default DefaultLayout;
