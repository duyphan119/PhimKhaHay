"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import VideoCard from "./video-card";
import { VideoCardSkeleton } from "./video-card-skeleton";
import { getVideoByTmdb, getVideosByCast } from "@/lib/video";
import SectionHeader from "./section-header";
import { Books, Book } from "@hugeicons/core-free-icons";
import { sectionTitleVariants } from "@/lib/constants";

type Props = {
  castId: string;
};

export default function CastVideos({ castId }: Props) {
  const [tvList, setTvList] = useState<TVideoDetailsResponse["movie"][]>([]);
  const [movieList, setMovieList] = useState<TVideoDetailsResponse["movie"][]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCastVideos = async () => {
      setIsLoading(true);

      try {
        const data = await getVideosByCast(castId);
        if (!data) return;
        const [tvRes, movieRes] = data;

        // TV
        if (tvRes.status === "fulfilled") {
          const data: { cast: TTvCredit[] } = await tvRes.value.json();

          data.cast.forEach(async (item) => {
            const res = await getVideoByTmdb("tv", item.id + "");

            if (res?.movie && isMounted) {
              setTvList((prev) => {
                const next = [...prev, res.movie];

                return next.sort(
                  (a, b) =>
                    new Date(b.created.time).getTime() -
                    new Date(a.created.time).getTime(),
                );
              });
            }
          });
        }

        // Movie
        if (movieRes.status === "fulfilled") {
          const data: { cast: TTvCredit[] } = await movieRes.value.json();

          data.cast.forEach(async (item) => {
            const res = await getVideoByTmdb("movie", item.id + "");

            if (res?.movie && isMounted) {
              setMovieList((prev) => {
                const next = [...prev, res.movie];

                return next.sort(
                  (a, b) =>
                    new Date(b.created.time).getTime() -
                    new Date(a.created.time).getTime(),
                );
              });
            }
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCastVideos();

    return () => {
      isMounted = false;
    };
  }, [castId]);

  return (
    <div className="col-span-4 md:col-span-3 space-y-4">
      {isLoading && tvList.length === 0 && movieList.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="col-span-2 sm:col-span-3 md:col-span-4">
            <Skeleton className="p-4 bg-muted rounded-sm" />
          </div>

          {new Array(20).fill("").map((_, index) => (
            <div key={index} className="col-span-1">
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <>
          {tvList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="col-span-2 sm:col-span-3 md:col-span-4">
                <SectionHeader
                  title="Phim bộ"
                  icon={Books}
                  gradientClassName="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
                  iconColor="text-red-500"
                />
              </div>

              {tvList.map((videoItem) => (
                <div key={videoItem._id} className="col-span-1">
                  <VideoCard videoItem={videoItem} />
                </div>
              ))}
            </div>
          )}

          {movieList.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="col-span-2 sm:col-span-3 md:col-span-4">
                <SectionHeader
                  title="Phim lẻ"
                  icon={Book}
                  gradientClassName="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
                  iconColor="text-red-500"
                />
              </div>

              {movieList.map((videoItem) => (
                <div key={videoItem._id} className="col-span-1">
                  <VideoCard videoItem={videoItem} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
