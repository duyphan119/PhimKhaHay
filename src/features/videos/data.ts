import queryString from "query-string";

const videoApi = {
  fetchHomeData: async (
    filter?: TPaginationFilter
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: "https://ophim1.com/v1/api/danh-sach",
      query: filter || { limit: 8 },
    });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TVideosResponse = await res.json();
    return data;
  },
  fetchVideoDetailsData: async (
    slug: string
  ): Promise<TVideoDetailsResponse> => {
    const res = await fetch(`https://ophim1.com/v1/api/phim/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TVideoDetailsResponse = await res.json();
    return data;
  },
  fetchVideosData: async (
    slug: string,
    filter?: TVideosFilter
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://ophim1.com/v1/api/danh-sach/${slug}`,
      query: filter,
    });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TVideosResponse = await res.json();
    return data;
  },
  searchVideos: async (
    keyword: string,
    filter?: TPaginationFilter
  ): Promise<TVideosResponse> => {
    const url = queryString.stringifyUrl({
      url: `https://ophim1.com/v1/api/tim-kiem?keyword=${keyword}`,
      query: filter,
    });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TVideosResponse = await res.json();
    return data;
  },
};

export default videoApi;
