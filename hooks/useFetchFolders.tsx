import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";
import { FolderData } from "@/types/folderTypes";

const useFetchFolders = () => {
  const router = useRouter();
  const { query } = router;

  const { data, error, isLoading } = useQuery<FolderData[]>({
    queryKey: ["folder", query],
    queryFn: getFolders,
  });

  return { data, error, isLoading };
};

export default useFetchFolders;
