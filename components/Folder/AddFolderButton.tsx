import useViewport from "@/hooks/useViewport";
import useModalStore from "@/store/useModalStore";

export const AddFolderButton = () => {
  const { openModal } = useModalStore();
  const { isMobile } = useViewport();

  return (
    <button
      className={
        !isMobile
          ? "md:mt-auto xl:mt-0 text-orange100"
          : "fixed-bottom w-[120px] h-[35px] rounded-[20px] bg-orange100 text-white hover:bg-orange50 z-50"
      }
      onClick={() => openModal("AddFolderModal")}
    >
      폴더 추가 +
    </button>
  );
};
export default AddFolderButton;
