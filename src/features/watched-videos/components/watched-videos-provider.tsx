"use client";

import { useEffect, useState } from "react";
import { WatchedVideosContext } from "@/features/watched-videos/contexts/watched-videos-context";
import {
  deleteWatchedVideo,
  getWatchedVideos,
  saveWatchedVideo,
  WatchedVideo,
} from "@/features/watched-videos/data";

type WatchedVideosProviderProps = {
  children: React.ReactNode;
};

export default function WatchedVideosProvider({
  children,
}: WatchedVideosProviderProps) {
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideo[]>([]);

  useEffect(() => {
    setWatchedVideos(getWatchedVideos());
  }, []);

  const handleDelete = (id: string) => {
    deleteWatchedVideo(id);
    setWatchedVideos(watchedVideos.filter((item) => item.id !== id));
  };

  const handleSave = (input: WatchedVideo) => {
    const newWatchedVideos = saveWatchedVideo(input);
    setWatchedVideos(newWatchedVideos);
  };
  return (
    <WatchedVideosContext.Provider
      value={{ watchedVideos, onDelete: handleDelete, onSave: handleSave }}
    >
      {children}
    </WatchedVideosContext.Provider>
  );
}
