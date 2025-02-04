import { deleteLinkURL, putLinkFavorite, putLinkURL } from "@/lib/api/link";
import { create } from "zustand";
import { LinkData } from "@/types/linkTypes";

interface UpdateLinkBody {
  url: string;
}

interface LinkCardStore {
  linkCardList: LinkData[] | undefined;
  setLinkCardList: (
    list: LinkData[] | undefined,
    totalCount: number | undefined
  ) => void;
  updateLink: (linkId: number, body: UpdateLinkBody) => Promise<void>;
  deleteLink: (linkId: number) => Promise<void>;
  updateFavorite: (linkId: number, favorite: boolean) => Promise<void>;
  totalCount: number | undefined;
}

export const useLinkCardStore = create<LinkCardStore>((set) => ({
  linkCardList: [],
  totalCount: undefined,

  setLinkCardList: (
    list: LinkData[] | undefined,
    totalCount: number | undefined
  ) => {
    set({ linkCardList: list, totalCount: totalCount });
  },

  // 수정 요청 보낸 후 목록 가져오기
  updateLink: async (linkId: number, body: UpdateLinkBody) => {
    try {
      // 프록시 서버에서 수정된 링크 데이터를 받아옴
      const updatedData = await putLinkURL(linkId, body);

      // 수정된 데이터를 사용하여 상태 업데이트
      if (updatedData) {
        set((state) => {
          const updatedList = state.linkCardList?.map((link) =>
            link.id === linkId ? { ...link, ...updatedData } : link
          );
          return { linkCardList: updatedList };
        });
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },

  // 삭제 요청 보낸 후 목록 가져오기
  deleteLink: async (linkId: number) => {
    try {
      await deleteLinkURL(linkId);

      // 삭제된 항목을 제외한 나머지 항목으로 상태 업데이트
      set((state) => {
        const updatedList = state.linkCardList?.filter(
          (link) => link.id !== linkId
        );
        return { linkCardList: updatedList };
      });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  },

  // 즐겨찾기 상태 업데이트
  updateFavorite: async (linkId: number, favorite: boolean) => {
    try {
      await putLinkFavorite(linkId, { favorite });

      // 변경된 항목만 상태 업데이트
      set((state) => {
        const updatedList = state.linkCardList?.map((link) =>
          link.id === linkId ? { ...link, favorite } : link
        );
        return { linkCardList: updatedList };
      });
    } catch (error) {
      console.error("즐겨찾기 상태 업데이트 중 오류 발생:", error);
    }
  },
}));
