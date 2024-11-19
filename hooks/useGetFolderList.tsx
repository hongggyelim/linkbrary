import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/lib/api/folder";

const getFolderList = async () => {
  const res = await getFolders();
  return res.data;
};

// 링크페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useGetFolderList = () => {
  return useQuery({
    queryKey: ["folderList"],
    queryFn: getFolderList,
    staleTime: 15 * 60 * 1000, // 15분 (900000ms) 동안 데이터 유효성 유지
    refetchInterval: 15 * 60 * 1000, // 15분마다 자동으로 데이터 갱신
  });
};

export default useGetFolderList;
