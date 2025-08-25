import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Link from "next/link";
import VideoCard from "./video-card";

type Props = {
  title: string;
  videos: TVideoItem[];
  href: string;
  titleColor: "red" | "blue" | "yellow";
  appDomainCdnImage: string;
};

export default function VideosCountrySection({
  title,
  videos,
  href,
  titleColor,
  appDomainCdnImage,
}: Props) {
  return (
    <section className="grid grid-cols-5 xl:grid-cols-6 gap-4 _bg-layout mt-12 p-4">
      <div className="col-span-5 md:col-span-1 flex md:flex-col md:justify-center justify-between">
        <h6
          className={cn(
            "font-medium text-lg bg-gradient-to-r text-transparent bg-clip-text",
            titleColor === "red" && "from-rose-600 to-rose-300",
            titleColor === "blue" && "from-sky-600 to-sky-300",
            titleColor === "yellow" && "from-amber-600 to-amber-300"
          )}
        >
          {title}
        </h6>
        <Link
          href={href}
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="col-span-5 md:col-span-4 xl:col-span-5">
        <Carousel>
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem
                key={video._id}
                className="basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <VideoCard
                  appDomainCdnImage={appDomainCdnImage}
                  video={video}
                  imageType="thumbnail"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
