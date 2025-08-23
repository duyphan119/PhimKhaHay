export type Category = {
  id: string;
  name: string;
  slug: string;
  title: string;
};

export const getCategories = async () => {
  try {
    const response = await fetch("https://phimapi.com/the-loai");
    const data = await response.json();
    return data as Category[];
  } catch (error) {
    console.log("getCategories error", error);
    return [];
  }
};

export const categories: Category[] = [
  {
    id: "252e74b4c832ddb4233d7499f5ed122e",
    name: "Âm Nhạc",
    slug: "am-nhac",
    title: "Giai điệu cuộc sống",
  },
  {
    id: "2fb53017b3be83cd754a08adab3e916c",
    name: "Bí Ẩn",
    slug: "bi-an",
    title: "Điều chưa giải đáp",
  },
  {
    id: "1bae5183d681b7649f9bf349177f7123",
    name: "Chiến Tranh",
    slug: "chien-tranh",
    title: "Khói lửa chiến trường",
  },
  {
    id: "37a7b38b6184a5ebd3c43015aa20709d",
    name: "Chính Kịch",
    slug: "chinh-kich",
    title: "Câu chuyện cảm xúc",
  },
  {
    id: "3a17c7283b71fa84e5a8d76fb790ed3e",
    name: "Cổ Trang",
    slug: "co-trang",
    title: "Trang phục cổ xưa",
  },
  {
    id: "a2492d6cbc4d58f115406ca14e5ec7b6",
    name: "Gia Đình",
    slug: "gia-dinh",
    title: "Tình thân yêu thương",
  },
  {
    id: "9822be111d2ccc29c7172c78b8af8ff5",
    name: "Hành Động",
    slug: "hanh-dong",
    title: "Gay cấn, kịch tính",
  },
  {
    id: "ba6fd52e5a3aca80eaaf1a3b50a182db",
    name: "Hài Hước",
    slug: "hai-huoc",
    title: "Tiếng cười sảng khoái",
  },
  {
    id: "01c8abbb7796a1cf1989616ca5c175e6",
    name: "Học Đường",
    slug: "hoc-duong",
    title: "Tuổi học trò",
  },
  {
    id: "7a035ac0b37f5854f0f6979260899c90",
    name: "Hình Sự",
    slug: "hinh-su",
    title: "Tội ác và công lý",
  },
  {
    id: "4db8d7d4b9873981e3eeb76d02997d58",
    name: "Kinh Dị",
    slug: "kinh-di",
    title: "Rùng rợn, ám ảnh",
  },
  {
    id: "268385d0de78827ff7bb25c35036ee2a",
    name: "Kinh Điển",
    slug: "kinh-dien",
    title: "Tác phẩm bất hủ",
  },
  {
    id: "0bcf4077916678de9b48c89221fcf8ae",
    name: "Khoa Học",
    slug: "khoa-hoc",
    title: "Khám phá tri thức",
  },
  {
    id: "f8ec3e9b77c509fdf64f0c387119b916",
    name: "Lịch Sử",
    slug: "lich-su",
    title: "Dấu mốc thời gian",
  },
  {
    id: "d111447ee87ec1a46a31182ce4623662",
    name: "Miền Tây",
    slug: "mien-tay",
    title: "Cao bồi hoang dã",
  },
  {
    id: "4b4457a1af8554c282dc8ac41fd7b4a1",
    name: "Phim 18+",
    slug: "phim-18",
    title: "Dành cho người lớn",
  },
  {
    id: "66c78b23908113d478d8d85390a244b4",
    name: "Phiêu Lưu",
    slug: "phieu-luu",
    title: "Chuyến đi mạo hiểm",
  },
  {
    id: "1645fa23fa33651cef84428b0dcc2130",
    name: "Tài Liệu",
    slug: "tai-lieu",
    title: "Thông tin hữu ích",
  },
  {
    id: "a7b065b92ad356387ef2e075dee66529",
    name: "Tâm Lý",
    slug: "tam-ly",
    title: "Khắc họa nội tâm",
  },
  {
    id: "2276b29204c46f75064735477890afd6",
    name: "Thần Thoại",
    slug: "than-thoai",
    title: "Truyền thuyết huyền ảo",
  },
  {
    id: "591bbb2abfe03f5aa13c08f16dfb69a2",
    name: "Thể Thao",
    slug: "the-thao",
    title: "Sức mạnh và tốc độ",
  },
  {
    id: "bb2b4b030608ca5984c8dd0770f5b40b",
    name: "Tình Cảm",
    slug: "tinh-cam",
    title: "Chuyện tình lãng mạn",
  },
  {
    id: "0c853f6238e0997ee318b646bb1978bc",
    name: "Trẻ Em",
    slug: "tre-em",
    title: "Dành cho thiếu nhi",
  },
  {
    id: "68564911f00849030f9c9c144ea1b931",
    name: "Viễn Tưởng",
    slug: "vien-tuong",
    title: "Tương lai giả tưởng",
  },
  {
    id: "578f80eb493b08d175c7a0c29687cbdf",
    name: "Võ Thuật",
    slug: "vo-thuat",
    title: "Quyền cước tinh hoa",
  },
];
