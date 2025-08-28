"use client";

import { buttonVariants } from "@/components/ui/button";
import { getWatchedVideos, WatchedVideo } from "@/features/watched-videos/data";
import { cn, shortenServerName } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  videoSlug: string;
  episodes: TEpisode[];
  current?: TServerDataItem;
};

export default function Episodes({ videoSlug, episodes, current }: Props) {
  const [watchedVideo, setWatchedVideo] = useState<WatchedVideo>();

  useEffect(() => {
    const watchedVideos = getWatchedVideos();

    setWatchedVideo(watchedVideos.find(({ slug }) => slug === videoSlug));
  }, [videoSlug]);

  return (
    <div className="space-y-4">
      {episodes.map(({ server_name, server_data }, index) => (
        <div key={server_name}>
          <div className="_bg-layout inline-block p-3 -mb-3 text-sm rounded-ss-md rounded-se-md">
            {shortenServerName(server_name)}
          </div>
          <div
            className={cn(
              "grid gap-3 p-3 _bg-layout rounded-es-md rounded-ee-md rounded-se-md",
              current
                ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10"
                : "grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
            )}
          >
            {[...server_data].reverse().map(({ name, slug, filename }) => {
              const isWatched = watchedVideo?.otherWatchedEpisodes.includes(
                `${name}${server_name}`
              );
              const isActive = current && filename === current.filename;
              return (
                <Link
                  key={name}
                  href={`/xem-phim/${videoSlug}?ep=${slug}&ser=${index}`}
                  className={buttonVariants({
                    className: "col-span-1",
                    size: "sm",
                    variant: isActive
                      ? "gradientYellowRed"
                      : isWatched
                      ? "watchedEpisode"
                      : "episode",
                  })}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
