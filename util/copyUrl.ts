import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

export const handleCopyUrl = () => {
  // 현재 URL에서 folderId를 추출
  const url = new URL(location.href);
  const folderId = url.searchParams.get("folder");
  const shareUrl = `https://linkhere.vercel.app/share/${folderId}`;
  navigator.clipboard.writeText(shareUrl);
  toast.success(toastMessages.success.copyLink);
};
