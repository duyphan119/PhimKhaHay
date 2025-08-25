const imageApi = {
  fetchImagesData: async (videoSlug: string): Promise<TImagesResponse> => {
    const res = await fetch(
      `https://ophim1.com/v1/api/phim/${videoSlug}/images`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TImagesResponse = await res.json();
    return data;
  },
};

export default imageApi;
