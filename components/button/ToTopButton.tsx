import { FaAngleUp } from "react-icons/fa6";

const ToTopButton = () => {
  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickToTop}
        className="fixed bottom-[50px] right-10 rounded-full border text-white bg-orange50 bg-opacity-70 border-orange100 size-[35px] flex items-center justify-center"
      >
        <FaAngleUp fill="orange100" />
      </button>
    </>
  );
};
export default ToTopButton;
