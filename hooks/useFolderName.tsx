import { getFolder } from "@/lib/api/folder";
import { useEffect, useState } from "react";

const useFolderName = (folderId: string | string[] | undefined) => {
  const [folderName, setFolderName] = useState("전체");

  useEffect(() => {
    if (!folderId) return;

    const fetchFolderInfo = async () => {
      try {
        const res = await getFolder(folderId as string);
        setFolderName(res.name);
      } catch (error) {
        console.error("Failed to fetch folder info:", error);
      }
    };
    fetchFolderInfo();
  }, [folderId]);

  return [folderName, setFolderName];
};

export default useFolderName;
