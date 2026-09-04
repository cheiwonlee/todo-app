// children props : React에서 공식적으로 제공하는 특별한 props
// onClose : 우리가 자의적으로 정한 props
const Modal = ({ onClose, children }) => {
  return (
    <>
      {/* Modal 배경 흐릿한(blur) 부분 */}
      <div
        onClick={onClose} // onClose()를 쓰면 안 됨. 바로 호출되기 때문. 시그니처만 넘겨줘야 onClick을 눌렀을 때만 호출됨.
        data-cy="modal-backdrop"
        className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-1"
      ></div>

      {/* Modal dialog 부분 */}
      <div className="fixed z-10 w-1/2 p-8 m-0 transform -translate-x-1/2 -translate-y-1/2 border-none rounded shadow-xl top-1/2 left-1/2 bg-slate-500">
        {children}
      </div>
    </>
  );
};

export default Modal;
