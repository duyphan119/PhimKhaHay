"use client";

import { getVideosByTypeList } from "@/lib/video";
import { useEffect, useState } from "react";
import VideoCard from "./video-card";

type RelatedVideosProps = {
  countries: TCountry[];
  categories: TCategory[];
  typelist: TTypeList;
  year: number;
  currentSlug: string;
}

export default function RelatedVideos({ categories, countries, currentSlug, typelist, year }: RelatedVideosProps) {
  const [data, setData] = useState<TApiResponse | null>(null);

  useEffect(() => {
    getVideosByTypeList(typelist, {
      category: categories.map(({ slug }) => slug).join(","),
      country: countries.map(({ slug }) => slug).join(","),
      year: year + '',
      limit: "25"
    }).then((data) => {
      setData(data)
    }).catch(error => console.log(error));
  }, [categories, countries, typelist, year])

  if (!data || !data.data) return null;
  return (
    <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Phim tương tự</h2>

      <div className="mt-4 grid grid-cols-4 gap-2 lg:gap-4">
        {data.data.items.filter(({ slug }) => currentSlug !== slug).slice(0, 24).map((videoItem) => (
          <div key={videoItem._id} className="col-span-2 lg:col-span-1">
            <VideoCard videoItem={videoItem} imageDomain={data.data.APP_DOMAIN_CDN_IMAGE} />
          </div>
        ))}
      </div>
    </div>
  )
}