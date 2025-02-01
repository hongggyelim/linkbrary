import { useEffect } from "react";
import { useRouter } from "next/router";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import useViewport from "./useViewport";
import useAuthStore from "@/store/useAuthStore";

// 링크 페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkCardList: (list: LinkData[], totalCount: number) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { isTablet } = useViewport();
  // 로그인 정보 없으면 아무것도 하지않음
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      const fetchLinks = async () => {
        setIsLoading(true);
        // 경로에 따라 API 엔드포인트 분기
        let endpoint =
          pathname === "/favorite"
            ? "/api/favorites"
            : query?.folder
              ? `/api/folders/${query.folder}/links`
              : "/api/links";

        const res = await proxy.get(endpoint, {
          params: {
            page: query?.page,
            pageSize: isTablet ? 6 : 9,
            search: query?.search,
          },
        });
        setLinkCardList(res.data.list, res.data.totalCount);
        setIsLoading(false);
      };

      if (query) fetchLinks();
    }
  }, [setLinkCardList, setIsLoading, pathname, query, isTablet]);
};

export default useFetchLinks;
