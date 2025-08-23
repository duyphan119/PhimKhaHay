import { useContext } from "react";
import { WatchedVideosContext } from "@/features/watched-videos/contexts/watched-videos-context";

export function useWatchedVideos() {
  return useContext(WatchedVideosContext);
}
