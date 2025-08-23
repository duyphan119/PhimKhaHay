"use client";

import { buttonVariants } from "@/components/ui/button";
import { Episode } from "@/features/videos/data";
import Link from "next/link";

type Props = {
  episodes: Episode[];
  indexServer: number;
  videoSlug: string;
  otherWatchedEpisodes?: string[];
  serverName: string;
  currentEpisode?: Episode;
};

export default function Episodes({
  episodes,
  indexServer,
  videoSlug,
  otherWatchedEpisodes = [],
  serverName,
  currentEpisode,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-3 bg-neutral-900 rounded-md">
      {[...episodes].reverse().map((episode) => {
        const isWatched = otherWatchedEpisodes.includes(
          `${episode.name}${serverName}`
        );
        const isActive =
          currentEpisode && episode.filename === currentEpisode.filename;
        return (
          <Link
            key={episode.name}
            href={`/xem-phim/${videoSlug}?ep=${episode.slug}&ser=${indexServer}`}
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
            {episode.name}
          </Link>
        );
      })}
    </div>
  );
}
