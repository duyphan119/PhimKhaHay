"use client";

import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/features/videos/components/video-card";
import InfiniteScroll from "react-infinite-scroll-component";
import videoApi from "@/features/videos/data";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

type Props = {
  searchParams: TPaginationFilter & { keyword: string };
};

export default function Search({ searchParams }: Props) {
  const { keyword, ...others } = searchParams;

  const { data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<TVideosResponse>({
      queryKey: ["search-videos", searchParams],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        videoApi.searchVideos(keyword, { ...others, page: String(pageParam) }),
      getNextPageParam: ({
        data: {
          params: { pagination },
        },
      }) => {
        const { currentPage, totalItems, totalItemsPerPage } = pagination;
        const totalPages = Math.ceil(totalItems / totalItemsPerPage);
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const items = data?.pages.flatMap((page) => page.data.items) ?? [];
  const appDomainCdnImage = data?.pages?.[0].data.APP_DOMAIN_CDN_IMAGE || "";

  return (
    <>
      <Breadcrumb
        breadCrumb={[{ name: `Tìm kiếm: ${keyword}`, isCurrent: true }]}
      />
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
        <div className="grid grid-cols-12 gap-4 mt-4 overflow-y-hidden">
          {items.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              imageType="poster"
              appDomainCdnImage={appDomainCdnImage}
              className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
