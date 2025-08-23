import Breadcrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import VideosPagination from "@/features/videos/components/videos-pagination";
import { searchVideos, SearchVideosParams } from "@/features/videos/data";
import { shortenVideoLanguage } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type SearchVideosProps = {
  searchParams: Promise<SearchVideosParams>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchVideosProps): Promise<Metadata> => {
  const { keyword } = await searchParams;
  try {
    const { seoOnPage } = await searchVideos({ keyword });

    return {
      title: `PhimKhaHay | ${seoOnPage.titleHead}`,
    };
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Tìm kiếm" };
};

export default async function Search({ searchParams }: SearchVideosProps) {
  const awaitedSearchParams = await searchParams;

  const { titlePage, items, pagination } = await searchVideos({
    ...awaitedSearchParams,
    limit: 30,
  });
  return (
    <div className="_container py-4">
      <Breadcrumb items={[{ text: titlePage }]} className="mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((video) => (
          <div key={video.id} className="col-span-1">
            <Link
              href={`/phim/${video.slug}`}
              className="relative block w-full aspect-[23/35] select-none"
            >
              <Image
                src={video.poster}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-md shadow"
              />

              <Badge variant="episode" className="absolute top-0 right-0 ">
                {video.episodeCurrent}
              </Badge>
              <Badge variant="language" className="absolute bottom-0 left-0 ">
                {shortenVideoLanguage(video.language)}
              </Badge>
            </Link>
            <div className="mt-2">
              <Link
                href={`/phim/${video.slug}`}
                title={video.name}
                className="font-medium line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2"
              >
                {video.name}
              </Link>
              <p
                title={video.originName}
                className="text-muted-foreground text-sm line-clamp-2"
              >
                {video.originName}
              </p>
            </div>
          </div>
        ))}
      </div>
      <VideosPagination
        pagination={pagination}
        searchParams={awaitedSearchParams}
      />
    </div>
  );
}
