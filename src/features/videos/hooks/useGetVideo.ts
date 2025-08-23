import { useQuery } from "@tanstack/react-query";
import { getVideo } from "../data";

export const useGetVideo = (slug: string) => {
  return useQuery({
    queryKey: ["video", slug],
    queryFn: () => getVideo(slug),
  });
};
