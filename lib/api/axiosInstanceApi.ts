import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/",
});

export const proxy = axios.create({
  baseURL: "https://linkhere.vercel.app",
  // baseURL: "http://localhost:3000",
});

proxy.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
