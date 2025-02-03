import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { FolderListData } from "@/types/folderTypes";
import Image from "next/image";
import useModalStore from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { urlRegex } from "@/util/regex";
import SubmitButton from "../button/SubmitButton";
import useExpandedStore from "@/store/useExpandedStore";
import useAuthStore from "@/store/useAuthStore";

const AddLinkInput = ({ folderList }: FolderListData) => {
  const { openModal } = useModalStore();
  const { toggleExpanded } = useExpandedStore();
  const { user } = useAuthStore();

  const [link, setLink] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleClick = () => {
    if (link === "") {
      toast.error(toastMessages.error.inputLink);
    } else if (!urlRegex.test(link.trim())) {
      toast.error(toastMessages.error.invalidLink);
    } else {
      openModal("AddModal", { list: folderList, link: link });
      setLink("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClickWithout = () => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      toggleExpanded();
    }
    if (user && (!folderList || folderList.length < 1)) {
      openModal("AddFolderModal");
    }
  };

  return (
    <div className="flex bg-white justify-between items-center w-full lg:max-w-[800px] md:max-w-[704px] sm:max-w-[325px] h-[69px] lg:px-5 md:px-5 sm:px-[10px] border border-blue-500 rounded-[10px] md:w-[704px] sm:w-[325px] sm:h-[53px] transition-all">
      <div className="flex">
        <Image src="/icons/link.svg" width={20} height={20} alt="link icon" />
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={handleClickWithout}
          value={link}
          placeholder="저장할 링크를 입력하세요"
          className="sm:w-[190px] md:w-[530px] lg:w-[630px] overflow-hidden lg:ml-3 md:ml-3 sm:ml-[8px]"
        />
      </div>
      <div className="w-[80px] h-[37px]">
        <SubmitButton
          className="w-full h-full text-[14px]"
          onClick={handleClick}
        >
          추가하기
        </SubmitButton>
      </div>
    </div>
  );
};

export default AddLinkInput;
