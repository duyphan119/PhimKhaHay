import queryString from "query-string";

const countryApi = {
  fetchCountriesData: async (): Promise<TCountriesResponse> => {
    const res = await fetch(`https://ophim1.com/v1/api/quoc-gia`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TCountriesResponse = await res.json();
    return data;
  },
  fetchVideosData: async (
    slug: string,
    filter?: Omit<TVideosFilter, "country">
  ) => {
    const url = queryString.stringifyUrl({
      url: `https://ophim1.com/v1/api/quoc-gia/${slug}`,
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

export default countryApi;
