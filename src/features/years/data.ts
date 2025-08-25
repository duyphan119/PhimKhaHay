import queryString from "query-string";

const yearApi = {
  fetchYearsData: async (): Promise<TYearsResponse> => {
    const res = await fetch(`https://ophim1.com/v1/api/nam-phat-hanh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TYearsResponse = await res.json();
    return data;
  },
  fetchVideosData: async (
    slug: string | number,
    filter?: Omit<TVideosFilter, "year">
  ) => {
    const url = queryString.stringifyUrl({
      url: `https://ophim1.com/v1/api/nam-phat-hanh/${slug}`,
      query: filter,
    });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TVideosResponse = await res.json();
    return data;
  },
};

export default yearApi;
