import Image from "next/image";

const ModalShareItem = ({
  src,
  text,
  bg,
  color,
}: {
  src: string;
  text: string;
  bg: string;
  color?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[10px] cursor-pointer hover:scale-105">
      <div
        style={{ backgroundColor: bg }}
        className={`bg-[${bg}] size-[42px] rounded-full flex justify-center items-center`}
      >
        <Image
          src={src}
          width={18}
          height={18}
          alt={text}
          style={{ fill: color }}
        />
      </div>
      <div className="text-[13px] leading-[15px] text-[#444444] ">{text}</div>
    </div>
  );
};
export default ModalShareItem;
