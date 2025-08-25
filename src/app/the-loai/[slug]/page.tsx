import Breadcrumb from "@/components/breadcrumb";
import categoryApi from "@/features/categories/data";
import VideoCard from "@/features/videos/components/video-card";
import VideosCategoryFilter from "@/features/videos/components/videos-category-filter";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { getSeo } from "@/lib/utils";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TVideosFilter, "category">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await categoryApi.fetchVideosData(typelist, awaitedSearchParams);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: countrySlug } = await params;
  const awaitedSearchParams = await searchParams;

  const {
    data: {
      items,
      params: { pagination },
      breadCrumb,
      APP_DOMAIN_CDN_IMAGE,
    },
  } = await categoryApi.fetchVideosData(countrySlug, awaitedSearchParams);

  return (
    <div className="space-y-4">
      <Breadcrumb breadCrumb={breadCrumb} />
      <VideosCategoryFilter
        slug={countrySlug}
        searchParams={awaitedSearchParams}
      />
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
