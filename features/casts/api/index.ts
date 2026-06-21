export const castsApi = {
  getCasts: async (tmdbType: string, tmdbId: string | number) => {
    try {
      const res = await fetch(
        `${process.env.DOMAIN_TMDB_API}/${tmdbType}/${tmdbId}/credits?language=vi-VN`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );
      const data: { cast: TCast[] } = await res.json();
      return data.cast;
    } catch (error) {
      console.log("castsApi,getCasts,error", error);
    }

    return [];
  },
  getDetails: async (castId: string | number): Promise<TCastProfile | null> => {
    try {
      const res = await fetch(
        `${process.env.DOMAIN_TMDB_API}/person/${castId}?language=vi-VN`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );
      return res.json();
    } catch (error) {
      console.log("castsApi,getDetails,error", error);
    }
    return null;
  },
  getImages: async (
    castId: string | number,
  ): Promise<{ id: number; profiles: TCastImage[] } | null> => {
    try {
      const res = await fetch(
        `${process.env.DOMAIN_TMDB_API}/person/${castId}/images?language=vi-VN`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );
      return res.json();
    } catch (error) {
      console.log("castsApi,getImages,error", error);
    }
    return null;
  },
};
