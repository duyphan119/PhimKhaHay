import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendVideosSkeleton() {
  return (
    <>
      <Skeleton className="w-1/2 h-6" />
      <div className="mt-4 space-y-4">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <Skeleton className="w-full aspect-video" />
              </div>
              <div className="col-span-12 md:col-span-8">
                <Skeleton className="w-full h-5" />
              </div>
            </div>
          ))}
      </div>
      <Skeleton className="w-1/2 h-6 mt-8" />
      <div className="mt-4 space-y-4">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <Skeleton className="w-full aspect-video" />
              </div>
              <div className="col-span-12 md:col-span-8">
                <Skeleton className="w-full h-5" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
