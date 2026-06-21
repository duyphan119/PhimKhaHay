import queryString from "query-string";

export const typelist: TTypeListItem[] = [
  { name: "Phim Mới", slug: "phim-moi" },
  { name: "Phim Bộ", slug: "phim-bo" },
  { name: "Phim Lẻ", slug: "phim-le" },
  { name: "TV Shows", slug: "tv-shows" },
  { name: "Hoạt Hình", slug: "hoat-hinh" },
  { name: "Phim Vietsub", slug: "phim-vietsub" },
  { name: "Phim Thuyết Minh", slug: "phim-thuyet-minh" },
  { name: "Phim Lồng Tiếng", slug: "phim-long-tieng" },
  { name: "Phim Bộ Đang Chiếu", slug: "phim-bo-dang-chieu" },
  { name: "Phim Bộ Hoàn Thành", slug: "phim-bo-hoan-thanh" },
  { name: "Phim Sắp Chiếu", slug: "phim-sap-chieu" },
  { name: "Subteam", slug: "subteam" },
  { name: "Phim Chiếu Rạp", slug: "phim-chieu-rap" },
];

export const typelistApi = {
  getVideos: async (
    slug: TTypeListItem["slug"],
    params?: Omit<TVideosParams, "type_list">,
  ): Promise<{
    seoOnPage: TSeoOnPage;
    items: TMovieItem[];
    params: TParams;
    breadCrumb: TBreadcrumbItem[];
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/danh-sach/${slug}?${queryString.stringify(params || {})}`,
        { next: { revalidate: 60 } },
      );

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("typelistApi,getVideos,error", error);
    }

    return null;
  },
};
