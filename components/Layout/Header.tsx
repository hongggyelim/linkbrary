import Logo from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
  const { fetchUserInfo } = useAuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <header className="bg-yellow100 py-[13px] px-[30px] flex justify-center h-16 md:h-20 lg:h-20 relative">
      <div className="flex justify-between items-center w-full lg:max-w-[1060px] md:max-w-[704px] sm:max-w-[325px]">
        <h1 className="">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              alt="LinkHere"
              width={150}
              height={50}
            />
          </Link>
        </h1>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
