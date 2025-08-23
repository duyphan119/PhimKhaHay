import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LatestVideo } from "../data";
import { Badge } from "@/components/ui/badge";
import { shortenVideoLanguage } from "@/lib/utils";

type Props = {
  title: string;
  videos: LatestVideo[];
  href: string;
};

export default function VideosCategorySection({ title, videos, href }: Props) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-2 _bg-layout p-4 rounded-md">
        <h5 className="text-xl font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
          {title}
        </h5>

        <Link
          href={href}
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4 mt-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="col-span-1 _bg-layout rounded-es-md rounded-ee-md"
          >
            <Link
              href={`/phim/${video.slug}`}
              className="relative block w-full aspect-[23/35] select-none overflow-hidden"
            >
              <Image
                src={video.poster}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-ss-md rounded-se-md shadow hover:scale-105 transition-transform duration-200"
              />

              <Badge variant="episode" className="absolute top-0.5 right-0.5 ">
                {video.episodeCurrent}
              </Badge>
              <Badge
                variant="language"
                className="absolute bottom-0.5 left-0.5 "
              >
                {shortenVideoLanguage(video.language)}
              </Badge>
            </Link>
            <div className="p-2 text-center">
              <Link
                href={`/phim/${video.slug}`}
                title={video.originName}
                className="font-medium line-clamp-2 text-lime-400 hover:underline hover:underline-offset-2"
              >
                {video.originName}
              </Link>
              <p
                title={video.name}
                className="text-muted-foreground text-xs line-clamp-2"
              >
                {video.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
