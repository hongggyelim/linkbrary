import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Link/LinkCard";
import Pagination from "@/components/button/Pagination";
import EmptyFavoriteList from "@/components/Favorite/EmptyFavoriteList";
import LinkCardSkeleton from "@/components/loadingSpinner/LinkCardSkeleton";
import useViewport from "@/hooks/useViewport";
import useFetchFavorites from "@/hooks/useFetchFavorites";

interface FavoriteDataType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

const FavoritePage = () => {
  const router = useRouter();

  const { list: linkCardList, totalCount, isLoading } = useFetchFavorites();

  const { isTablet, isPC, width } = useViewport();
  const [cardCount, setCardCount] = useState(3);
  useEffect(() => {
    const newCount = isPC ? 3 : isTablet ? 2 : 1;
    setCardCount(newCount);
  }, [width]);

  // 마이링크 페이지로 돌아감
  const returnButton = () => {
    router.push(`/`);
  };

  return (
    <>
      <div className="flex justify-center items-center sm:h-[117px] h-[219px] sm:mb-5 mb-10 bg-yellow100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          ⭐️ 즐겨찾기
        </h2>
      </div>
      <Container>
        <div className="flex justify-end">
          <button onClick={returnButton} className="mb-5 text-orange100">
            ◀ 마이링크로 돌아가기
          </button>
        </div>
        <div className="">
          {/* 로딩 중일 때 */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(cardCount)].map((_, index) => (
                <LinkCardSkeleton key={index} />
              ))}
            </div>
          ) : linkCardList.length > 0 ? (
            <>
              <CardsLayout>
                {linkCardList.length > 0
                  ? linkCardList.map((favorite) => (
                      <LinkCard key={favorite.id} info={favorite} />
                    ))
                  : null}
              </CardsLayout>
              <Pagination totalCount={totalCount} />
            </>
          ) : (
            <EmptyFavoriteList />
          )}
        </div>
      </Container>
    </>
  );
};

export default FavoritePage;
