export const handleShareFacebook = () => {
  const currentUrl = window.location.href;
  const sendUrl = encodeURIComponent(currentUrl);
  window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
};

export const handleShareKakao = () => {
  const { Kakao, location } = window;

  // 현재 URL에서 folderId를 추출
  const url = new URL(location.href);
  const folderId = url.searchParams.get("folder");

  if (Kakao.isInitialized()) {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Link, Here",
        description: "저장한 링크를 확인해보세요!",
        imageUrl: "https://linkhere.vercel.app/images/thumbnail_box.png", // 배포 후 실제 도메인으로 변경 필요
        link: {
          mobileWebUrl: `https://linkhere.vercel.app/share/${folderId}`,
          webUrl: `https://linkhere.vercel.app/share/${folderId}`,
        },
      },
    });
  }
};
