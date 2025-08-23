import { createContext } from "react";
import { WatchedVideo } from "@/features/watched-videos/data";

export type WatchedVideosContextProps = {
  watchedVideos: WatchedVideo[];
  onDelete: (id: string) => void;
  onSave: (input: WatchedVideo) => void;
};

export const WatchedVideosContext = createContext<WatchedVideosContextProps>({
  watchedVideos: [],
  onDelete: () => {},
  onSave: () => {},
});
