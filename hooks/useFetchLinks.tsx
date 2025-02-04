import { useRouter } from "next/router";
import { LinkData } from "@/types/linkTypes";
import { useQuery } from "@tanstack/react-query";
import { getLink, getLinks } from "@/lib/api/link";

const useFetchLinks = () => {
  const router = useRouter();
  const { query } = router;

  const folderId = query.folder as string | undefined;
  const page = query.page ? Number(query.page) : 1;
  const queryKey = ["links", folderId, page];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      if (folderId) {
        return getLink(query, folderId);
      }
      return getLinks({ ...query, page: query.page || "1" });
    },
  });
  const list: LinkData[] = data?.list || [];
  const totalCount = data?.totalCount || 0;

  return { list, totalCount, error, isLoading };
};

export default useFetchLinks;
