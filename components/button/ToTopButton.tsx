import { FaAngleUp } from "react-icons/fa6";

const ToTopButton = () => {
  const handleClickToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickToTop}
        className="fixed bottom-10 right-10 rounded-full border bg-orange50 bg-opacity-70 border-orange100 size-[40px] flex items-center justify-center"
      >
        <FaAngleUp fill="orange100" />
      </button>
    </>
  );
};
export default ToTopButton;
