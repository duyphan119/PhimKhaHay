import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/features/videos/components/video-card";
import VideosPagination from "@/features/videos/components/videos-pagination";
import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<TPaginationFilter & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const { keyword, ...awaitedSearchParams } = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.searchVideos(keyword, {
      ...awaitedSearchParams,
      limit: "30",
    });

    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Tìm kiếm" };
};

export default async function Search({ searchParams }: Props) {
  const { keyword, ...awaitedSearchParams } = await searchParams;

  const {
    data: {
      items,
      breadCrumb,
      params: { pagination },
      APP_DOMAIN_CDN_IMAGE,
    },
  } = await videoApi.searchVideos(keyword, {
    ...awaitedSearchParams,
    limit: "30",
  });
  return (
    <div className="grid grid-cols-12 gap-4">
      <Breadcrumb breadCrumb={breadCrumb} className="col-span-12" />
      {items.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          imageType="poster"
          appDomainCdnImage={APP_DOMAIN_CDN_IMAGE}
          className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
        />
      ))}
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
        className="col-span-12"
      />
    </div>
  );
}
