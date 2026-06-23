"use client";

import SectionHeader from "@/components/section-header";
import { History } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { watchedVideosApi } from "../api";
import VideoCard from "@/features/videos/components/video-card";



export default function HomeWatchedVideos() {
  const [videos, setVideos] = useState<TWatchedVideo[]>([])

  useEffect(() => {
    (() => {
      const { items: watchedVideos } = watchedVideosApi.getAll({ page: "1", limit: "24" });
      setVideos(watchedVideos)
    })()
  }, [])


  if (videos.length === 0) return null;
  return (
    <section className="space-y-2 lg:space-y-4">
      <SectionHeader title="Xem tiếp?" icon={History} href="/lich-su-xem" iconColor="text-pink-600" gradientClassName="text-pink-600 text-rose-700 text-red-600" />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        {videos.map((videoItem) => (
          <div key={videoItem.slug} className="col-span-1">
            <VideoCard
              videoItem={{
                ...videoItem,
                episode_current: `Tập ${videoItem.episodeName}`
              }}
              href={`/xem-phim/${videoItem.slug}/${videoItem.serverIndex}/${videoItem.episodeName}`}
              aspectType="thumbnail"
            />
          </div>
        ))}
      </div>
    </section>
  )
}