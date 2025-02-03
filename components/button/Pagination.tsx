import useViewport from "@/hooks/useViewport";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PaginationProps {
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount }) => {
  const LiStyle = "relative w-12 h-12 rounded-lg bg-gray-100";
  const buttonStyle =
    "flex justify-center items-center w-full h-full text-black400";

  const router = useRouter();

  const { page, pageSize } = router.query;
  const currentPage = Number(page) || 1;
  const currentPageSize = Number(pageSize) || 9;
  const totalPages = Math.ceil(totalCount / currentPageSize);

  const [maxPagesToShow, setMaxPagesToShow] = useState(2);
  const { isPC } = useViewport();

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      const path = router.pathname;
      router.push(
        {
          pathname: path,
          query: { page: newPage, pageSize: currentPageSize },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  // 화면 크기 변화에 따라 maxPagesToShow를 설정
  useEffect(() => {
    if (isPC) {
      setMaxPagesToShow(5);
    } else {
      setMaxPagesToShow(3);
    }
  }, [isPC]);

  // 페이지 리스트 생성 함수
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      // 전체 페이지 수가 표시 가능한 페이지 수 이하인 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // 첫 페이지와 마지막 페이지는 항상 표시
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage > 3) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <ul className="flex justify-center gap-[10px] my-10">
      <li className={LiStyle}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`${buttonStyle} ${currentPage > 1 ? "text-black500" : "pointer-events-none"}`}
          disabled={currentPage <= 1}
        >
          <Image
            src={
              currentPage > 1
                ? "/icons/pagination-left-active.png"
                : "/icons/pagination-left.png"
            }
            height={24}
            width={24}
            alt="prev"
          />
        </button>
      </li>

      {/* 페이지 번호와 생략 표시 */}
      {getPageNumbers().map((pageNum, index) =>
        typeof pageNum === "number" ? (
          <li key={index} className={LiStyle}>
            <button
              onClick={() => handlePageChange(pageNum)}
              className={`${buttonStyle} ${pageNum === currentPage ? "text-black500" : "text-black400"}`}
            >
              {pageNum}
            </button>
          </li>
        ) : (
          <li
            key={index}
            className={`${LiStyle} flex items-center justify-center text-black400`}
          >
            ...
          </li>
        )
      )}

      <li className={LiStyle}>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`${buttonStyle} ${currentPage < totalPages ? "text-black500" : "pointer-events-none"}`}
          disabled={currentPage >= totalPages}
        >
          <Image
            src={
              currentPage < totalPages
                ? "/icons/pagination-right-active.png"
                : "/icons/pagination-right.png"
            }
            width={24}
            height={24}
            alt="next"
          />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
