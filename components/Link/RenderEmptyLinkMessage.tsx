import { AiTwotoneSmile } from "react-icons/ai";

const RenderEmptyLinkMessage = () => {
  return (
    <>
      <span className="w-full h-[200px] flex justify-center items-center">
        저장된 링크가 없습니다.
      </span>
      <span>
        먼저 폴더를 추가해보세요 <AiTwotoneSmile />
      </span>
    </>
  );
};

export default RenderEmptyLinkMessage;
