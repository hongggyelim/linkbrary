import { useEffect } from "react";
import { useRouter } from "next/router";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { LinkData } from "@/types/linkTypes";
import useViewport from "./useViewport";

// 링크페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (
  setLinkCardList: (list: LinkData[], totalCount: number) => void
) => {
  const router = useRouter();
  const { isTablet } = useViewport();

  useEffect(() => {
    const fetchLinks = async () => {
      // 경로에 따라 API 엔드포인트 분기
      let endpoint =
        router.pathname === "/favorite"
          ? "/api/favorites"
          : router.query.folder
            ? `/api/folders/${router.query.folder}/links`
            : "/api/links";

      const res = await proxy.get(endpoint, {
        params: {
          page: router.query.page,
          pageSize: isTablet ? 6 : 10,
          search: router.query.search,
        },
      });
      setLinkCardList(res.data.list, res.data.totalCount);
    };
    if (router.query) fetchLinks();
  }, [setLinkCardList, router.pathname, router.query, isTablet]);
};

export default useFetchLinks;
