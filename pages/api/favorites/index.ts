import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  const { page, pageSize } = req.query;

  if (!accessToken) {
    return res.status(401).json({ message: "인증 오류: 토큰이 없습니다." });
  }

  switch (req.method) {
    case "GET":
      // 즐겨찾기 목록 조회
      try {
        const response = await axiosInstance.get(`/favorites`, {
          params: { page, pageSize },
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err: any) {
        // 즐겨찾기 폴더가 없는 경우 (404 처리)
        if (err.response?.status === 404) {
          return res.status(404).json({ message: "즐겨찾기 폴더가 없습니다." });
        }

        console.error(err);
        return res
          .status(500)
          .json({ message: "서버 에러 : 즐겨찾기 목록 조회에 실패했습니다." });
      }
    default:
      // 지원하지 않는 메서드
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};
export default handler;
