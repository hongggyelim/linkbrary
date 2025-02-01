import { ChangeEvent, useState } from "react";
import { useLinkCardStore } from "@/store/useLinkCardStore";
import ModalContainer from "./modalComponents/ModalContainer";
import ModalInput from "./modalComponents/ModalInput";
import useModalStore from "@/store/useModalStore";
import SubmitButton from "../button/SubmitButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { urlRegex } from "@/util/regex";
import { error } from "console";

const EditLink = ({
  folderName,
  link,
  linkId,
}: {
  folderName: string;
  link: string;
  linkId: number;
}) => {
  const [value, setValue] = useState("");
  const { closeModal } = useModalStore();
  const { updateLink } = useLinkCardStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const body = {
      url: value,
    };
    if (value === link) {
      toast.error(toastMessages.error.sameLink);
    } else if (value === "") {
      toast.error(toastMessages.error.inputLink);
    } else if (!urlRegex.test(value)) {
      toast.error(toastMessages.error.invalidLink);
    } else {
      try {
        await updateLink(linkId, body);
        closeModal();
        toast.success(toastMessages.success.editLink);
      } catch (err) {
        toast.error(toastMessages.error.editLink);
      }
    }
  };
  return (
    <ModalContainer title="링크 주소 변경">
      <ModalInput
        placeholder={link}
        name={folderName}
        value={value}
        onChange={handleChange}
      />
      <SubmitButton
        type="button"
        onClick={handleSubmit}
        width="w-full"
        height="h-[51px] "
        color="positive"
      >
        변경하기
      </SubmitButton>
    </ModalContainer>
  );
};
export default EditLink;
