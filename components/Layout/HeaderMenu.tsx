import Image from "next/image";
import Profile from "@/public/icons/profile.svg";
import Star from "@/public/icons/star.png";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import useOutsideClick from "@/hooks/useOutsideClick";
import Sidebar from "./Sidebar";
import { bindClass } from "@/util/bindClass";
import { RiLoginCircleLine } from "react-icons/ri";
import useExpandedStore from "@/store/useExpandedStore";

const HeaderMenu = () => {
  const { user, logout, fetchUserInfo } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const { isExpanded, toggleExpanded } = useExpandedStore();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const dropdownItems = [
    {
      label: "마이링크",
      href: "/link",
    },
    {
      label: "로그아웃",
      href: "/",
      onClick: logout,
    },
  ];
  return (
    <>
      {!user ? (
        <>
          <div
            className={bindClass(
              "absolute z-50 right-4 ease-in-out transition-transform",
              isExpanded ? "" : "rotate-180 "
            )}
            onClick={toggleExpanded}
          >
            <RiLoginCircleLine className="size-6" />
          </div>
          {isExpanded && <Sidebar />}
        </>
      ) : (
        <div className="relative flex items-center gap-[24px]">
          <Link
            href={"/favorite"}
            className="flex items-center gap-[6px] bg-gray200 border border-purple100 rounded-[4px] py-[10px] px-[12px] text-[12px] leading-[14.32px] md:text-[14px] md:leading-[16.71px] lg:text-[14px] lg:leading-[16.71px] font-normal"
          >
            <Image
              src={Star}
              width={14}
              height={17}
              alt=""
              className="align-top"
            />
            즐겨찾기
          </Link>
          <div
            className="flex items-center gap-[6px] text-[14px] leading-[16.71px] font-normal cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            ref={dropdownRef}
          >
            <Image
              src={user.imageSource || Profile}
              width={28}
              height={28}
              alt="프로필"
              className="rounded-full"
            />
            <span className="hidden md:block lg:block">{user?.name}</span>
          </div>
          <div className="absolute top-8 right-0 z-50">
            {isOpen && <Dropdown items={dropdownItems} />}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderMenu;
