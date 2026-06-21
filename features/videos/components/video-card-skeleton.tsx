import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type VideoCardSkeletonProps = {
  direction?: "row" | "col";
};

export function VideoCardSkeleton({
  direction = "col",
}: VideoCardSkeletonProps) {
  return (
    <div className={cn("video-card", direction === "row" ? "flex gap-4" : "")}>
      <div
        className={cn(
          "relative aspect-2/3",
          direction === "row" ? "w-1/3 shrink-0" : "w-full",
        )}
      >
        <Skeleton className="h-full w-full rounded-sm" />

        {direction === "col" && (
          <>
            <Skeleton className="absolute top-0 right-0 h-5 w-14 rounded-tr-sm rounded-bl-sm" />
            <Skeleton className="absolute bottom-0 left-0 h-5 w-10 rounded-tr-sm rounded-bl-sm" />
          </>
        )}
      </div>

      <div className="mt-1 flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
