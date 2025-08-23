"use client";

import { Button } from "@/components/ui/button";
import { saveWatchedVideo, WatchedVideo } from "@/features/watched-videos/data";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";
import { Episode } from "../data";

type Props = {
  embedUrl: string;
  nextEpisode?: Episode;
  previousEpisode?: Episode;
  watchedVideoInput: WatchedVideo;
};

export default function VideoStreaming({
  embedUrl,
  nextEpisode,
  previousEpisode,
  watchedVideoInput,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!watchedVideoInput.episodeName) return;
    const timeoutId = setTimeout(() => {
      saveWatchedVideo(watchedVideoInput);
    }, 4567);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watchedVideoInput]);

  const handleSelectPreviousEpisode = () => {
    if (!previousEpisode) return;
    const indexServer = Number(searchParams.get("ser")) || 0;
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ep: previousEpisode.slug,
        ser: indexServer,
      },
    });
    router.push(url);
  };

  const handleSelectNextEpisode = () => {
    if (!nextEpisode) return;
    const indexServer = Number(searchParams.get("ser")) || 0;
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ep: nextEpisode.slug,
        ser: indexServer,
      },
    });
    router.push(url);
  };

  return (
    <>
      <iframe
        src={embedUrl}
        allowFullScreen
        className="w-full aspect-video"
      ></iframe>
      <div className="flex items-center justify-center gap-4">
        {previousEpisode && (
          <Button variant="secondary" onClick={handleSelectPreviousEpisode}>
            <ChevronLeftIcon className="translate-y-[2px]" /> Tập trước
          </Button>
        )}
        {nextEpisode && (
          <Button variant="secondary" onClick={handleSelectNextEpisode}>
            Tập tiếp
            <ChevronRightIcon className="translate-y-[2px]" />
          </Button>
        )}
      </div>
    </>
  );
}
