import { proxy } from "./axiosInstanceApi";

export interface signInProps {
  email: string;
  password: string;
}

interface signUpProps extends signInProps {
  name: string;
}

// 회원가입
export const postSignUp = async (body: signUpProps) => {
  try {
    const res = await proxy.post("api/auth/sign-up", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};

// 로그인
export const postSignIn = async (body: signInProps) => {
  try {
    const res = await proxy.post("/api/auth/sign-in", body);
    if (res.status >= 200 && res.status < 300) return res.data;
  } catch (err) {
    console.error("에러 메시지: ", err instanceof Error ? err.message : err);
  }
};
