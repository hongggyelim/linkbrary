import React from "react";

interface CardsLayoutProps {
  children: React.ReactNode;
}

const CardsLayout = ({ children }: CardsLayoutProps) => {
  return (
    <div className="flex flex-wrap justify-start items-center gap-5 md:gap-6 lg:gap-[20px] w-full">
      {children}
    </div>
  );
};

export default CardsLayout;
