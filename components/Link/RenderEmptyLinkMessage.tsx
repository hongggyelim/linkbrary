import { AiTwotoneSmile } from "react-icons/ai";

const RenderEmptyLinkMessage = () => {
  return (
    <div className="flex-col w-full flex justify-center items-center">
      <span className="">저장된 링크가 없습니다.</span>
      <span className="flex items-center gap-1">
        먼저 폴더를 추가해보세요 <AiTwotoneSmile />
      </span>
    </div>
  );
};

export default RenderEmptyLinkMessage;
