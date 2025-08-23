"use client";

import Link from "next/link";
import { LatestVideo } from "../data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn, shortenVideoLanguage } from "@/lib/utils";

type Props = {
  video: LatestVideo;
  imageType: "poster" | "thumbnail";
  className?: string;
};

export default function VideoCard({ video, imageType, className }: Props) {
  return (
    <div className={className}>
      <Link
        href={`/phim/${video.slug}`}
        className={cn(
          "relative block w-full select-none overflow-hidden",
          imageType === "thumbnail" ? "aspect-video" : "aspect-[23/35]"
        )}
      >
        <Image
          src={imageType === "thumbnail" ? video.thumbnail : video.poster}
          alt={imageType === "thumbnail" ? "Thumbnail" : "Poster"}
          fill
          className="object-cover rounded-md shadow hover:scale-105 transition-transform duration-300"
        />

        <Badge variant="episode" className="absolute top-0.5 right-0.5 ">
          {video.episodeCurrent}
        </Badge>
        <Badge variant="language" className="absolute bottom-0.5 left-0.5 ">
          {shortenVideoLanguage(video.language)}
        </Badge>
      </Link>
      <div className="p-2 text-center">
        <Link
          href={`/phim/${video.slug}`}
          title={video.originName}
          className="font-lime-400 line-clamp-2 hover:underline hover:underline-offset-2"
        >
          {video.originName}
        </Link>
        <p
          title={video.name}
          className="text-muted-foreground text-sm line-clamp-2"
        >
          {video.name}
        </p>
      </div>
    </div>
  );
}
