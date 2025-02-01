import { bindClass } from "@/util/bindClass";
import AuthInput from "../Auth/AuthInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import useAuthStore from "@/store/useAuthStore";
import SubmitButton from "../button/SubmitButton";
import SnsLogin from "../Auth/SnsLogin";
import Link from "next/link";

interface LoginType {
  email: string;
  password: string;
}
const Sidebar = () => {
  const { login } = useAuthStore();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<LoginType>();

  const onSubmit = async (data: LoginType) => {
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
    handleSubmit(onSubmit)(); // 유효성 검사 후 콜백함수에 data를 전달
  };

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute z-30 inset-0 w-screen h-dvh"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 pt-12 flex flex-col gap-3 items-center bg-white shadow-lg absolute h-dvh top-0 right-0 z-40"
        aria-labelledby="login-form"
      >
        <div className={bindClass("flex flex-col mt-4")}>
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
        <SubmitButton
          type="submit"
          width="w-full"
          height="h-[53px]"
          className=""
        >
          Login
        </SubmitButton>
        {/* <SnsLogin /> */}
        <SubmitButton
          type="button"
          width="w-full"
          height="h-[53px]"
          className=""
          onClick={handleLoginGuest}
        >
          게스트 계정으로 구경하기
        </SubmitButton>
        <SnsLogin className="" />
        <Link href="/signup" className="w-full">
          <SubmitButton
            type="button"
            width="w-full"
            height="h-[53px]"
            className=""
            // onClick={handleLoginGuest}
          >
            SignUp
          </SubmitButton>
        </Link>
      </form>
    </>
  );
};

export default Sidebar;
