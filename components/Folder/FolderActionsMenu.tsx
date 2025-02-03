import { FolderData } from "@/types/folderTypes";
import Image from "next/image";
import useModalStore from "@/store/useModalStore";
import useRerenderFolderList from "../../hooks/useRerenderFolderList";

interface FolderActionsMenuProps {
  setFolderList: React.Dispatch<React.SetStateAction<FolderData[]>>;
  folderId: string | string[] | undefined;
  linkCount: number;
}

const FolderActionsMenu = ({
  setFolderList,
  folderId,
  linkCount,
}: FolderActionsMenuProps) => {
  const { isOpen, openModal } = useModalStore();

  const handleModalOpen = (text: string) => {
    switch (text) {
      case "공유":
        openModal("SNSModal");
        break;
      case "이름 변경":
        openModal("EditModal", {
          folderId: Number(folderId),
        });
        break;
      case "삭제":
        openModal("DeleteFolderModal", {
          folderId: Number(folderId),
          linkCount: linkCount,
        });
        break;
      default:
        break;
    }
  };

  useRerenderFolderList(isOpen, setFolderList);

  return (
    <div className="w-[192px] h-[18px] flex justify-between gap-[12px] text-yellow400">
      {[
        { src: "/icons/share.svg", alt: "공유", text: "공유" },
        { src: "/icons/pen.svg", alt: "이름 변경", text: "이름 변경" },
        { src: "/icons/delete.svg", alt: "삭제", text: "삭제" },
      ].map(({ src, alt, text }) => (
        <button
          key={text}
          className="flex items-center gap-[4px] text-sm"
          onClick={() => handleModalOpen(text)}
        >
          <Image width={18} height={18} src={src} alt={alt} />
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default FolderActionsMenu;
