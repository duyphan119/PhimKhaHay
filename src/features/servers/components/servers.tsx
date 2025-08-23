"use client";

import Episodes from "@/features/episodes/components/episodes";
import { Episode, VideoServer } from "@/features/videos/data";
import { getWatchedVideos, WatchedVideo } from "@/features/watched-videos/data";
import { shortenServerName } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  servers: VideoServer[];
  videoSlug: string;
  currentEpisode?: Episode;
};

export default function Servers({ servers, videoSlug, currentEpisode }: Props) {
  const [watchedVideo, setWatchedVideo] = useState<WatchedVideo>();

  useEffect(() => {
    const watchedVideos = getWatchedVideos();

    setWatchedVideo(watchedVideos.find(({ slug }) => slug === videoSlug));
  }, [videoSlug]);

  return (
    <div className="space-y-4">
      {servers.map((server, index) => (
        <div key={server.name}>
          <div className="bg-neutral-900 inline-block p-3 -mb-3 text-sm">
            {shortenServerName(server.name)}
          </div>
          <Episodes
            episodes={server.episodes}
            indexServer={index}
            videoSlug={videoSlug}
            otherWatchedEpisodes={watchedVideo?.otherWatchedEpisodes}
            serverName={server.name}
            currentEpisode={currentEpisode}
          />
        </div>
      ))}
    </div>
  );
}
