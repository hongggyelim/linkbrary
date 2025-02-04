import { FaAngleUp } from "react-icons/fa6";

const Controller = () => {
  const handleClickToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-3 fixed bottom-[50px] right-10">
      <button
        type="button"
        onClick={handleClickToTop}
        className="rounded-full border text-white bg-orange50 bg-opacity-70 border-orange100 size-[35px] flex items-center justify-center"
      >
        <FaAngleUp fill="white" />
      </button>
      <button
        type="button"
        onClick={handleClickToBottom}
        className="rounded-full border text-white bg-orange50 bg-opacity-70 border-orange100 size-[35px] flex items-center justify-center"
      >
        <FaAngleUp className="rotate-180" fill="white" />
      </button>
    </div>
  );
};
export default Controller;
