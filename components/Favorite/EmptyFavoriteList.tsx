import React from "react";

const EmptyFavoriteList = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-10 bg-yellow100 text-center text-yellow500">
      <div className="text-2xl md:text-3xl font-semibold text-yellow500">
        <span className="block mb-4">⭐️</span>
        즐겨찾기 항목이 없습니다.
      </div>
      <div className="text-sm text-orange100 mt-2">
        저장한 즐겨찾기 항목을 추가해보세요.
      </div>
    </div>
  );
};

export default EmptyFavoriteList;
