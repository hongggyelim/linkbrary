import { bindClass } from "@/util/bindClass";
import Image from "next/image";
import Link from "next/link";

const SnsLogin = ({
  className = "",
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={bindClass(
        "flex flex-col items-center justify-between py-3 w-full relative",
        className
      )}
    >
      <span className="border-t border-yellow300 w-full pt-4 text-center">
        간편 로그인
      </span>
      <p className="font-thin">또는</p>
      <p className="text-blue-500">
        <span onClick={onClick} className="cursor-pointer">
          게스트 계정
        </span>
        <span className="font-thin text-black">으로 로그인할 수 있어요</span>
      </p>
      <div className="flex gap-4 border-b border-yellow300 w-full py-4 justify-center">
        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_LOG_IN}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <Image src="/icons/google.svg" width="50" height="50" alt="구글" />
        </Link>
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_LOG_IN}&response_type=code`}
        >
          <Image
            src="/icons/kakaotalk.svg"
            width="50"
            height="50"
            alt="카카오톡"
          />
        </Link>
        <button
          type="button"
          className="rounded-full size-[50px] bg-blue-500 text-white animate-bounce"
          onClick={onClick}
        >
          Guest
        </button>
      </div>
    </div>
  );
};

export default SnsLogin;
