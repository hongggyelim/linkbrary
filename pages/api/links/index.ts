import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import axiosInstance from "@/lib/api/axiosInstanceApi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  const { page, pageSize, search } = req.query;

  switch (req.method) {
    case "GET":
      // 유저의 전체 링크 조회
      try {
        const response = await axiosInstance.get(`/links`, {
          params: { page, pageSize, search }, // 만약 아무런 값이 없으면 알아서 예외시킴
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("전체 링크 조회", res);
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "전체 링크 조회에 실패했습니다." });
      }

    case "POST":
      // 링크 생성 로직
      try {
        const response = await axiosInstance.post("/links", req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "링크 생성에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
