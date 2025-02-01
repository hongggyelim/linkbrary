import AddLinkInput from "@/components/Link/AddLinkInput";

const HomePage = () => {
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
