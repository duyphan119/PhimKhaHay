import VideoCardSkeleton from "./video-card-skeleton";

type VideosSkeletonProps = {
  totalItems?: number;
};

export default function VideosSkeleton({
  totalItems = 15,
}: VideosSkeletonProps) {
  return (
    <div className="grid grid-cols-12 xl:grid-cols-10 gap-4">
      {Array(totalItems)
        .fill(0)
        .map((_, index) => (
          <VideoCardSkeleton
            key={index}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
          />
        ))}
    </div>
  );
}
