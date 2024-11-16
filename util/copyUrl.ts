import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

export const handleCopyUrl = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl);
  toast.success(toastMessages.success.copyLink);
};
