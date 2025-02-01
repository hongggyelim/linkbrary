import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LinkCardSkeleton = () => {
  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg shadow-sm mb-4">
      <Skeleton height={160} />
      <Skeleton width="80%" className="mt-2" />
      <Skeleton width="60%" className="mt-2" />
      <Skeleton width="40%" className="mt-2" />
    </div>
  );
};

export default LinkCardSkeleton;
