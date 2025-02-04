import { useRouter } from "next/router";
import { FolderListData } from "@/types/folderTypes";

const FolderTag = ({ folderList }: FolderListData) => {
  const router = useRouter();
  const { folder: currentFolderId } = router.query;

  const folderStyle =
    "w-[100px] h-[35px] px-[15px] text-sm whitespace-nowrap truncate border border-orange100 rounded-md hover:bg-orange100 hover:text-white";
  const selectedStyle = "bg-orange100 text-white";
  const handleSubmit = (selectedFolderId: number | string) => {
    router.push({
      pathname: router.pathname,
      query: selectedFolderId ? { folder: selectedFolderId } : {},
    });
  };
  const isAllSelected = currentFolderId === "" || currentFolderId === undefined;

  return (
    <ul className="flex flex-wrap gap-[8px] lg:w-[80%] md:w-[80%]">
      <li>
        <button
          className={`${folderStyle} ${isAllSelected && selectedStyle}`}
          onClick={() => handleSubmit("")}
        >
          전체
        </button>
      </li>
      {folderList.slice(0, 8).map((folder) => (
        <li key={folder.id}>
          <button
            className={`${folderStyle} ${folder.id === Number(currentFolderId) && selectedStyle}`}
            type="submit"
            onClick={() => handleSubmit(folder.id)}
          >
            {folder.name.slice(0, 6)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FolderTag;
