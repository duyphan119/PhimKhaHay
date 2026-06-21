import queryString from "query-string";

export const getYears = () =>
  Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => 1970 + i,
  ).reverse();

export const yearsApi = {
  getVideos: async (
    year: string | number,
    params?: Omit<TVideosParams, "type_list" | "nam">,
  ): Promise<{
    seoOnPage: TSeoOnPage;
    items: TMovieItem[];
    params: TParams;
    breadCrumb: TBreadcrumbItem[];
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/nam-phat-hanh/${year}?${queryString.stringify(params || {})}`,
      );

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("yearsApi,getVideos,error", error);
    }

    return null;
  },
};
