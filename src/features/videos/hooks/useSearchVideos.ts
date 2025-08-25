import { useQuery } from "@tanstack/react-query";
import videoApi from "../data";

export default function useSearchVideos(
  keyword: string,
  params: TPaginationFilter
) {
  return useQuery({
    queryKey: ["searchVideos", keyword, params],
    queryFn: () => videoApi.searchVideos(keyword, params),
  });
}
