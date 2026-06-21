import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/features/videos/components/video-card";
import VideosPagination from "@/features/videos/components/videos-pagination";
import hotVideos from "@/lib/hot-videos.json";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  const currentPage = Number(awaitedSearchParams.page);

  return {
    title: `phimkhahay | Phim hot${currentPage === 1 ? "" : " | Trang " + currentPage}`,
    description: "Danh sách phim phimkhahay đề xuất",
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const currentPage = Number(awaitedSearchParams.page) || 1;
  const limit = 48;

  return (
    <div className="_container space-y-4 py-4">
      <Breadcrumb
        items={[
          {
            name: "Phim đề xuất - Trang " + currentPage,
            position: 1,
            isCurrent: true,
          },
        ]}
      />
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {hotVideos
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((videoItem, index) => (
            <div key={index} className="col-span-1">
              <VideoCard videoItem={videoItem} />
            </div>
          ))}
      </div>
      <VideosPagination
        pagination={{
          currentPage,
          totalItems: hotVideos.length,
          totalItemsPerPage: limit,
        }}
      />
    </div>
  );
}
