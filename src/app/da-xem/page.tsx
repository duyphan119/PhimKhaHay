"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ButtonDeleteWatchedVideo from "@/features/watched-videos/components/button-delete-watched-video";
import {
  getWatchedVideos,
  WatchedVideo as WatchedVideoType,
} from "@/features/watched-videos/data";
import { shortenServerName, shortenVideoLanguage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WatchedVideo() {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideoType[]>([]);
  useEffect(() => {
    document.title = "PhimKhaHay | Video đã xem";

    setWatchedVideos(getWatchedVideos());
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 _container p-4">
      <Breadcrumb items={[{ text: "Video đã xem" }]} className="col-span-12" />
      {watchedVideos.length > 0 ? (
        watchedVideos.map((item) => (
          <div
            key={item.id}
            className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
          >
            <Link
              href={`/xem-phim/${item.slug}${item.query}`}
              className="relative block aspect-video select-none"
            >
              <Image
                src={item.thumbnail}
                alt="Poster"
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
                className="text-muted-foreground text-sm line-clamp-2 mb-1"
              >
                {item.originName}
              </p>
              <ButtonDeleteWatchedVideo
                id={item.id}
                onSuccess={() => {
                  setWatchedVideos(
                    watchedVideos.filter(({ id }) => item.id !== id)
                  );
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-12 flex flex-col items-center">
          <h4 className="text-2xl">Bạn chưa xem phim nào!</h4>
          <Link
            href={`/danh-sach`}
            className={buttonVariants({ variant: "link" })}
          >
            Chọn phim ngay
          </Link>
        </div>
      )}
    </div>
  );
}
