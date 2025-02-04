import { useRouter } from "next/router";
import { LinkData } from "@/types/linkTypes";
import { useQuery } from "@tanstack/react-query";
import { getLink, getLinks } from "@/lib/api/link";

const useFetchLinks = () => {
  const router = useRouter();
  const { query } = router;
  const queryKey = ["links", query];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      if (query.folder) {
        return getLink(query, query.folder);
      }
      // 전체 링크 조회
      return getLinks(query);
    },
    enabled: !!query.folder || !!query.page,
  });
  const list: LinkData[] = data?.list || [];
  const totalCount = data?.totalCount || 0;

  return { list, totalCount, error, isLoading };
};

export default useFetchLinks;
