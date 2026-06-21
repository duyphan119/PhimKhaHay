"use client";

import Breadcrumb from "@/components/breadcrumb";
import SectionHeader from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import VideoCasts from "@/features/casts/components/video-casts";
import RelatedVideos from "@/features/videos/components/related-videos";
import VideoCard from "@/features/videos/components/video-card";
import hotVideos from "@/lib/hot-videos.json";
import { cn, randomVideos } from "@/lib/utils";
import { Download, Fire, Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Fragment } from "react";
import VideoImage from "../components/video-image";


type VideoDetailsPageProps = {
  item: TMovieDetails;
  hideButtons?: boolean;
  children?: React.ReactNode;
  currentEpisodeSlug?: string;
  serverIndex?: number;
  currentBreadcrumb?: string;
}

export default function VideoDetailsPage({
  item,
  hideButtons,
  children,
  currentEpisodeSlug,
  serverIndex,
  currentBreadcrumb,
}: VideoDetailsPageProps) {
  const videoTypeSlug = item.type === "series" ? "phim-bo" : "phim-le";
  const videoTypeName = item.type === "series" ? "Phim bộ" : "Phim lẻ";
  const videoSlug = item.slug;

  let firstLink: string = `/phim/${videoSlug}`;

  if (item.episodes?.length) {
    // find first available
    for (let i = 0; i < item.episodes.length; i++) {
      const sd = item.episodes[i].server_data;
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
                slug: `/nam-phat-hanh/${videoTypeSlug}?year=${item.year}`,
                isCurrent: false,
                name: item.year + "",
                position: 2,
              },
              {
                slug: `/nam-phat-hanh/${videoTypeSlug}?year=${item.year}&country=${item.country[0].slug}`,
                isCurrent: false,
                name: item.country[0].name,
                position: 3,
              },
              {
                slug: `/nam-phat-hanh/${videoTypeSlug}?year=${item.year}&country=${item.country[0].slug}&category=${item.category[0].slug}`,
                isCurrent: false,
                name: item.category[0].name,
                position: 4,
              },
              {
                isCurrent: children ? false : true,
                name: item.name,
                position: 5,
                slug: children ? `/phim/${item.slug}` : undefined,
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
                  {item.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {item.origin_name}
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
              <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-950 md:col-span-1">
                <VideoImage src={item.thumb_url} alt={item.name} />

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
                    {item.year}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Đạo diễn
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.director.join(",") || "Đang cập nhật"}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Quốc gia
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.country?.map((item, index) => (
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
                    {item.category.map((item, index) => (
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
                    {item.time}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Chất lượng
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.quality}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Ngôn ngữ
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.lang}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Trạng thái
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.status === "completed"
                      ? "Hoàn thành"
                      : `Đang chiếu ${item.episode_current.toLowerCase()}`}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Tổng số tập
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {item.episode_total}
                  </div>
                </div>
              </div>
            </article>
            <div className={cn("space-y-4", children ? "order-5" : "order-3")}>
              <VideoCasts
                castNames={item.actor}
                tmdbId={item.tmdb.id}
                tmdbType={item.tmdb.type}
              />

              <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Nội dung phim</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content || "Chưa có mô tả cho phim này.",
                  }}
                  className="mt-4 leading-7 text-muted-foreground text-sm text-justify"
                ></div>
              </div>
            </div>
            {item.episodes?.length ? (
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
                      {item.episodes.length} server khả dụng
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {item.episodes.map((server, index) => {
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
                          {server.server_data.map((item, _index) => {
                            const episodeIsActive =
                              serverIsActive &&
                              item.slug === currentEpisodeSlug;
                            return (
                              <Link
                                key={_index}
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
          <RelatedVideos currentSlug={item.slug} categories={item.category} countries={item.country} year={item.year} typelist={item.type === 'series' ? "phim-bo" : "phim-le"} />
        </div>
        <div className="col-span-4 sm:col-span-1">
          <SectionHeader
            title="Top phim nổi bật"
            icon={Fire}
            iconColor="text-orange-500"
            gradientClassName="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          />
          <div className="space-y-4 py-4">
            {randomVideos(hotVideos, 25).filter(({ slug }) => item.slug !== slug).map((videoItem, index) => index === 24 ? null : (
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