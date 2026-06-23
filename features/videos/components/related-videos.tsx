"use client";

import { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { typelistApi } from "@/features/typelist/api";
import SectionHeader from "@/components/section-header";
import { EggFriedIcon } from "@hugeicons/core-free-icons";

type RelatedVideosProps = {
  countries: TCountry[];
  categories: TCategory[];
  typelist: TTypeListItem['slug'];
  year: number;
  currentSlug: string;
}

export default function RelatedVideos({ categories, countries, currentSlug, typelist, year }: RelatedVideosProps) {
  const [data, setData] = useState<{ items: TMovieItem[] } | null>(null);

  useEffect(() => {
    typelistApi.getVideos(typelist, {
      category: categories.map(({ slug }) => slug).join(","),
      country: countries.map(({ slug }) => slug).join(","),
      year: year + '',
      limit: "25"
    }).then((data) => {
      setData(data)
    }).catch(error => console.log(error));
  }, [categories, countries, typelist, year])

  if (!data) return null;
  return (
    <section className="">
      <SectionHeader
        title="Phim tương tự"
        icon={EggFriedIcon}
        iconColor="text-yellow-500"
        gradientClassName="from-yellow-500 via-orange-400 to-yellow-300"
      />

      <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.items.filter(({ slug }) => currentSlug !== slug).slice(0, 24).map((videoItem) => (
          <div key={videoItem._id} className="col-span-1">
            <VideoCard videoItem={videoItem} />
          </div>
        ))}
      </div>
    </section>
  )
}