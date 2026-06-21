import { buttonVariants } from "@/components/ui/button";
import VideoImage from "@/features/videos/components/video-image";
import { cn } from "@/lib/utils";
import Link from "next/link";

type VideoCardProps = {
  videoItem: {
    name: string;
    slug: string;
    thumb_url: string;
    episode_current?: string;
    lang?: string;
  };
  direction?: "row" | "col";
  className?: string;
};

export default function VideoCard({
  videoItem,
  direction = "col", className = ''
}: VideoCardProps) {

  return (
    <div className={cn("video-card group", direction === "row" ? "flex gap-4" : "", className)}>
      <Link
        href={`/phim/${videoItem.slug}`}
        title={videoItem.name}
        className={cn(
          "block aspect-2/3 relative",
          direction === "row" ? "w-1/3 shrink-0" : "w-full",
        )}
      >


        <VideoImage src={videoItem.thumb_url} alt={videoItem.slug} />

        {direction === "col" && videoItem.episode_current ? (
          <div className="absolute top-0 right-0 text-xs bg-destructive text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
            {videoItem.episode_current.replace("Hoàn tất", "")}
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
          href={`/phim/${videoItem.slug}`}
          title={videoItem.name}
          className="font-medium line-clamp-2 group-hover:text-primary group-hover:underline group-hover:underline-offset-2 transition-colors duration-200 mt-1 text-sm"
        >
          {videoItem.name}
        </Link>
      </div>
    </div>
  );
}
