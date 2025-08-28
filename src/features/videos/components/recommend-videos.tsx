"use client";

import RecommendVideosSkeleton from "@/features/videos/skeletons/recommend-videos-skeleton";
import { VIDEO_TYPE_SLUG } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import queryString from "query-string";
import videoApi from "../data";
import VideoCard from "./video-card";

type RecommendVideosProps = {
  slug: string;
  country: TCountry[];
  category: TCategory[];
  videoType: string;
};

export default function RecommendVideos({
  slug,
  country,
  category,
  videoType,
}: RecommendVideosProps) {
  const filter = {
    category: category.map(({ slug }) => slug).join(","),
    country: country.map(({ slug }) => slug).join(","),
    limit: "18",
  };
  const { data } = useQuery({
    queryKey: ["recommend-videos", slug],
    queryFn: () => videoApi.fetchVideosData(VIDEO_TYPE_SLUG[videoType], filter),
  });

  if (!data) return <RecommendVideosSkeleton />;

  return (
    <>
      <div className="text-lg font-medium">
        <Link
          href={queryString.stringifyUrl({
            url: `/danh-sach/${VIDEO_TYPE_SLUG[videoType]}`,
            query: filter,
          })}
          className="_text-title-pink"
        >
          Có thể bạn thích
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4">
        {data.data.items
          .filter((item) => item.slug !== slug)
          .map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              imageType="poster"
              appDomainCdnImage={data.data.APP_DOMAIN_CDN_IMAGE}
              className="_bg-layout col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
            />
          ))}
      </div>
    </>
  );
}
