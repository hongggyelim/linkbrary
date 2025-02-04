import { deleteFolder } from "@/lib/api/folder";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../button/SubmitButton";
import ModalContainer from "./modalComponents/ModalContainer";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useRouter } from "next/router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const DeleteFolderModal = ({
  // folderName,
  folderId,
  linkCount,
}: {
  // folderName: string;
  folderId: number;
  linkCount: number;
}) => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    // 폴더 내에 링크 개수 0 일때만 폴더 삭제 가능 -> 링크 1개 이상이면 error toast 띄우고 있음 or 전체 링크 삭제 후 폴더 삭제
    if (linkCount !== 0) {
      toast.error(toastMessages.error.deleteNonEmptyFolder);
      closeModal();
    } else {
      try {
        await deleteFolder(folderId);

        await queryClient.invalidateQueries({
          queryKey: ["folder"],
        });
        toast.success(toastMessages.success.deleteFolder);
      } catch (error) {
        toast.error(toastMessages.error.deleteFolder);
      } finally {
        closeModal();
        router.push("/");
      }
    }
  };

  return (
    <ModalContainer
      title="폴더 삭제"
      subtitle="선택한 폴더를 삭제하시겠습니까?"
    >
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="negative"
      >
        삭제하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default DeleteFolderModal;
