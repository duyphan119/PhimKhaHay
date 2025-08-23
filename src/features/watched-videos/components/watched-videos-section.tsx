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
import { shortenServerName, shortenVideoLanguage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getWatchedVideos, WatchedVideo } from "@/features/watched-videos/data";
import { useEffect, useState } from "react";

export default function WatchedVideosSection() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    setWatchedVideos(getWatchedVideos());
  }, []);

  if (watchedVideos.length === 0) return null;

  return (
    <section className="space-y-4 mt-12">
      <div className="flex items-center justify-between gap-2 bg-neutral-900 p-4 rounded-md">
        <h5 className="text-xl font-medium">Xem tiếp?</h5>

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
              <Link
                href={`/xem-phim/${item.slug}${item.query}`}
                className="relative block w-full aspect-video select-none"
              >
                <Image
                  src={item.thumbnail}
                  alt="Thumbnail"
                  fill
                  sizes="(max-width: 1200px) 50vw, 100vw"
                  className="object-cover rounded-md shadow"
                />
                <Badge
                  variant="watchedEpisode"
                  className="absolute top-0 right-0 "
                >
                  {item.episodeName}
                </Badge>
                <Badge variant="language" className="absolute bottom-0 left-0 ">
                  {shortenVideoLanguage(shortenServerName(item.serverName))}
                </Badge>
              </Link>
              <div className="mt-2">
                <Link
                  href={`/phim/${item.slug}`}
                  title={item.name}
                  className="font-medium line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2"
                >
                  {item.name}
                </Link>
                <p
                  title={item.originName}
                  className="text-muted-foreground text-sm line-clamp-2"
                >
                  {item.originName}
                </p>
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
