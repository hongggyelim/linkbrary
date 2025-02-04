import useModalStore from "@/store/useModalStore";
import SubmitButton from "../button/SubmitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const DeleteLinkModal = ({
  link,
  linkId,
}: {
  link: string;
  linkId: number;
}) => {
  const { closeModal } = useModalStore();
  const { deleteLink } = useLinkCardStore();
  const router = useRouter();
  const { query } = router;
  const queryClient = useQueryClient();
  const folderId = query.folder as string | undefined;
  const page = query.page ? Number(query.page) : 1;
  const handleDelete = async () => {
    try {
      await deleteLink(linkId);
      // ✅ 1. 즉시 목록에서 삭제 반영
      queryClient.setQueryData(["links", folderId, page], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          list: oldData.list.filter((item: any) => item.id !== linkId),
        };
      });

      // ✅ 2. 서버 데이터 다시 가져오기 (API 재요청)
      await queryClient.invalidateQueries({
        queryKey: ["links", folderId, page],
      });
      closeModal();
      toast.success(toastMessages.success.deleteLink);
    } catch (error) {
      toast.error(toastMessages.error.deleteLink);
    }
  };

  return (
    <ModalContainer title="링크 삭제" subtitle={link}>
      <SubmitButton
        type="button"
        onClick={handleDelete}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteLinkModal;
