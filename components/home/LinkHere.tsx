import { PiHandPalmDuotone } from "react-icons/pi";

const LinkHere = () => {
  return (
    <div className="text-[24px] font-semibold text-orange50">
      <p>
        다음에 보려던 &#32;
        <span className="text-orange100 font-bold">링크&#32;</span>
        어디있지?
      </p>
      <p className="flex justify-center items-center">
        <span>여기 있어요&#32;</span>
        <PiHandPalmDuotone />
      </p>
    </div>
  );
};

export default LinkHere;
