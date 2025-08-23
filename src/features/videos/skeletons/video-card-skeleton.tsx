import { Skeleton } from "@/components/ui/skeleton";

type VideoCardSkeletonProps = {
  className?: string;
};

export default function VideoCardSkeleton({
  className,
}: VideoCardSkeletonProps) {
  return (
    <div className={className}>
      <Skeleton className="w-full aspect-video" />
      <Skeleton className="w-full h-4 mt-2" />
    </div>
  );
}
