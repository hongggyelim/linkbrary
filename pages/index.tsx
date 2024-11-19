import Image from "next/image";
import SubmitButton from "@/components/SubMitButton";
import HomeMain from "@/public/images/home_main.png";
import sectionLink from "@/public/images/section_link.png";
import sectionFolder from "@/public/images/section_folder.png";
import sectionShare from "@/public/images/section_share.png";
import sectionSearch from "@/public/images/section_search.png";
import { useRouter } from "next/router";
import useAuthStore from "@/store/useAuthStore";

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
    <main>
      <div className="flex flex-col items-center bg-gray100">
        <h2 className="mt-[28px] text-[32px] leading-[42px] font-bold md:mt-[40px] lg:mt-[70px] md:text-[64px] md:leading-[80px] lg:text-[64px] lg:leading-[80px] text-center">
          <span className="gradient-text">세상의 모든 정보</span>
          를<br /> 쉽게 저장하고
          <br className="lg:hidden" />
          <span className="hidden lg:inline">&nbsp;</span>관리해 보세요
        </h2>
        <SubmitButton
          onClick={handleClick}
          className="sm:mt-[24px] sm:w-[200px] sm:h-[50px] sm:text-[14px] md:mt-[40px] md:w-[350px] md:h-[53px] md:text-[18px] lg:mt-[40px] lg:w-[350px] lg:h-[53px] lg:text-[18px]"
        >
          링크 추가하기
        </SubmitButton>
        <Image
          src={HomeMain}
          width={1118}
          height={540}
          alt="배너"
          className="mt-[37.56px] w-[302.79px] h-[146.44px] md:mt-[69.07px] md:w-[650.3px] md:h-[313.93px] lg:mt-[90px] lg:w-[1118px] lg:h-[540px]"
        />
      </div>

      <div className="flex flex-col items-center gap-[80px] px-[33px] pt-[40px] pb-[80px] md:pt-[80px] md:pb-[170px] md:gap-[100px] lg:pt-[120px]">
        <section className={sectionStyle}>
          <div className={sectionContent}>
            <strong className={sectionTitleStyle}>
              <span className="gradient-text">원하는 링크</span>를 저장하세요
            </strong>
            <em className={sectionDescriptionStyle}>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상, 사고 싶은 옷,
              <br className="sm:block md:hidden" /> 기억하고 싶은 모든 것을 한
              공간에 저장하세요.
            </em>
          </div>
          <Image
            src={sectionLink}
            width={550}
            height={450}
            alt="링크"
            className={sectionImageStyle}
          />
        </section>

        <section
          className={`${sectionStyle} md:flex-row-reverse lg:flex-row-reverse`}
        >
          <div className={sectionContent}>
            <strong className={sectionTitleStyle}>
              링크를 폴더로 <span className="gradient-text">관리</span>하세요
            </strong>
            <em className={sectionDescriptionStyle}>
              나만의 폴더를 무제한으로 만들고 다양하게 활용할 수
              <br className="sm:block md:hidden" /> 있습니다.
            </em>
          </div>
          <Image
            src={sectionFolder}
            width={550}
            height={450}
            alt="폴더"
            className={sectionImageStyle}
          />
        </section>

        <section className={sectionStyle}>
          <div className={sectionContent}>
            <strong className={sectionTitleStyle}>
              저장한 링크를 <span className="gradient-text">공유</span>해 보세요
            </strong>
            <em className={sectionDescriptionStyle}>
              여러 링크를 폴더에 담고 공유할 수 있습니다. 가족,
              <br className="sm:block md:hidden" /> 친구, 동료들에게 쉽고 빠르게
              링크를 공유해 보세요.
            </em>
          </div>
          <Image
            src={sectionShare}
            width={550}
            height={450}
            alt="공유"
            className={sectionImageStyle}
          />
        </section>

        <section
          className={`${sectionStyle} md:flex-row-reverse lg:flex-row-reverse`}
        >
          <div className={sectionContent}>
            <strong className={sectionTitleStyle}>
              저장한 링크를 <span className="gradient-text">검색</span>해 보세요
            </strong>
            <em className={sectionDescriptionStyle}>
              중요한 정보들을 검색으로 쉽게 찾아보세요.
            </em>
          </div>
          <Image
            src={sectionSearch}
            width={550}
            height={450}
            alt="검색"
            className={sectionImageStyle}
          />
        </section>
      </div>
    </main>
  );
};

export default HomePage;
