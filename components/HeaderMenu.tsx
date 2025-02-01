import Image from "next/image";
import Profile from "@/public/icons/profile.svg";
import Star from "@/public/icons/star.png";
import Link from "next/link";
import SubmitButton from "./SubMitButton";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import useOutsideClick from "@/hooks/useOutsideClick";
import AuthInput from "./Auth/AuthInput";
import { bindClass } from "@/util/bindClass";
import SnsLogin from "./Auth/SnsLogin";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const HeaderMenu = () => {
  const { user, logout, login, fetchUserInfo } = useAuthStore();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<{ email: string; password: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data);
      if (response) {
        toast.success(toastMessages.success.login);
      } else {
        toast.error(toastMessages.error.login);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleLoginGuest = () => {
    setValue("email", process.env.NEXT_PUBLIC_TEST_ID as string);
    setValue("password", process.env.NEXT_PUBLIC_TEST_PW as string);
    handleSubmit(onSubmit)();
  };

  return (
    <>
      {!user ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-3"
          aria-labelledby="login-form"
        >
          <div
            className={bindClass(
              isExpanded ? "block" : "hidden",
              "flex items-center"
            )}
          >
            <AuthInput
              text="이메일"
              {...register("email")}
              type="text"
              placeholder="이메일을 입력해주세요."
              error={errors.email as string | undefined}
            />
            <AuthInput
              text="비밀번호"
              {...register("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              error={errors.password as string | undefined}
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            로그인하러 가기
          </div>
          <SubmitButton
            type="submit"
            width="w-10"
            height="h-[53px]"
            className="mt-[30px]"
          >
            Login
          </SubmitButton>
          {/* <SnsLogin /> */}
          <SubmitButton
            type="button"
            width="w-10"
            height="h-[53px]"
            className="mt-[30px]"
            onClick={handleLoginGuest}
          >
            게스트
          </SubmitButton>
          <SubmitButton
            type="button"
            width="w-10"
            height="h-[53px]"
            className="mt-[30px]"
            // onClick={handleLoginGuest}
          >
            SignUp
          </SubmitButton>
        </form>
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
