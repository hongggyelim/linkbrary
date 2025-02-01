import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { SearchInput } from "../components/Search/SearchInput";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import axiosInstance from "@/lib/api/axiosInstanceApi";
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
import toast, { Toaster } from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import useAuthStore from "@/store/useAuthStore";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

// 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  if (accessToken) {
    const fetchData = async (endpoint: string) => {
      const res = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    };

    try {
      const [links, folders] = await Promise.all([
        fetchData("/links"),
        fetchData("/folders"),
      ]);

      return {
        props: {
          linkList: links.list || [],
          folderList: folders || [],
          totalCount: links.totalCount || 0,
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        props: {
          linkList: [],
          folderList: [],
          totalCount: 0,
        },
      };
    }
  }
};

// 링크 페이지
const LinkPage = ({
  linkList: initialLinkList,
  folderList: initialFolderList,
  totalCount: initialTotalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { search, folder } = router.query;
  const { isMobile, isTablet, isPC, width } = useViewport();
  const { totalCount, linkCardList, setLinkCardList } =
    useLinkCardStore.getState();
  const [isLoading, setIsLoading] = useState(false);
  const [folderName] = useFolderName(folder);
  const [folderList, setFolderList] = useState(initialFolderList);
  const { openModal } = useModalStore();
  const [cardCount, setCardCount] = useState(3);
  const { user } = useAuthStore();

  // 아이템 개수 반응형
  useEffect(() => {
    const newCount = isPC ? 3 : isTablet ? 2 : 1;
    setCardCount(newCount);
  }, [width]);

  useEffect(() => {
    setLinkCardList(initialLinkList, initialTotalCount);
  }, [initialLinkList, initialTotalCount, setLinkCardList]);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(setLinkCardList, setIsLoading);

  // 로그인한 상태에서만, 생성된 폴더가 없으면 폴더 생성 모달 띄워주기
  useEffect(() => {
    if (user && folderList.length === 0) {
      toast.success(toastMessages.success.addFolderInfo);
      openModal("AddFolderModal");
    }
  }, []);
  return (
    <>
      {/* 로그인 여부와 상관없이 보여주는 부분 */}
      <div className="bg-gray100 w-full flex flex-col pb-10 justify-center items-center">
        <h2 className="mt-20 mb-10 text-[32px] leading-[42px] font-bold text-center bg-transparent">
          <span className="gradient-text">세상의 모든 정보</span>
          를<br /> 쉽게 저장하고
          <br className="lg:hidden" />
          <span className="hidden lg:inline">&nbsp;</span>관리해 보세요
        </h2>
        <AddLinkInput folderList={folderList} />
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
              <div className="h-[440px]">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(cardCount)].map((_, index) => (
                      <LinkCardSkeleton key={index} />
                    ))}
                  </div>
                ) : linkCardList.length !== 0 ? (
                  <>
                    <CardsLayout>
                      {linkCardList.map((link) => (
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
          {isMobile && (
            <AddFolderButton setFolderList={setFolderList} isModal={true} />
          )}
        </>
      )}
    </>
  );
};

export default LinkPage;
