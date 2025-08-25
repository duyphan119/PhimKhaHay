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
    limit: "16",
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
          className="_text-primary _hover-underline"
        >
          Có thể bạn thích
        </Link>
      </div>
      <div className="space-y-4 mt-4">
        {data.data.items
          .filter((item) => item.slug !== slug)
          .map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              imageType="thumbnail"
              appDomainCdnImage={data.data.APP_DOMAIN_CDN_IMAGE}
              className="_bg-layout"
            />
          ))}
      </div>
    </>
  );
}
