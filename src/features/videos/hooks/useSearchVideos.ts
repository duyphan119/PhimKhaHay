import { searchVideos, SearchVideosParams } from "@/features/videos/data";
import { useQuery } from "@tanstack/react-query";

export default function useSearchVideos(params: SearchVideosParams) {
  return useQuery({
    queryKey: ["searchVideos", params],
    queryFn: () => searchVideos(params),
  });
}
