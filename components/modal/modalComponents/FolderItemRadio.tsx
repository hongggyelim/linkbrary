import { FolderItemType } from "@/types/modalTypes";
import { bindClass } from "@/util/bindClass";
import { FaCheck } from "react-icons/fa6";

const FolderItemRadio = ({
  item,
  selectedId,
  onClick,
}: {
  item: FolderItemType;
  selectedId: number | null;
  onClick: (id: number) => void;
}) => {
  const { name, linkCount, id } = item;
  let isSelected = id === selectedId;
  const bgColor = isSelected ? "bg-gray100" : "bg-white";

  const onClickFolderItem = () => {
    onClick(id);
  };
  return (
    <li
      className={bindClass(
        bgColor,
        "w-full p-2 flex h-10 rounded-lg items-center justify-between cursor-pointer"
      )}
      onClick={onClickFolderItem}
    >
      <div className="flex justify-start items-center p-2">
        <label htmlFor={String(id)}>{name}</label>
        <input
          value={name}
          type="radio"
          className="opacity-0"
          id={String(id)}
        />
        <div className="text-gray400 text-sm">{linkCount}개 링크</div>
      </div>
      {isSelected && (
        <div>
          <FaCheck className="text-purple100" />
        </div>
      )}
    </li>
  );
};
export default FolderItemRadio;
