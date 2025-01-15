import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parse } from "cookie";
import { LinkData } from "@/types/linkTypes";
import { FolderData } from "@/types/folderTypes";
import { SearchInput } from "../../components/Search/SearchInput";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import axiosInstance from "@/lib/api/axiosInstanceApi";
import useModalStore from "@/store/useModalStore";
import Pagination from "@/components/Pagination";
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
import LinkCardSkeleton from "@/components/skeleton/LinkCardSkeleton";

interface LinkPageProps {
  linkList: LinkData[];
  folderList: FolderData[];
  totalCount: number;
}

// /link 페이지 접속시에 초기렌더링 데이터(전체 폴더, 전체링크리스트)만 fetch해서 client로 전달.
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  // accessToken이 없으면 클라이언트에서 실행될 때 /login 페이지로 이동시킴.
  if (!accessToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
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
};

const LinkPage = ({
  linkList: initialLinkList,
  folderList: initialFolderList,
  totalCount: initialTotalCount,
}: LinkPageProps) => {
  const router = useRouter();
  const { search, folder } = router.query;
  const { isMobile } = useViewport();
  const { totalCount, linkCardList, setLinkCardList } =
    useLinkCardStore.getState();
  const [isLoading, setIsLoading] = useState(false);
  const [folderName] = useFolderName(folder);
  const [folderList, setFolderList] = useState(initialFolderList);

  useEffect(() => {
    setLinkCardList(initialLinkList, initialTotalCount);
  }, [initialLinkList, initialTotalCount, setLinkCardList]);

  // 링크페이지의 query가 바뀌면 새로운 리스트로 업데이트 해주는 훅
  useFetchLinks(setLinkCardList, setIsLoading);

  return (
    <>
      <div className="bg-gray100 w-full h-[219px] flex justify-center items-center">
        <AddLinkInput folderList={folderList} />
      </div>
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
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
        </main>
      </Container>
      {isMobile && (
        <AddFolderButton setFolderList={setFolderList} isModal={true} />
      )}
    </>
  );
};

export default LinkPage;
