import Breadcrumb from "@/components/breadcrumb";

import VideoCard from "@/components/video-card";
import VideosFilter from "@/components/videos-filter";
import VideosPagination from "@/components/videos-pagination";
import { getVideosByTypeList } from "@/lib/video";
import { Metadata } from "next";

type Props = {
  params: Promise<{ type: TTypeList }>;
  searchParams: Promise<TVideosParams>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { data } = await getVideosByTypeList(
    awaitedParams.type,
    awaitedSearchParams,
  );
  return {
    title: `KDPhim | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { data } = await getVideosByTypeList(
    awaitedParams.type,
    awaitedSearchParams,
  );

  return (
    <div className="_container space-y-4 py-4">
      <Breadcrumb items={data.breadCrumb} />
      <div className="">
        <VideosFilter
          defaultParams={{
            ...awaitedSearchParams,
            type_list: awaitedParams.type,
          }}
        />
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.items.map((videoItem) => (
          <div key={videoItem._id} className="col-span-1">
            <VideoCard
              videoItem={videoItem}
              imageDomain={data.APP_DOMAIN_CDN_IMAGE}
            />
          </div>
        ))}
      </div>

      <div className="">
        <VideosPagination
          pagination={data.params.pagination}
          searchParams={awaitedSearchParams}
        />
      </div>
    </div>
  );
}
