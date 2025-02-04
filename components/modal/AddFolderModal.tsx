import { ChangeEvent, useState } from "react";
import { postFolders } from "@/lib/api/folder";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../button/SubmitButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useQueryClient } from "@tanstack/react-query";

const AddFolderModal = ({ folderName }: { folderName: string }) => {
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
    if (value !== "") {
      try {
        await postFolders(body);
        toast.success(toastMessages.success.addFolder);

        await queryClient.invalidateQueries({
          queryKey: ["folder"],
        });
      } catch (error) {
        toast.error(toastMessages.error.addFolder);
      }
    }
    closeModal();
  };
  return (
    <ModalContainer title="폴더 추가">
      <ModalInput
        placeholder="이름을 입력해주세요"
        name={folderName}
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
        추가하기
      </SubmitButton>
    </ModalContainer>
  );
};

export default AddFolderModal;
