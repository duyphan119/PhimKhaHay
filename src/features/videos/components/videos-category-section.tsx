import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import VideoCard from "./video-card";

type Props = {
  title: string;
  videos: TVideoItem[];
  href: string;
  appDomainCdnImage: string;
};

export default function VideosCategorySection({
  title,
  videos,
  href,
  appDomainCdnImage,
}: Props) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between gap-2 _bg-layout p-4 rounded-md">
        <h5 className="text-xl font-medium _text-title-pink">{title}</h5>

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
          <VideoCard
            key={video._id}
            appDomainCdnImage={appDomainCdnImage}
            video={video}
            imageType="poster"
            className="col-span-1 _bg-layout rounded-es-md rounded-ee-md"
          />
        ))}
      </div>
    </section>
  );
}
