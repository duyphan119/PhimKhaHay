import Breadcrumb from "@/components/breadcrumb";
import { typelistApi } from "@/features/typelist/api";

import VideoCard from "@/features/videos/components/video-card";
import VideosFilter from "@/features/videos/components/videos-filter";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ type: TTypeListItem['slug'] }>;
  searchParams: Promise<TVideosParams>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const data = await typelistApi.getVideos(
    awaitedParams.type,
    { limit: "48", ...awaitedSearchParams, }
  );

  if (!data) return {
    title: "404 | Không tìm thấy trang"
  }
  return {
    title: `phimkhahay | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const data = await typelistApi.getVideos(
    awaitedParams.type,
    { limit: "48", ...awaitedSearchParams, }
  );

  if (!data) return notFound();

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

      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {data.items.map((videoItem) => (
          <div key={videoItem._id} className="col-span-1">
            <VideoCard
              videoItem={videoItem}
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
