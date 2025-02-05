import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "../components/Search/SearchInput";
import Pagination from "@/components/button/Pagination";
import AddLinkInput from "@/components/Link/AddLinkInput";
import Container from "@/components/Layout/Container";
import SearchResultMessage from "@/components/Search/SearchResultMessage";
import FolderTag from "@/components/Folder/FolderTag";
import AddFolderButton from "@/components/Folder/AddFolderButton";
import FolderActionsMenu from "@/components/Folder/FolderActionsMenu";
import CardsLayout from "@/components/Layout/CardsLayout";
import LinkCard from "@/components/Link/LinkCard";
import RenderEmptyLinkMessage from "@/components/Link/RenderEmptyLinkMessage";
import useFetchLinks from "@/hooks/useFetchLinks";
import useViewport from "@/hooks/useViewport";
import useFolderName from "@/hooks/useFolderName";
import LinkCardSkeleton from "@/components/loadingSpinner/LinkCardSkeleton";
import useAuthStore from "@/store/useAuthStore";
import { bindClass } from "@/util/bindClass";
import LinkHere from "@/components/home/LinkHere";
import useFetchFolders from "@/hooks/useFetchFolders";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

// 링크 페이지
const LinkPage = () => {
  const router = useRouter();
  const { search, folder } = router.query;
  const { isTablet, isPC, width } = useViewport();
  const [folderName] = useFolderName(folder);
  const [cardCount, setCardCount] = useState(3);
  const { user } = useAuthStore();
  const { query } = router;
  const folderId = query.folder as string | undefined;
  const page = query.page ? Number(query.page) : 1;
  const queryClient = useQueryClient();

  // 아이템 개수 반응형
  useEffect(() => {
    const newCount = isPC ? 3 : isTablet ? 2 : 1;
    setCardCount(newCount);
  }, [width, isTablet, isPC]);

  // 폴더 데이터 페치
  const { data: folderData } = useFetchFolders();

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  const {
    list: linkData,
    totalCount,
    isLoading: linkLoading,
  } = useFetchLinks();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["folder"],
    });
    queryClient.invalidateQueries({
      queryKey: ["links", folderId, page],
    });
  }, [user]);

  return (
    <>
      {/* 로그인 여부와 상관없이 보여주는 부분 */}
      <div
        className={bindClass(
          "bg-yellow100 w-full flex flex-col pb-10 items-center relative",
          user
            ? "justify-center"
            : "h-[calc(100dvh-64px)] md:h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] justify-start"
        )}
      >
        <div className="my-10 ">
          <h2 className="text-[32px] leading-[42px] font-extrabold">
            <Link href="/">
              <span>I&#39;m&#32;</span>
              <span className="gradient-text">Link</span>
              <br />
              <span>I&#39;m&#32;</span>
              <span className="gradient-text">Here </span>
            </Link>
          </h2>
        </div>
        <AddLinkInput folderList={folderData || []} />
        {!user && <LinkHere />}
      </div>

      {/* 로그인하면 보여줄 부분 */}
      {user && (
        <>
          <Container>
            <main className="mt-[40px] relative">
              <SearchInput />
              {search && <SearchResultMessage message={search} />}
              <div className="flex justify-between mt-[40px]">
                {folderData && <FolderTag folderList={folderData || []} />}
                <AddFolderButton />
              </div>
              <div className="flex justify-between items-center my-[24px]">
                {folder && (
                  <>
                    <h1 className="text-2xl ">{folderName as string}</h1>
                    <FolderActionsMenu
                      folderId={folder}
                      linkCount={totalCount as number}
                    />
                  </>
                )}
              </div>
              <div className="">
                {linkLoading ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(cardCount)].map((_, index) => (
                        <LinkCardSkeleton key={index} />
                      ))}
                    </div>
                    <Pagination totalCount={3} />
                  </>
                ) : totalCount !== 0 ? (
                  <>
                    <CardsLayout>
                      {linkData?.map((link) => (
                        <LinkCard key={link.id} info={link} />
                      ))}
                    </CardsLayout>
                    <Pagination totalCount={totalCount as number} />
                  </>
                ) : (
                  <RenderEmptyLinkMessage />
                )}
              </div>
            </main>
          </Container>
        </>
      )}
    </>
  );
};

export default LinkPage;
