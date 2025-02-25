import AuthInput from "@/components/Auth/AuthInput";
import AuthLayout from "@/components/Layout/AuthLayout";
import Link from "next/link";
import useAuthForm from "@/hooks/useForm";
import SnsSignin from "@/components/Auth/SnsSignin";
import SubmitButton from "@/components/button/SubmitButton";
import useExpandedStore from "@/store/useExpandedStore";

const SignupPage = () => {
  const { values, errors, handleChange, handleBlur, handleSubmitForm } =
    useAuthForm(true);
  const { setExpanded } = useExpandedStore();

  return (
    <div className="bg-yellow100 min-h-screen pt-10">
      <AuthLayout>
        <p className="mt-[16px] text-base font-normal">
          이미 회원이신가요?{" "}
          <Link
            href="/"
            className="cursor-pointer text-orange100 underline font-semibold"
            onClick={setExpanded}
          >
            로그인하기
          </Link>
        </p>
        <form
          className="w-full sm:max-w-[325px] md:max-w-[400px] lg:max-w-[400px] mt-[30px] h-full"
          aria-labelledby="login-form"
          onSubmit={handleSubmitForm}
        >
          <AuthInput
            text="이메일"
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <AuthInput
            text="이름"
            type="text"
            name="nickname"
            placeholder="이름을 입력해주세요."
            value={values.nickname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nickname}
          />
          <AuthInput
            text="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <AuthInput
            text="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.passwordConfirm}
          />
          <SubmitButton
            type="submit"
            width="w-full"
            height="h-[53px]"
            className="mt-[30px]"
          >
            회원가입
          </SubmitButton>
          <SnsSignin />
        </form>
      </AuthLayout>
    </div>
  );
};

export default SignupPage;
