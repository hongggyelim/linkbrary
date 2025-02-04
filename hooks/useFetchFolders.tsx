import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";
import { FolderData } from "@/types/folderTypes";

const useFetchFolders = () => {
  const { data, error, isLoading } = useQuery<FolderData[]>({
    queryKey: ["folder"],
    queryFn: getFolders,
  });

  return { data, error, isLoading };
};

export default useFetchFolders;
