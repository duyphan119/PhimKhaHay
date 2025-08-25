"use client";

import { Button } from "@/components/ui/button";
import { saveWatchedVideo, WatchedVideo } from "@/features/watched-videos/data";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

type Props = {
  embedUrl: string;
  nextServerDataItem?: TServerDataItem;
  previousServerDataItem?: TServerDataItem;
  watchedVideoInput: WatchedVideo;
};

export default function VideoStreaming({
  embedUrl,
  nextServerDataItem,
  previousServerDataItem,
  watchedVideoInput,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!watchedVideoInput.serverDataItemName) return;
    const timeoutId = setTimeout(() => {
      saveWatchedVideo(watchedVideoInput);
    }, 4567);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watchedVideoInput]);

  const handleSelectPreviousServerDataItem = () => {
    if (!previousServerDataItem) return;
    const indexServer = Number(searchParams.get("ser")) || 0;
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ep: previousServerDataItem.slug,
        ser: indexServer,
      },
    });
    router.push(url);
  };

  const handleSelectnextServerDataItem = () => {
    if (!nextServerDataItem) return;
    const indexServer = Number(searchParams.get("ser")) || 0;
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ep: nextServerDataItem.slug,
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
        {previousServerDataItem && (
          <Button
            variant="secondary"
            onClick={handleSelectPreviousServerDataItem}
          >
            <ChevronLeftIcon className="translate-y-[2px]" /> Tập trước
          </Button>
        )}
        {nextServerDataItem && (
          <Button variant="secondary" onClick={handleSelectnextServerDataItem}>
            Tập tiếp
            <ChevronRightIcon className="translate-y-[2px]" />
          </Button>
        )}
      </div>
    </>
  );
}
