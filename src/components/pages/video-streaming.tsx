"use client";

import Breadcrumb from "@/components/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
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
import { useQueries, useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon, PlusSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

type Props = { slug: string; searchParams: { ep: string; ser: string } };

export default function VideoStreaming({
  slug,
  searchParams: { ep, ser },
}: Props) {
  const { data: video, isError } = useQuery({
    queryKey: ["video", slug],
    queryFn: () => videoApi.fetchVideoDetailsData(slug),
  });

  const item = video?.data.item;
  const cdn = video?.data.APP_DOMAIN_CDN_IMAGE || "";
  const episodes = item?.episodes || [];
  const epIndex = Number(ser) || 0;
  const curEp = episodes[epIndex];
  const sdIndex = curEp?.server_data.findIndex((s) => s.slug === ep) ?? 0;
  const curSData = curEp?.server_data[sdIndex === -1 ? 0 : sdIndex];
  const len = curEp?.server_data.length || 0;

  useEffect(() => {
    if (item) {
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
    }
  }, [item, cdn, curEp, curSData, epIndex]);

  if (isError || (item && !curSData?.name)) return redirect("/");

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      {item ? (
        <>
          <Breadcrumb
            breadCrumb={[
              ...video!.data.breadCrumb.map((b) =>
                b.slug
                  ? b
                  : { ...b, slug: `/phim/${item.slug}`, isCurrent: false }
              ),
              { name: `Tập ${curSData?.name}`, isCurrent: true },
            ]}
          />
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
          <Episodes
            videoSlug={item.slug}
            episodes={item.episodes}
            current={curSData}
          />
          <RecommendVideos
            slug={item.slug}
            country={item.country}
            category={item.category}
            videoType={item.type}
          />
        </>
      ) : (
        <>
          <Skeleton className="md:w-1/2 w-full h-6" />
          <div className="col-span-12">
            <Skeleton className="w-full aspect-video" />
            <div className="flex justify-center gap-4 mt-3">
              <Skeleton className="w-44 h-9" />
              <Skeleton className="w-44 h-9" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
