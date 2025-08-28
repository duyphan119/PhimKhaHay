"use client";

import Breadcrumb from "@/components/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Actors from "@/features/actors/components/actors";
import actorApi from "@/features/actors/data";
import Episodes from "@/features/episodes/components/episodes";
import Images from "@/features/images/components/images";
import imageApi from "@/features/images/data";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoCard from "@/features/videos/components/video-card";
import VideoInfo from "@/features/videos/components/video-info";
import videoApi from "@/features/videos/data";
import VideoInfoSkeleton from "@/features/videos/skeletons/video-info-skeleton";
import { saveWatchedVideo } from "@/features/watched-videos/data";
import { useQueries } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon, PlusSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

type Props = { slug: string; searchParams: { ep: string; ser: string } };

export default function VideoStreaming({
  slug,
  searchParams: { ep, ser },
}: Props) {
  const router = useRouter();

  const [
    { data: video, isError },
    { data: actors },
    { data: images },
    { data: latest },
  ] = useQueries({
    queries: [
      {
        queryKey: ["video", slug],
        queryFn: () => videoApi.fetchVideoDetailsData(slug),
      },
      {
        queryKey: ["actors", slug],
        queryFn: () => actorApi.fetchActorsData(slug),
      },
      {
        queryKey: ["images", slug],
        queryFn: () => imageApi.fetchImagesData(slug),
      },
      { queryKey: ["latest-videos"], queryFn: () => videoApi.fetchHomeData() },
    ],
  });

  const item = video?.data.item;
  const cdn = video?.data.APP_DOMAIN_CDN_IMAGE || "";
  const episodes = item?.episodes || [];
  const epIndex = Number(ser) || 0;
  const curEp = episodes[epIndex];
  const sdIndex = curEp?.server_data.findIndex((s) => s.slug === ep) ?? 0;
  const curSData = curEp?.server_data[sdIndex === -1 ? 0 : sdIndex];
  const len = curEp?.server_data.length || 0;

  if (isError || (item && !curSData?.name)) return redirect("/");

  useEffect(() => {
    if (!item) return;
    saveWatchedVideo({
      id: item._id,
      name: item.name,
      originName: item.origin_name,
      otherWatchedEpisodes: [],
      query: `?${queryString.stringify({ ep: curSData.slug, ser: epIndex })}`,
      serverDataItemName: curSData.name,
      serverName: curEp.server_name,
      slug: item.slug,
      thumbnail: `${cdn}/uploads/movies/${item.poster_url}`,
      time: new Date().getTime(),
    });
  }, [item, cdn, curEp, curSData, epIndex]);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Breadcrumb */}
      {item ? (
        <Breadcrumb
          breadCrumb={[
            ...video!.data.breadCrumb.map((b) =>
              b.slug
                ? b
                : { ...b, slug: `/phim/${item.slug}`, isCurrent: false }
            ),
            { name: `Tập ${curSData?.name}`, isCurrent: true },
          ]}
          className="col-span-12"
        />
      ) : (
        <Skeleton className="col-span-12 md:w-1/2 w-full h-6" />
      )}

      {/* Video Player + Info */}
      <div className="col-span-12 lg:col-span-8">
        <div className="grid grid-cols-12 gap-4">
          {item ? (
            <div className="col-span-12">
              <iframe
                src={curSData?.link_embed}
                allowFullScreen
                className="w-full aspect-video"
              />
              {len > 1 && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Link
                    href={queryString.stringifyUrl({
                      url: `/xem-phim/${item.slug}`,
                      query: {
                        ep: curEp?.server_data[(sdIndex - 1 + len) % len].slug,
                        ser: epIndex,
                      },
                    })}
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    <ChevronLeftIcon className="translate-y-[2px]" /> Tập trước
                  </Link>
                  <Link
                    href={queryString.stringifyUrl({
                      url: `/xem-phim/${item.slug}`,
                      query: {
                        ep: curEp?.server_data[(sdIndex + 1 + len) % len].slug,
                        ser: epIndex,
                      },
                    })}
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    Tập tiếp <ChevronRightIcon className="translate-y-[2px]" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="col-span-12">
              <Skeleton className="w-full aspect-video" />
              <div className="flex justify-center gap-4 mt-3">
                <Skeleton className="w-44 h-9" />
                <Skeleton className="w-44 h-9" />
              </div>
            </div>
          )}

          {/* Poster + Info */}
          <div className="col-span-12 sm:col-span-6 xl:col-span-5">
            {item ? (
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={`${cdn}/uploads/movies/${item.thumb_url}`}
                  alt="Poster"
                  fill
                  unoptimized
                  className="object-cover rounded-md shadow"
                  priority
                />
              </div>
            ) : (
              <Skeleton className="w-full aspect-[2/3]" />
            )}
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-7">
            {item ? (
              <VideoInfo video={item} buttonPlayVisible />
            ) : (
              <VideoInfoSkeleton buttonPlayVisible />
            )}
          </div>

          {/* Accordion */}
          <Accordion
            defaultValue={["actors", "episodes", "images"]}
            type="multiple"
            className="col-span-12 space-y-4"
          >
            {actors && actors.data.peoples.length > 0 && (
              <AccordionItem value="actors">
                <AccordionTrigger
                  hideIcon
                  className="_bg-layout w-full rounded-md"
                >
                  <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                  <span className="text-xl font-medium _text-title-pink">
                    Diễn viên
                  </span>
                </AccordionTrigger>
                <AccordionContent noPadding className="_bg-layout p-4">
                  <Actors actorsData={actors.data} />
                </AccordionContent>
              </AccordionItem>
            )}

            {item?.episodes[0]?.server_data?.[0].name && (
              <AccordionItem value="episodes">
                <AccordionTrigger
                  hideIcon
                  className="_bg-layout w-full rounded-md"
                >
                  <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                  <span className="text-xl font-medium _text-title-pink">
                    Danh sách tập
                  </span>
                </AccordionTrigger>
                <AccordionContent noPadding className="_bg-layout p-4">
                  <Episodes
                    videoSlug={item.slug}
                    episodes={item.episodes}
                    current={curSData}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {images && (
              <AccordionItem value="images">
                <AccordionTrigger
                  hideIcon
                  className="_bg-layout w-full rounded-md"
                >
                  <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                  <span className="text-xl font-medium _text-title-pink">
                    Hình ảnh
                  </span>
                </AccordionTrigger>
                <AccordionContent noPadding className="_bg-layout p-4">
                  <Images imagesData={images.data} />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>

      {/* Sidebar */}
      <div className="col-span-12 lg:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 text-lg font-medium p-4 _bg-layout rounded-md">
            <div className="_text-title-pink">Phim mới</div>
          </div>
          {latest?.data.items.map((v) => (
            <VideoCard
              key={v._id}
              appDomainCdnImage={latest?.data.APP_DOMAIN_CDN_IMAGE || ""}
              video={v}
              imageType="poster"
              className="col-span-2 lg:col-span-1 _bg-layout"
            />
          ))}
        </div>
      </div>

      {/* Recommend */}
      {item && (
        <div className="col-span-12">
          <RecommendVideos
            slug={item.slug}
            country={item.country}
            category={item.category}
            videoType={item.type}
          />
        </div>
      )}
    </div>
  );
}
