import { PiHandPalmDuotone, PiFolderSimpleStarDuotone } from "react-icons/pi";

const LinkHere = () => {
  const align = "flex justify-center items-center";
  return (
    <div className="text-[24px] font-semibold text-orange50 mt-[80px] flex flex-col justify-center">
      <p>
        다음에 보려던 &#32;
        <span className="text-orange100 font-bold">&#32;링크&#32;</span>
        어디있지?
      </p>
      <p className="flex justify-center items-center">
        <span>여기 있어요&#32;</span>
        <PiHandPalmDuotone />
      </p>
      <br />
      <p className="flex justify-center items-center flex-col">
        <span className="flex items-center gap-1">
          <PiFolderSimpleStarDuotone />
          <span>폴더로 관리하고</span>
        </span>
        <span>친구에게 공유하세요</span>
      </p>
    </div>
  );
};

export default LinkHere;
