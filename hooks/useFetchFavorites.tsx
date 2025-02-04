import { LinkData } from "@/types/linkTypes";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/lib/api/link";

const useFetchFavorites = () => {
  const queryKey = ["favorite"];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: getFavorites,
  });
  const list: LinkData[] = data?.list || [];
  const totalCount = data?.totalCount || 0;

  return { list, totalCount, error, isLoading };
};

export default useFetchFavorites;
