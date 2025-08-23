import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { LatestVideo } from "../data";
import { cn, shortenVideoLanguage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  videos: LatestVideo[];
  href: string;
  titleColor: "red" | "blue" | "yellow";
};

export default function VideosCountrySection({
  title,
  videos,
  href,
  titleColor,
}: Props) {
  return (
    <section className="grid grid-cols-5 xl:grid-cols-6 gap-4">
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
                key={video.id}
                className="basis-1/2 md:basis-1/3 xl:basis-1/4"
              >
                <Link
                  href={`/phim/${video.slug}`}
                  className="relative block w-full aspect-video select-none _bg-container overflow-hidden"
                >
                  <Image
                    src={video.thumbnail}
                    alt="Thumbnail"
                    fill
                    sizes="(max-width: 1200px) 50vw, 100vw"
                    className="object-cover rounded-md shadow hover:scale-105 transition-transform duration-200"
                  />
                  <Badge variant="episode" className="absolute top-0 right-0 ">
                    {video.episodeCurrent}
                  </Badge>
                  <Badge
                    variant="language"
                    className="absolute bottom-0 left-0 "
                  >
                    {shortenVideoLanguage(video.language)}
                  </Badge>
                </Link>
                <div className="p-2 text-center _bg-container">
                  <Link
                    href={`/phim/${video.slug}`}
                    title={video.originName}
                    className="font-medium line-clamp-2 text-lime-400 hover:underline hover:underline-offset-2"
                  >
                    {video.originName}
                  </Link>
                  <p
                    title={video.name}
                    className="text-muted-foreground text-xs line-clamp-2"
                  >
                    {video.name}
                  </p>
                </div>
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
