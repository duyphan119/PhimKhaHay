import { buttonVariants } from "@/components/ui/button";
import { Video } from "@/features/videos/data";
import Link from "next/link";
import { Fragment } from "react";

type VideoInfoProps = {
  video: Video;
  buttonPlayVisible?: boolean;
};

export default function VideoInfo({
  video,
  buttonPlayVisible = false,
}: VideoInfoProps) {
  return (
    <div>
      <div className="text-3xl font-medium">{video.name}</div>
      <div className="text-neutral-400">{video.originName}</div>
      <div className="text-sm mt-4">Đạo diễn: {video.director}</div>
      <div className="text-sm">
        Quốc gia:{" "}
        {video.countries.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/danh-sach?country=${item.slug}`}
              className="hover:text-lime-400 hover:underline-offset-2 hover:underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="text-sm">Năm: {video.year}</div>
      <div className="text-sm">
        Thể loại:{" "}
        {video.categories.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span>, </span>}
            <Link
              href={`/danh-sach?category=${item.slug}`}
              className="hover:text-lime-400 hover:underline-offset-2 hover:underline"
            >
              {item.name}
            </Link>
          </Fragment>
        ))}
      </div>
      <div className="text-sm">Diễn viên: {video.actors.join(", ")}</div>
      {buttonPlayVisible && (
        <div className="mt-4">
          <Link
            href={`/xem-phim/${video.slug}`}
            className={buttonVariants({
              size: "xl",
              variant: "gradientYellowRed",
            })}
          >
            XEM NGAY
          </Link>
        </div>
      )}
    </div>
  );
}
