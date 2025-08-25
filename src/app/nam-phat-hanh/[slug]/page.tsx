import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/features/videos/components/video-card";
import VideosPagination from "@/features/videos/components/videos-pagination";
import VideosYearFilter from "@/features/videos/components/videos-year-filter";
import yearApi from "@/features/years/data";
import { getSeo } from "@/lib/utils";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TVideosFilter, "year">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: year } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await yearApi.fetchVideosData(year, awaitedSearchParams);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: year } = await params;
  const awaitedSearchParams = await searchParams;

  const {
    data: {
      items,
      params: { pagination },
      breadCrumb,
      APP_DOMAIN_CDN_IMAGE,
    },
  } = await yearApi.fetchVideosData(year, awaitedSearchParams);

  return (
    <div className="space-y-4">
      <Breadcrumb breadCrumb={breadCrumb} />
      <VideosYearFilter slug={year} searchParams={awaitedSearchParams} />
      <div className="grid grid-cols-12 gap-4">
        {items.map((video) => (
          <VideoCard
            appDomainCdnImage={APP_DOMAIN_CDN_IMAGE}
            key={video._id}
            video={video}
            imageType="poster"
            className="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2"
          />
        ))}
      </div>
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}
