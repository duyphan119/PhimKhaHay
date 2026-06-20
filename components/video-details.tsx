"use client";

import Breadcrumb from "@/components/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Fire, Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import VideoCasts from "./video-casts";
import { Fragment } from "react";
import recommendVideos from "@/lib/recommend-videos.json";
import VideoCard from "./video-card";
import { sectionTitleVariants } from "@/lib/constants";
import SectionHeader from "./section-header";
import RelatedVideos from "./related-videos";

type Props = {
  video: TVideoDetailsResponse["movie"];
  episodes: TVideoDetailsResponse["episodes"];
  hideButtons?: boolean;
  children?: React.ReactNode;
  currentEpisodeSlug?: string;
  serverIndex?: number;
  currentBreadcrumb?: string;
};

export default function VideoDetails({
  video,
  hideButtons,
  children,
  episodes,
  currentEpisodeSlug,
  serverIndex,
  currentBreadcrumb,
}: Props) {
  const videoTypeSlug = video.type === "series" ? "phim-bo" : "phim-le";
  const videoTypeName = video.type === "series" ? "Phim bộ" : "Phim lẻ";
  const videoSlug = video.slug;

  let firstLink: string = `/phim/${videoSlug}`;

  if (episodes?.length) {
    // find first available
    for (let i = 0; i < episodes.length; i++) {
      const sd = episodes[i].server_data;
      if (sd && sd.length) {
        const ep = sd[0];
        firstLink = `/xem-phim/${videoSlug}/${i}/${ep.slug || ep.filename}`;
        break;
      }
    }
  }

  return (
    <div className="_container py-4 flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <Breadcrumb
            items={[
              {
                slug: `/danh-sach/${videoTypeSlug}`,
                isCurrent: false,
                name: videoTypeName,
                position: 1,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${video.year}`,
                isCurrent: false,
                name: video.year + "",
                position: 2,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${video.year}&country=${video.country[0].slug}`,
                isCurrent: false,
                name: video.country[0].name,
                position: 3,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${video.year}&country=${video.country[0].slug}&category=${video.category[0].slug}`,
                isCurrent: false,
                name: video.category[0].name,
                position: 4,
              },
              {
                isCurrent: children ? false : true,
                name: video.name,
                position: 5,
                slug: children ? `/phim/${video.slug}` : undefined,
              },
              ...(children && currentBreadcrumb
                ? [
                  {
                    isCurrent: true,
                    name: currentBreadcrumb,
                    position: 6,
                  },
                ]
                : []),
            ]}
          />
        </div>
        <div className="col-span-4 sm:col-span-3 space-y-4">
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
                children ? "order-3" : "order-1",
              )}
            >
              <div>
                <h1 className="text-3xl font-semibold leading-tight">
                  {video.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {video.origin_name}
                </p>
              </div>
            </div>
            {children ? <div className="order-1">{children}</div> : null}
            <article
              className={cn(
                "overflow-hidden rounded-sm border border-border bg-card shadow-sm block md:grid md:grid-cols-3",
                children ? "order-4" : "order-2",
              )}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950 md:col-span-1">
                <Image
                  unoptimized
                  src={`https://phimapi.com/image.php?url=${video.poster_url}`}
                  alt={video.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                  loading="eager"
                  crossOrigin="anonymous"
                />

                {hideButtons ? null : (
                  <div className="absolute bottom-2 inset-x-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/phim/${videoSlug}/tai-ve`}
                        title="Tải phim"
                        className={buttonVariants({
                          size: "lg",
                          variant: "lime",
                          className: "flex-1 rounded-sm",
                        })}
                      >
                        <HugeiconsIcon icon={Download} />
                        Tải về
                      </Link>
                      {firstLink ? (
                        <Link
                          href={firstLink}
                          title="Xem tập đầu tiên"
                          className={buttonVariants({
                            size: "lg",
                            variant: "sky",
                            className: "flex-1 rounded-sm",
                          })}
                        >
                          <HugeiconsIcon icon={Play} />
                          Xem ngay
                        </Link>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-4 md:col-span-2">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Năm
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.year}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Đạo diễn
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.director || "Đang cập nhật"}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Quốc gia
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.country?.map((item, index) => (
                      <Fragment key={item.slug}>
                        {index !== 0 ? <span>,&nbsp;</span> : null}
                        <Link
                          href={`/quoc-gia/${item.slug}`}
                          title={item.name}
                          className="hover:underline transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </Fragment>
                    )) || "Đang cập nhật"}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Thể loại
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.category.map((item, index) => (
                      <Fragment key={item.slug}>
                        {index !== 0 ? <span>,&nbsp;</span> : null}
                        <Link
                          href={`/the-loai/${item.slug}`}
                          title={item.name}
                          className="hover:underline transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </Fragment>
                    ))}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Thời lượng
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.time}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Chất lượng
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.quality}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Ngôn ngữ
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.lang}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Trạng thái
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.status === "completed"
                      ? "Hoàn thành"
                      : `Đang chiếu ${video.episode_current.toLowerCase()}`}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Tổng số tập
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {video.episode_total}
                  </div>
                </div>
              </div>
            </article>
            <div className={cn("space-y-4", children ? "order-5" : "order-3")}>
              <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Diễn viên</h2>
                <VideoCasts
                  castNames={video.actor}
                  tmdbId={video.tmdb.id}
                  tmdbType={video.tmdb.type}
                />
              </div>

              <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Nội dung phim</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: video.content || "Chưa có mô tả cho phim này.",
                  }}
                  className="mt-4 leading-7 text-muted-foreground text-sm text-justify"
                ></p>
              </div>
            </div>
            {episodes?.length ? (
              <div
                className={cn(
                  "rounded-sm border border-border bg-card p-6 shadow-sm",
                  children ? "order-2" : "order-4",
                )}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Danh sách tập</h2>
                    <p className="text-sm text-muted-foreground">
                      {episodes.length} server khả dụng
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {episodes.map((server, index) => {
                    const serverIsActive = index === serverIndex;
                    return (
                      <div
                        key={server.server_name}
                        className="rounded-sm border border-border bg-muted p-4"
                      >
                        <h3 className="text-sm font-semibold">
                          {server.server_name}
                          {serverIsActive && (
                            <Badge
                              variant={"destructive"}
                              className="ml-2 -translate-y-px"
                            >
                              Đang xem
                            </Badge>
                          )}
                        </h3>

                        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                          {server.server_data.map((item) => {
                            const episodeIsActive =
                              serverIsActive &&
                              item.slug === currentEpisodeSlug;
                            return (
                              <Link
                                key={item.slug || item.filename}
                                title={item.name}
                                href={`/xem-phim/${videoSlug}/${index}/${item.slug}`}
                                className={buttonVariants({
                                  variant: episodeIsActive
                                    ? "sky"
                                    : "background",
                                  className:
                                    "col-span-1 rounded-sm text-center",
                                })}
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <RelatedVideos currentSlug={video.slug} categories={video.category} countries={video.country} year={video.year} typelist={video.type === 'series' ? "phim-bo" : "phim-le"} />
        </div>
        <div className="col-span-4 sm:col-span-1">
          <SectionHeader
            title="Top phim nổi bật"
            icon={Fire}
            iconColor="text-orange-500"
            gradientClassName="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          />
          <div className="space-y-4 py-4">
            {recommendVideos.slice(0, 24).map((videoItem) => (
              <div key={videoItem.slug} className="">
                <VideoCard videoItem={videoItem} direction="row" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
