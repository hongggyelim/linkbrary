import { useEffect, useState } from "react";

const useToTopButtonObserver = () => {
  const [show, setShow] = useState(false);

  // 헤더 show 여부를 결정하는 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { id } = entry.target;
          if (id === "target") {
            // 요소가 뷰포트에 들어왔을 때
            if (entry.isIntersecting) {
              setShow(true);
            } else {
              setShow(false);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px",
      }
    );
    // showHeader
    const show = document.getElementById("target");
    if (show) {
      observer.observe(show);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return show;
};

export default useToTopButtonObserver;
