import { ChangeEvent, useState } from "react";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import { putFolder } from "@/lib/api/folder";
import SubmitButton from "../button/SubmitButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useQueryClient } from "@tanstack/react-query";

const EditFolderModal = ({
  // folderName,
  folderId,
}: {
  // folderName: string;
  folderId: number;
}) => {
  const [value, setValue] = useState("");

  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length > 5) {
      toast.error(toastMessages.error.limitFolderNameLength);
    } else {
      setValue(newValue);
    }
  };
  const handleSubmit = async () => {
    const body = {
      name: value,
    };
    if (!folderId) {
      toast.error(toastMessages.error.invalidLinkCount);
      closeModal();
    } else if (value === "") {
      toast.error(toastMessages.error.inputFolderName);
    } else {
      try {
        await putFolder(folderId, body);
        toast.success(toastMessages.success.editFolder);

        await queryClient.invalidateQueries({
          queryKey: ["folder"],
        });
        closeModal();
      } catch (error) {
        toast.error(toastMessages.error.editFolder);
        closeModal();
      }
    }
  };
  return (
    <ModalContainer title="폴더 이름 변경">
      <ModalInput
        placeholder="수정할 이름을 입력해 주세요"
        name="folderName"
        value={value}
        onChange={handleChange}
        onEnter={handleSubmit}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px]"
        color="positive"
      >
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditFolderModal;
