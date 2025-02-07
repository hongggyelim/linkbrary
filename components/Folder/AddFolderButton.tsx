import useViewport from "@/hooks/useViewport";
import useModalStore from "@/store/useModalStore";

export const AddFolderButton = () => {
  const { openModal } = useModalStore();
  const { isMobile } = useViewport();

  return (
    <button
      className={
        isMobile
          ? "fixed-bottom size-[35px] rounded-[20px] bg-orange100 text-white hover:bg-orange50 hover:bg-opacity-70 z-50"
          : "md:mt-auto xl:mt-0 text-orange100"
      }
      onClick={() => openModal("AddFolderModal")}
    >
      {isMobile ? "+" : "폴더 추가 +"}
    </button>
  );
};
export default AddFolderButton;
