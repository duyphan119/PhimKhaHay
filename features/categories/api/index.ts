import queryString from "query-string";

export const categories: TCountry[] = [
  {
    id: "620a21b2e0fc277084dfd0c5",
    name: "Hành Động",
    slug: "hanh-dong",
  },
  {
    id: "620a220de0fc277084dfd16d",
    name: "Tình Cảm",
    slug: "tinh-cam",
  },
  {
    id: "620a221de0fc277084dfd1c1",
    name: "Hài Hước",
    slug: "hai-huoc",
  },
  {
    id: "620a222fe0fc277084dfd23d",
    name: "Cổ Trang",
    slug: "co-trang",
  },
  {
    id: "620a2238e0fc277084dfd291",
    name: "Tâm Lý",
    slug: "tam-ly",
  },
  {
    id: "620a2249e0fc277084dfd2e5",
    name: "Hình Sự",
    slug: "hinh-su",
  },
  {
    id: "620a2253e0fc277084dfd339",
    name: "Chiến Tranh",
    slug: "chien-tranh",
  },
  {
    id: "620a225fe0fc277084dfd38d",
    name: "Thể Thao",
    slug: "the-thao",
  },
  {
    id: "620a2279e0fc277084dfd3e1",
    name: "Võ Thuật",
    slug: "vo-thuat",
  },
  {
    id: "620a2282e0fc277084dfd435",
    name: "Viễn Tưởng",
    slug: "vien-tuong",
  },
  {
    id: "620a2293e0fc277084dfd489",
    name: "Phiêu Lưu",
    slug: "phieu-luu",
  },
  {
    id: "620a229be0fc277084dfd4dd",
    name: "Khoa Học",
    slug: "khoa-hoc",
  },
  {
    id: "620a22ace0fc277084dfd531",
    name: "Kinh Dị",
    slug: "kinh-di",
  },
  {
    id: "620a22bae0fc277084dfd585",
    name: "Âm Nhạc",
    slug: "am-nhac",
  },
  {
    id: "620a22c8e0fc277084dfd5d9",
    name: "Thần Thoại",
    slug: "than-thoai",
  },
  {
    id: "620e0e64d9648f114cde7728",
    name: "Tài Liệu",
    slug: "tai-lieu",
  },
  {
    id: "620e4c0b6ba8271c5eef05a8",
    name: "Gia Đình",
    slug: "gia-dinh",
  },
  {
    id: "620f3d2b91fa4af90ab697fe",
    name: "Chính kịch",
    slug: "chinh-kich",
  },
  {
    id: "620f84d291fa4af90ab6b3f4",
    name: "Bí ẩn",
    slug: "bi-an",
  },
  {
    id: "62121e821f1609c9d934585c",
    name: "Học Đường",
    slug: "hoc-duong",
  },
  {
    id: "6218eb66a2d0f024a9de48d4",
    name: "Kinh Điển",
    slug: "kinh-dien",
  },
  {
    id: "6242b89cc78eb57bbfe29f91",
    name: "Phim 18+",
    slug: "phim-18",
  },
  {
    id: "68f786a9f998955ed60add6c",
    name: "Short Drama",
    slug: "short-drama",
  },
];
export const categoriesApi = {
  getVideos: async (
    categorySlug: string,
    params?: Omit<TVideosParams, "type_list" | "country">,
  ): Promise<{
    seoOnPage: TSeoOnPage;
    items: TMovieItem[];
    params: TParams;
    breadCrumb: TBreadcrumbItem[];
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.DOMAIN_API}/the-loai/${categorySlug}?${queryString.stringify(params || {})}`,
      );

      const jsonData = await response.json();
      if (jsonData.data && jsonData.data.items) {
        return jsonData.data;
      }
    } catch (error) {
      console.log("categoriesApi,getVideos,error", error);
    }

    return null;
  },
};
