import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// 모달이 닫혔을 때 기존 FolderList를 재검증하는 커스텀 훅
const useRerenderFolderList = (isOpen: boolean) => {
  const queryClient = useQueryClient();

  // isOpen이 false일 때 쿼리 무효화
  useEffect(() => {
    if (!isOpen) {
      queryClient.invalidateQueries({ queryKey: ["folderList"] }); // folderList 쿼리 무효화 -> staile로 만듦으로써 refetch
    }
  }, [isOpen, queryClient]);
};

export default useRerenderFolderList;
