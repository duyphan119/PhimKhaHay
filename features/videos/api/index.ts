import queryString from "query-string";

export const videosApi = {
  getHome: async (): Promise<{
    seoOnPage: TSeoOnPage;
    items: TMovieItem[];
    params: TParams;
    breadCrumb: TBreadcrumbItem[];
  } | null> => {
    try {
      const response = await fetch(`${process.env.DOMAIN_API}/home`);

      const jsonData = await response.json();

      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("videosApi,getHome,error", error);
    }

    return null;
  },
  getDetails: async (
    videoSlug: string,
  ): Promise<{
    seoOnPage: TSeoOnPage;
    breadCrumb: TBreadcrumbItem[];
    item: TMovieDetails;
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/phim/${videoSlug}`,
      );

      const jsonData = await response.json();

      if (jsonData.data) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("videosApi,getDetails,error", error);
    }

    return null;
  },
  search: async (params: {
    keyword: string;
    page?: string;
    limit?: string;
  }): Promise<{
    seoOnPage: TSeoOnPage;
    items: TMovieItem[];
    params: TParams;
    breadCrumb: TBreadcrumbItem[];
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/tim-kiem?${queryString.stringify(params || {})}`,
      );

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("videosApi,search,error", error);
    }

    return null;
  },
  getVideoByTmdb: async (tmdbType: string, tmdbId: string) => {
    const res = await fetch(`https://phimapi.com/tmdb/${tmdbType}/${tmdbId}`);

    return res.json() as Promise<TVideoDetailsResponse>;
  },
  getVideosByCast: async (castId: string | number) => {
    const [tvRes, movieRes] = await Promise.allSettled([
      fetch(
        `${process.env.DOMAIN_TMDB_API}/person/${castId}/tv_credits?language=vi-VN`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      ),
      fetch(
        `${process.env.DOMAIN_TMDB_API}/person/${castId}/movie_credits?language=vi-VN`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      ),
    ]);

    return [tvRes, movieRes];
  },
};
