import { useQuery } from "@tanstack/react-query";
import { proxy } from "@/lib/api/axiosInstanceApi";
import { ParsedUrlQuery } from "querystring";
import useViewport from "./useViewport";

const fetchLinks = async (
  query: ParsedUrlQuery,
  pathname: string,
  isTablet: boolean
) => {
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
      pageSize: isTablet ? 6 : 10,
      search: query?.search,
    },
  });

  return res.data;
};

// 링크페이지의 query가 바뀌면 그에 맞는 링크들을 보여주는 훅
const useFetchLinks = (query: ParsedUrlQuery = {}, pathname: string) => {
  const { isTablet } = useViewport();
  return useQuery({
    queryKey: ["links", query, pathname, isTablet],
    queryFn: () => fetchLinks(query, pathname, isTablet),
  });
};

export default useFetchLinks;
