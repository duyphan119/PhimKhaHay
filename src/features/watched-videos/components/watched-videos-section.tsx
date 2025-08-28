"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getWatchedVideos, WatchedVideo } from "@/features/watched-videos/data";
import { shortenVideoLanguage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WatchedVideosSection() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    setWatchedVideos(getWatchedVideos());
  }, []);

  if (watchedVideos.length === 0) return null;

  return (
    <section className="space-y-4 mt-12">
      <div className="flex items-center justify-between gap-2 _bg-layout p-4 rounded-md">
        <h5 className="text-xl font-medium bg-gradient-to-r from-green-400 to-lime-400 text-transparent bg-clip-text">
          Xem tiếp?
        </h5>

        <Link
          href="/da-xem"
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Xem tất cả
        </Link>
      </div>
      <Carousel>
        <CarouselContent>
          {watchedVideos.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="_bg-layout rounded-md">
                <Link
                  href={`/xem-phim/${item.slug}${item.query}`}
                  className="relative block w-full aspect-video select-none"
                >
                  <Image
                    src={item.thumbnail}
                    alt="Thumbnail"
                    fill
                    unoptimized
                    className="object-cover rounded-md shadow"
                  />
                  <Badge
                    variant="watchedEpisode"
                    className="absolute top-0.5 right-0.5 "
                  >
                    Tập {item.serverDataItemName}
                  </Badge>
                  <Badge
                    variant="language"
                    className="absolute bottom-0.5 left-0.5 "
                  >
                    {shortenVideoLanguage(item.serverName)}
                  </Badge>
                </Link>
                <div className="p-2 text-center">
                  <Link
                    href={`/phim/${item.slug}`}
                    title={item.originName}
                    className="_text-primary line-clamp-2 _hover-underline"
                  >
                    {item.originName}
                  </Link>
                  <p
                    title={item.name}
                    className="text-muted-foreground text-sm line-clamp-2"
                  >
                    {item.name}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
