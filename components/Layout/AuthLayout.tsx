import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-sc">
      <div>
        <Image
          className="cursor-pointer"
          src="/icons/logo.svg"
          width="211"
          height="38"
          alt="로고"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
