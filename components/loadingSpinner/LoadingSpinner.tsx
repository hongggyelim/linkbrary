import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({
  text,
  size = 35,
}: {
  text?: string;
  size?: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="md:text-2xl mb-4 sm:text-lg">{text}</p>
      <ClipLoader color="#6d6afe" size={size} />
    </div>
  );
};

export default LoadingSpinner;
