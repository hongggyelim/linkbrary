import { FolderData } from "@/types/folderTypes";
import useModalStore from "@/store/useModalStore";
import useRerenderFolderList from "@/hooks/useRerenderFolderList";

interface AddFolderButtonProps {
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>;
  isModal?: boolean;
}

export const AddFolderButton = ({
  setFolderList,
  isModal = false,
}: AddFolderButtonProps) => {
  const { isOpen, openModal } = useModalStore();

  useRerenderFolderList(isOpen, setFolderList);

  return (
    <button
      className={
        !isModal
          ? "md:mt-auto xl:mt-0 text-purple100"
          : "fixed-bottom w-[120px] h-[35px] rounded-[20px] bg-purple100 text-white hover:bg-purple50 z-50"
      }
      onClick={() => openModal("AddFolderModal")}
    >
      폴더 추가 +
    </button>
  );
};
export default AddFolderButton;
