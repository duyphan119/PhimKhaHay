"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  imageType: "poster" | "thumbnail";
  className?: string;
};

export default function VideoCardSkeleton({ imageType, className }: Props) {
  return (
    <div className={cn("rounded-md", className)}>
      <Skeleton
        className={cn(
          "relative block w-full select-none",
          imageType === "thumbnail" ? "aspect-video" : "aspect-[2/3]"
        )}
      />
      <div className="p-2">
        <Skeleton className="h-6 w-4/5 mx-auto mb-1" />
        <Skeleton className="h-5 w-3/5 mx-auto" />
      </div>
    </div>
  );
}
