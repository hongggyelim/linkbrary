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
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import useAuthStore from "@/store/useAuthStore";
import { bindClass } from "@/util/bindClass";
import { PiHandWavingThin } from "react-icons/pi";
import { PiHandPalmDuotone } from "react-icons/pi";

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
  if (!accessToken) {
    // 토큰이 없으면 빈 데이터와 함께 렌더링
    return {
      props: {
        linkList: [], // 빈 배열 반환
        folderList: [], // 빈 배열 반환
        totalCount: 0, // 0으로 설정
      },
    };
  }
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
      <div
        className={bindClass(
          "bg-yellow100 w-full flex flex-col pb-10 items-center relative",
          user
            ? "justify-center"
            : "h-[calc(100dvh-64px)] md:h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] justify-start"
        )}
      >
        <div className="my-10 ">
          <div className="text-[24px] font-semibold text-orange50">
            <p>
              다음에 보려던&#32;
              <span className="text-orange100 font-bold">링크&#32;</span>
              어디있지?
            </p>
            <p className="flex justify-center items-center">
              <span>여기 있어요&#32;</span>
              <PiHandPalmDuotone />
            </p>
          </div>
          <h2 className="text-[32px] leading-[42px] font-extrabold text-center">
            <span>I&#39;m&#32;</span>
            <span className="gradient-text">Link</span>
            <br />
            <span>I&#39;m&#32;</span>
            <span className="gradient-text">Here </span>
          </h2>
        </div>
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
              <div className="py-10">
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
