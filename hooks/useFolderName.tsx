import { getFolder } from "@/lib/api/folder";
import { useQuery } from "@tanstack/react-query";

const useFolderName = (folderId: string | string[] | undefined) => {
  const getFolderName = async () => {
    const res = await getFolder(folderId);
    return res.name;
  };

  return useQuery({
    queryKey: ["folderName", folderId],
    queryFn: () => getFolderName(),
  });
};
export default useFolderName;
