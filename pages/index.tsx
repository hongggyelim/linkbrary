import Image from "next/image";
import SubmitButton from "@/components/SubMitButton";
import HomeMain from "@/public/images/home_main.png";
import sectionLink from "@/public/images/section_link.png";
import sectionFolder from "@/public/images/section_folder.png";
import sectionShare from "@/public/images/section_share.png";
import sectionSearch from "@/public/images/section_search.png";
import { useRouter } from "next/router";
import useAuthStore from "@/store/useAuthStore";
import AddLinkInput from "@/components/Link/AddLinkInput";

const sectionStyle =
  "flex flex-col md:flex-row md:items-center md:gap-[51px] lg:flex-row lg:items-center lg:gap-[157px]";
const sectionContent = "flex flex-col md:w-[262px] lg:w-[291px]";
const sectionTitleStyle =
  "text-[24px] leading-[28.64px] font-bold md:text-[48px] md:leading-[57.28px] lg:text-[48px] lg:leading-[57.28px]";
const sectionDescriptionStyle =
  "mt-[10px] text-[15px] leading-[22.5px] font-medium text-gray600 md:text-[16px] md:leading-[24px] lg:text-[16px] lg:leading-[24px]";
const sectionImageStyle =
  "mt-[24px] w-[325px] h-[265.91px] md:w-[385px] md:h-[315px] lg:w-[550px] lg:h-[450px]";

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleClick = async () => {
    if (user) {
      await router.push("/link");
    } else {
      await router.push("/login");
    }
  };

  return (
    <main className="flex flex-col items-center bg-gray100 h-[calc(100dvh-64px)] md:h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] relative">
      <h2 className="mt-20 mb-10 text-[32px] leading-[42px] font-bold text-center">
        <span className="gradient-text">세상의 모든 정보</span>
        를<br /> 쉽게 저장하고
        <br className="lg:hidden" />
        <span className="hidden lg:inline">&nbsp;</span>관리해 보세요
      </h2>
      <AddLinkInput folderList={[]} />
    </main>
  );
};

export default HomePage;
