import { BounceLoader } from "react-spinners";

const LoginLoadingSpinner = ({
  text,
  size = 80,
}: {
  text?: string;
  size?: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-orange50 bg-opacity-50 p-10 absolute size-full">
      <BounceLoader color="#49e09a" size={size} />
      <p className="md:text-2xl mb-4 sm:text-lg text-black font-semibold">
        {text}
      </p>
    </div>
  );
};

export default LoginLoadingSpinner;
