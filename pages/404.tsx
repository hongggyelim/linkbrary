import SubmitButton from "@/components/button/SubmitButton";
import { useRouter } from "next/router";
import React from "react";

const notFoundPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow100">
      <span className="text-[40px] font-bold">404</span>
      <h3 className="text-[30px] mb-2">페이지를 찾을 수 없습니다.</h3>
      <p className="text-[16px] mb-3">
        죄송합니다. 존재하지 않는 페이지입니다.
      </p>
      <SubmitButton
        width="w-[100px] h-[48px]"
        onClick={() => {
          router.push("/");
        }}
      >
        홈으로 이동
      </SubmitButton>
    </div>
  );
};

export default notFoundPage;
