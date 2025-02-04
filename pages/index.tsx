import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "../components/Search/SearchInput";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import useModalStore from "@/store/useModalStore";
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
import axios from "axios";
import { FolderData } from "@/types/folderTypes";

// 링크 페이지
const LinkPage = () => {
  const router = useRouter();
  const { search, folder } = router.query;
  const { isMobile, isTablet, isPC, width } = useViewport();
  const { totalCount, linkCardList, setLinkCardList } = useLinkCardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [folderName] = useFolderName(folder);
  const [folderList, setFolderList] = useState<FolderData[]>([]);
  const [cardCount, setCardCount] = useState(3);
  const { user } = useAuthStore();

  // 아이템 개수 반응형
  useEffect(() => {
    const newCount = isPC ? 3 : isTablet ? 2 : 1;
    setCardCount(newCount);
  }, [width]);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(setLinkCardList, setIsLoading);

  // 폴더 데이터 페치
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get("/api/folders"); // 폴더 목록 요청
        setFolderList(response.data || []);
      } catch (error) {
        console.error("폴더 목록 불러오기 실패", error);
      }
    };
    if (user) {
      fetchFolders(); // 로그인 후 폴더 목록 요청
    }
    console.log("folder조회", folderList);
  }, [user]); // user가 변경될 때마다 실행

  // 링크 데이터 페치
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("/api/links"); // 링크 목록 요청
        setLinkCardList(response.data.list || [], response.data.list.length);
      } catch (error) {
        console.error("링크 목록 불러오기 실패", error);
      }
    };

    if (user) {
      fetchLinks(); // 로그인 후 폴더 목록 요청
    }
    console.log("linkcardList 조회", linkCardList);
  }, [user]); // user가 변경될 때마다 실행

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
            <span>I&#39;m&#32;</span>
            <span className="gradient-text">Link</span>
            <br />
            <span>I&#39;m&#32;</span>
            <span className="gradient-text">Here </span>
          </h2>
        </div>
        <AddLinkInput folderList={folderList} />
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
                {folderList && <FolderTag folderList={folderList} />}
                {!isMobile && <AddFolderButton setFolderList={setFolderList} />}
              </div>
              <div className="flex justify-between items-center my-[24px]">
                {folder && (
                  <>
                    <h1 className="text-2xl ">{folderName as string}</h1>
                    <FolderActionsMenu
                      setFolderList={setFolderList}
                      folderId={folder}
                      linkCount={totalCount as number}
                    />
                  </>
                )}
              </div>
              <div className="">
                {isLoading ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(cardCount)].map((_, index) => (
                        <LinkCardSkeleton key={index} />
                      ))}
                    </div>
                    <Pagination totalCount={3} />
                  </>
                ) : linkCardList.length !== 0 ? (
                  <>
                    <CardsLayout>
                      {linkCardList.map((link, index) => (
                        <LinkCard
                          key={link.id}
                          info={link}
                          id={index === 2 ? "target" : ""}
                        />
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
          {isMobile && (
            <AddFolderButton setFolderList={setFolderList} isModal={true} />
          )}
        </>
      )}
    </>
  );
};

export default LinkPage;
