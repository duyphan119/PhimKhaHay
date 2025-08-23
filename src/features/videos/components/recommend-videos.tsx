"use client";

import { Country } from "@/features/countries/data";
import useGetVideosByTypeList from "@/features/videos/hooks/useGetVideosByTypeList";
import RecommendVideosSkeleton from "@/features/videos/skeletons/recommend-videos-skeleton";
import Image from "next/image";
import Link from "next/link";

type RecommendVideosProps = {
  slug: string;
  country?: Country;
};

const LIMIT = 9;

export default function RecommendVideos({
  slug,
  country,
}: RecommendVideosProps) {
  const { data: seriesData } = useGetVideosByTypeList("phim-bo", {
    country: country?.slug,
    limit: LIMIT,
  });
  const { data: movieData } = useGetVideosByTypeList("phim-le", {
    country: country?.slug,
    limit: LIMIT,
  });

  if (!seriesData || !movieData) return <RecommendVideosSkeleton />;

  return (
    <>
      <div className="text-lg font-medium">
        <Link
          href={`/danh-sach?typelist=phim-bo`}
          className="hover:text-lime-400"
        >
          CÓ THỂ BẠN THÍCH
        </Link>
      </div>
      <div className="space-y-4 mt-4">
        {seriesData.pages[0].items
          .filter((item) => item.slug !== slug)

          .map((video, index) => (
            <div key={index} className="group">
              <div className="grid grid-cols-12 gap-4">
                <Link
                  href={`/phim/${video.slug}`}
                  className="col-span-12 md:col-span-4"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt="Thumbnail"
                      fill
                      sizes="(max-width: 1200px) 50vw, 100vw"
                      className="object-cover rounded-md shadow"
                    />
                  </div>
                </Link>
                <div className="col-span-12 md:col-span-8">
                  <Link
                    href={`/phim/${video.slug}`}
                    className="group-hover:text-lime-400 text-sm line-clamp-2"
                  >
                    {video.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        {movieData.pages[0].items
          .filter((item) => item.slug !== slug)
          .map((video, index) => (
            <div key={index} className="group">
              <div className="grid grid-cols-12 gap-4">
                <Link
                  href={`/xem-phim/${video.slug}`}
                  className="col-span-12 md:col-span-4"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail}
                      alt="Thumbnail"
                      fill
                      sizes="(max-width: 1200px) 50vw, 100vw"
                      className="object-cover rounded-md shadow"
                    />
                  </div>
                </Link>
                <div className="col-span-12 md:col-span-8">
                  <Link
                    href={`/xem-phim/${video.slug}`}
                    className="group-hover:text-lime-400 text-sm line-clamp-2"
                  >
                    {video.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
