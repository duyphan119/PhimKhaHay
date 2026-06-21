"use client";

import { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { VideoCardSkeleton } from "./video-card-skeleton";
import { Books, Book } from "@hugeicons/core-free-icons";
import SectionHeader from "@/components/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { videosApi } from "../api";
import { countries } from "@/features/countries/api";

type Props = {
  cast: TCastProfile;
};

export default function CastVideos({ cast }: Props) {
  const [tvList, setTvList] = useState<TMovieItem[]>([]);
  const [movieList, setMovieList] = useState<TMovieItem[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  const country = countries.find(({ tmdbName }) => cast.place_of_birth?.includes(tmdbName!))

  useEffect(() => {
    let isMounted = true;

    const fetchCastVideos = async () => {
      setIsLoading(true);

      try {
        const data = await videosApi.getVideosByCast(cast.id);
        if (!data) return;
        const [tvRes, movieRes] = data;

        // TV
        if (tvRes.status === "fulfilled") {
          const data: { cast: TTvCredit[] } = await tvRes.value.json();

          data.cast.forEach(async (item) => {
            const keyword = item.name.split(" - ")[0];
            const res = await videosApi.search({ keyword });
            // if (item.first_air_date?.includes("2018")) {

            //   console.log(keyword, item.first_air_date)
            // }
            // console.log(keyword, res?.items, item)
            if (res && res.items.length > 0) {

              // filter lấy ra các phim cùng quốc gia, cùng năm, cùng loại
              // find phim có id = tmdb_id
              const filteredVideos = res.items.filter((video) => country ? video.country.find(({ slug }) => slug === country.slug && video.type === 'series' && item.first_air_date?.includes(video.year + '')) : true)
              // console.log(keyword, filteredVideos)
              let result = filteredVideos.find((value) => item.id === value.tmdb.id);
              // nếu không có video có tmdb_id thì tìm video có tên giống với keyword
              if (!result) {
                result = filteredVideos.find((value) => value.name.toLowerCase() === keyword.toLowerCase() || value.origin_name.toLowerCase() === keyword.toLowerCase())
              }


              if (result) {
                setTvList((prev) => {
                  const next = [...prev.filter((item) => item._id !== result._id), result];

                  return next.sort(
                    (a, b) =>
                      new Date(b.modified.time).getTime() -
                      new Date(a.modified.time).getTime(),
                  );
                });
              }
            }

          });
        }

        // Movie
        if (movieRes.status === "fulfilled") {
          const data: { cast: TMovieCredit[] } = await movieRes.value.json();

          data.cast.forEach(async (item) => {
            const keyword = item.title.split(" - ")[0];;
            // console.log(keyword)
            const res = await videosApi.search({ keyword });

            if (res && res.items.length > 0) {
              // filter lấy ra các phim cùng quốc gia
              // find phim có id = tmdb_id
              const filteredVideos = res.items.filter((video) => country ? video.country.find(({ slug }) => slug === country.slug && video.type === 'single' && item.release_date?.includes(video.year + '')) : true)
              let result = filteredVideos.find((value) => item.id === value.tmdb.id);
              // nếu không có video có tmdb_id thì tìm video có tên giống với keyword
              if (!result) {
                result = filteredVideos.find((value) => value.name.toLowerCase() === keyword.toLowerCase() || value.origin_name.toLowerCase() === keyword.toLowerCase())
              }


              if (result) {
                setMovieList((prev) => {
                  const next = [...prev.filter((item) => item._id !== result._id), result];

                  return next.sort(
                    (a, b) =>
                      new Date(b.modified.time).getTime() -
                      new Date(a.modified.time).getTime(),
                  );
                });
              }
            }
          });
        }
      } finally {
        console.log("final")
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCastVideos();

    return () => {
      isMounted = false;
    };
  }, [cast]);



  return (
    <div className="col-span-4 md:col-span-3 space-y-4">
      {isLoading && tvList.length === 0 && movieList.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <div className="space-y-4">
              <SectionHeader
                title="Phim bộ"
                icon={Books}
                gradientClassName="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
                iconColor="text-red-500"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                {tvList.map((videoItem) => (
                  <div key={videoItem._id} className="col-span-1">
                    <VideoCard videoItem={videoItem} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {movieList.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Phim lẻ"
                icon={Book}
                gradientClassName="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
                iconColor="text-red-500"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

                {movieList.map((videoItem) => (
                  <div key={videoItem._id} className="col-span-1">
                    <VideoCard videoItem={videoItem} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
