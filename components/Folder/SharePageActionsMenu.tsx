import Image from "next/image";
import useModalStore from "@/store/useModalStore";

const SharePageActionsMenu = () => {
  const { openModal } = useModalStore();

  return (
    <div className="h-[18px] flex justify-between gap-[12px] text-yellow400">
      {[{ src: "/icons/share.svg", alt: "공유", text: "공유" }].map(
        ({ src, alt, text }) => (
          <button
            key={text}
            className="flex items-center gap-[4px] text-sm"
            onClick={() => openModal("SNSModal")}
          >
            <Image width={18} height={18} src={src} alt={alt} />
            <span>{text}</span>
          </button>
        )
      )}
    </div>
  );
};

export default SharePageActionsMenu;
