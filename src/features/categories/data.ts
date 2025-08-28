import queryString from "query-string";

const categoryApi = {
  fetchCategoriesData: async (): Promise<TCategoriesResponse> => {
    const res = await fetch(`https://ophim1.com/v1/api/the-loai`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data: TCategoriesResponse = await res.json();
    return data;
  },
  fetchVideosData: async (
    slug: string,
    filter?: Omit<TVideosFilter, "category">
  ) => {
    const url = queryString.stringifyUrl({
      url: `https://ophim1.com/v1/api/the-loai/${slug}`,
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

export const categorySlugTitleMap: Record<string, string> = {
  "am-nhac": "Giai điệu cuộc sống",
  "bi-an": "Điều chưa giải đáp",
  "chien-tranh": "Khói lửa chiến trường",
  "chinh-kich": "Câu chuyện cảm xúc",
  "co-trang": "Trang phục cổ xưa",
  "gia-dinh": "Tình thân yêu thương",
  "hanh-dong": "Gay cấn, kịch tính",
  "hai-huoc": "Tiếng cười sảng khoái",
  "hoc-duong": "Tuổi học trò",
  "hinh-su": "Tội ác và công lý",
  "kinh-di": "Rùng rợn, ám ảnh",
  "kinh-dien": "Tác phẩm bất hủ",
  "khoa-hoc": "Khám phá tri thức",
  "lich-su": "Dấu mốc thời gian",
  "mien-tay": "Cao bồi hoang dã",
  "phim-18": "Dành cho người lớn",
  "phieu-luu": "Chuyến đi mạo hiểm",
  "tai-lieu": "Thông tin hữu ích",
  "tam-ly": "Khắc họa nội tâm",
  "than-thoai": "Truyền thuyết huyền ảo",
  "the-thao": "Sức mạnh và tốc độ",
  "tinh-cam": "Chuyện tình lãng mạn",
  "tre-em": "Dành cho thiếu nhi",
  "vien-tuong": "Tương lai giả tưởng",
  "vo-thuat": "Quyền cước tinh hoa",
};

export default categoryApi;
