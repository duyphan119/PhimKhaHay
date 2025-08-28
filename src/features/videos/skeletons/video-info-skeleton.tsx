import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  buttonPlayVisible?: boolean;
};

export default function VideoInfoSkeleton({
  buttonPlayVisible = false,
}: Props) {
  return (
    <div className="">
      <Skeleton className="w-2/3 h-9" />
      <Skeleton className="w-1/3 h-6 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-3" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />
      <Skeleton className="w-1/2 h-5 mt-0.5" />

      <Skeleton className="w-full h-20 mt-3" />

      {buttonPlayVisible && (
        <div className="mt-3 flex gap-3">
          <Skeleton className="w-40 h-10" />
          <Skeleton className="w-40 h-10 mt-0.5" />
        </div>
      )}
    </div>
  );
}
