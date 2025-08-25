import Breadcrumb from "@/components/breadcrumb";
import { TypeList } from "@/features/typelist/data";
import VideoCard from "@/features/videos/components/video-card";
import VideosPagination from "@/features/videos/components/videos-pagination";
import VideosTypelistFilter from "@/features/videos/components/videos-typelist-filter";
import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import { Metadata } from "next";

type VideosPageProps = {
  params: Promise<{
    slug: TypeList;
  }>;
  searchParams: Promise<TVideosFilter>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: VideosPageProps): Promise<Metadata> => {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchVideosData(typelist, awaitedSearchParams);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function VideosPage({
  params,
  searchParams,
}: VideosPageProps) {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;

  const {
    data: {
      items,
      params: { pagination },
      breadCrumb,
      APP_DOMAIN_CDN_IMAGE,
    },
  } = await videoApi.fetchVideosData(typelist, awaitedSearchParams);

  return (
    <div className="">
      <Breadcrumb breadCrumb={breadCrumb} className="mb-4"></Breadcrumb>
      <div className="mb-4">
        <VideosTypelistFilter
          typelist={typelist}
          searchParams={awaitedSearchParams}
        />
      </div>
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
