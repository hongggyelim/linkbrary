import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-sc">
      <Link href={"/"}>
        <Image src="/images/logo.png" alt="LinkHere" width={150} height={50} />
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
