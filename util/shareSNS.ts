export const handleShareFacebook = () => {
  const currentUrl = window.location.href;
  const sendUrl = encodeURIComponent(currentUrl);
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
};

export const handleShareKakao = () => {
  const { Kakao, location } = window;
  if (window.Kakao.isInitialized()) {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나만의 링크 모음",
        description: "나에게 필요한 링크만 모아 두었어요!",
        imageUrl: "https://linkbrary-sooty.vercel.app/images/home_main.png", //배포 후 실제 도메인으로 변경 필요
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    });
  }
};
