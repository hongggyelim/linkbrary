import { GetServerSidePropsContext } from "next";
import { LinkData } from "@/types/linkTypes";
import { getFolder } from "@/lib/api/folder";
import { getLink } from "../../lib/api/link";
import CardsLayout from "@/components/Layout/CardsLayout";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Link/LinkCard";
import Pagination from "@/components/button/Pagination";
import SharePageActionsMenu from "@/components/Folder/SharePageActionsMenu";

interface SharePageprops {
  folderName: string;
  linkList: LinkData[];
  totalCount: number;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page, pageSize } = context.query;
  const { folderId } = context.params!;

  const folderListData = await getLink(
    { page: page, pageSize: pageSize },
    folderId
  );

  const folderNameData = await getFolder(folderId);

  return {
    props: {
      folderName: folderNameData.name,
      linkList: folderListData.list,
      totalCount: folderListData.totalCount,
    },
  };
};

const SharePage = ({ folderName, linkList, totalCount }: SharePageprops) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-5 bg-yellow100 text-center">
        <h2 className="text-[32px] md:text-[40px] font-semibold">
          {folderName}
        </h2>
      </div>
      <Container>
        <div className="flex justify-end mb-6 relative bottom-10">
          <SharePageActionsMenu />
        </div>
        {linkList.length > 0 && (
          <>
            <CardsLayout>
              {linkList.length > 0
                ? linkList.map((link, index) => (
                    <LinkCard
                      key={link.id}
                      info={link}
                      id={index === 2 ? "target" : ""}
                    />
                  ))
                : null}
            </CardsLayout>
            <Pagination totalCount={totalCount} />
          </>
        )}
      </Container>
    </>
  );
};

export default SharePage;
