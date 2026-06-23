import VideoImage from "@/features/videos/components/video-image";
import { cn } from "@/lib/utils";
import Link from "next/link";

type VideoCardProps = {
  videoItem: {
    name: string;
    slug: string;
    thumb_url?: string;
    poster_url?: string;
    episode_current?: string;
    lang?: string;
  };
  href?: string;
  direction?: "row" | "col";
  className?: string;
  aspectType?: 'thumbnail' | "poster"
};

export default function VideoCard({
  videoItem,
  direction = "col", aspectType = 'poster', href, className = ''
}: VideoCardProps) {

  return (
    <div className={cn("video-card group", direction === "row" ? "flex gap-4" : "", className)}>
      <Link
        href={href || `/phim/${videoItem.slug}`}
        title={videoItem.name}
        className={cn(
          "block  relative overflow-hidden ",
          direction === "row" ? "w-1/3 shrink-0" : "w-full",
          aspectType === 'thumbnail' ? "aspect-686/386" : "aspect-394/701"
        )}
      >


        <VideoImage src={(aspectType === 'thumbnail' ? videoItem.poster_url : videoItem.thumb_url) || ''} alt={videoItem.slug} className="group-hover:scale-105 transition-transform duration-400" />

        {direction === "col" && videoItem.episode_current ? (
          <div className="absolute top-0 right-0 text-xs bg-destructive text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
            {videoItem.episode_current}
          </div>
        ) : null}
        {direction === "col" && videoItem.lang ? (
          <div className="absolute bottom-0 left-0 text-xs bg-sky-700 text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
            {videoItem.lang
              .replace("Thuyết Minh", "TM")
              .replace("Lồng Tiếng", "LT")}
          </div>
        ) : null}
      </Link>

      <div>
        <Link
          href={href || `/phim/${videoItem.slug}`}
          title={videoItem.name}
          className="font-medium line-clamp-2 group-hover:text-primary group-hover:underline group-hover:underline-offset-2 transition-colors duration-200 mt-1 text-sm"
        >
          {videoItem.name}
        </Link>
      </div>
    </div>
  );
}
