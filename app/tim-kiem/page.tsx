import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/components/video-card";
import VideosFilter from "@/components/videos-filter";
import VideosPagination from "@/components/videos-pagination";
import { searchVideos } from "@/lib/video";
import { Clapperboard, Film01FreeIcons, HugeiconsFreeIcons, SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<TVideosParams & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;

  const { keyword, ...otherParams } = awaitedSearchParams;

  const { data } = await searchVideos(keyword, otherParams);
  if (!data || !data.seoOnPage) return {
    title: "KDPhim | Tìm kiếm",
    description: "Kết quả tìm kiếm",
  }
  return {
    title: `KDPhim | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const { keyword, ...otherParams } = awaitedSearchParams;

  const { data } = await searchVideos(keyword, otherParams);

  if (!data || !data.items) return <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
      <HugeiconsIcon icon={Clapperboard} className="h-8 w-8 text-muted-foreground" />
    </div>

    <h3 className="mt-5 text-xl font-bold">
      Không tìm thấy phim
    </h3>

    <p className="mt-2 max-w-md text-sm text-muted-foreground">
      Rất tiếc, chúng tôi không tìm thấy bộ phim nào phù hợp.
      Hãy thử tìm kiếm với từ khóa khác.
    </p>
  </div>
  else
    return (
      <div className="_container space-y-4 py-4">
        <Breadcrumb items={data.breadCrumb} />

        <div className="">
          <VideosFilter
            defaultParams={awaitedSearchParams}
            isSearchFilter={true}
          />
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items?.map((videoItem) => (
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
