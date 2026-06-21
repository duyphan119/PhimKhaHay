import Breadcrumb from "@/components/breadcrumb";
import { videosApi } from "@/features/videos/api";
import VideoCard from "@/features/videos/components/video-card";
import VideosFilter from "@/features/videos/components/videos-filter";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { Clapperboard } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<TVideosParams & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;

  const data = await videosApi.search(awaitedSearchParams);
  if (!data || !data.seoOnPage) return {
    title: "phimkhahay | Tìm kiếm",
    description: "Kết quả tìm kiếm",
  }
  return {
    title: `phimkhahay | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;


  const data = await videosApi.search(awaitedSearchParams);

  if (!data) return <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
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



        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {data.items?.map((videoItem) => (
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
