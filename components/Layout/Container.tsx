import React, { useEffect, useState } from "react";
import ToTopButton from "@/components/button/ToTopButton";
import useToTopButtonObserver from "@/hooks/useToTopButtonObserver";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const show = useToTopButtonObserver();

  return (
    <div className="w-full lg:max-w-[1060px] md:max-w-[704px] sm:max-w-[325px] mx-auto">
      {children}
      {<ToTopButton show={show} />}
    </div>
  );
};

export default Container;
