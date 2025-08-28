"use client";

import Breadcrumb from "@/components/breadcrumb";
import countryApi from "@/features/countries/data";
import VideoCard from "@/features/videos/components/video-card";
import VideoscountryFilter from "@/features/videos/components/videos-country-filter";
import VideoCardSkeleton from "@/features/videos/skeletons/video-card-skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  searchParams: Omit<TVideosFilter, "country">;
  countrySlug: string;
};

export default function VideosCountry({ countrySlug, searchParams }: Props) {
  const { data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<TVideosResponse>({
      queryKey: ["videos-country", countrySlug, searchParams],
      initialPageParam: 1,
      getNextPageParam: ({
        data: {
          params: { pagination },
        },
      }) => {
        const { currentPage, totalItems, totalItemsPerPage } = pagination;
        const totalPages = Math.ceil(totalItems / totalItemsPerPage);
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      queryFn: () => countryApi.fetchVideosData(countrySlug, searchParams),
    });
  const items = data?.pages.flatMap((page) => page.data.items) ?? [];
  const appDomainCdnImage = data?.pages?.[0].data.APP_DOMAIN_CDN_IMAGE || "";
  return (
    <>
      <Breadcrumb
        breadCrumb={
          data?.pages?.[data?.pages?.length - 1].data.breadCrumb || []
        }
        className="mb-4"
      ></Breadcrumb>
      <div className="mb-4">
        <VideoscountryFilter slug={countrySlug} searchParams={searchParams} />
      </div>
      {data ? (
        <InfiniteScroll
          dataLength={items.length}
          hasMore={!!hasNextPage}
          next={fetchNextPage}
          loader={
            <div className="flex justify-center w-full">
              <Loader2Icon className="size-8 animate-spin" />
            </div>
          }
          refreshFunction={refetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          className="!overflow-y-hidden"
        >
          <div className="grid grid-cols-12 gap-4">
            {items.map((video, i) => (
              <VideoCard
                key={i}
                appDomainCdnImage={appDomainCdnImage}
                video={video}
                imageType="poster"
                className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton
              key={i}
              imageType="poster"
              className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
            />
          ))}
        </div>
      )}
    </>
  );
}
