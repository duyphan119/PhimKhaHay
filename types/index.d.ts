type TApiResponse = {
  status: boolean;
  msg: string;
  data: TData;
};

type TData = {
  seoOnPage: TSeoOnPage;
  breadCrumb: TBreadcrumbItem[];
  titlePage: string;
  items: TMovieItem[];
  params: TParams;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
};

type TVideoDetailsResponse = {
  status: boolean;
  msg: string;
  movie: {
    tmdb: {
      type: string | null;
      id: string | number | null;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    imdb: {
      id: string | null;
    };
    created: {
      time: string;
    };
    modified: {
      time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: "series" | "single";
    status: "ongoing" | "completed";
    poster_url: string;
    thumb_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: TCategory[];
    country: TCountry[];
  };
  episodes: TEpisode[];
};

type TEpisode = {
  server_name: string;
  server_data: TServerData[];
  is_ai: boolean;
};

type TServerData = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type TTypeListItem = {
  name: string;
  slug:
    | "phim-moi"
    | "phim-bo"
    | "phim-le"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | "phim-bo-dang-chieu"
    | "phim-bo-hoan-thanh"
    | "phim-sap-chieu"
    | "subteam"
    | "phim-chieu-rap";
};

type TVideosParams = {
  type_list?: TTypeList;
  page?: string;
  sort_field?: string;
  sort_type?: "desc" | "asc";
  sort_lang?: "vietsub" | "thuyetminh" | "longtieng";
  category?: string;
  country?: string;
  year?: string;
  limit?: string;
};

type TSeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

type TBreadcrumbItem = {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
};

type TMovieItem = {
  tmdb: TTmdb;
  imdb: TImdb;
  created: TTimeObject;
  modified: TTimeObject;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: "series" | "single";
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: TCategory[];
  country: TCountry[];
};

type TMovieDetails = TMovieItem & {
  director: string[];
  alternative_names: string[];
  actor: string[];
  trailer_url: string;
  content: string;
  episode_total: string;
  status: string;
  episodes: TEpisode[];
};

type TTmdb = {
  type: string | null;
  id: string | number | null;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

type TImdb = {
  id: string | null;
};

type TTimeObject = {
  time: string;
};

type TCategory = {
  id: string;
  name: string;
  slug: string;
};

type TCountry = {
  id: string;
  name: string;
  slug: string;
  tmdbName?: string;
};

type TParams = {
  type_slug: string;
  slug: string;
  filterCategory: string[];
  filterCountry: string[];
  filterYear: string[];
  filterType: string[];
  sortField: string;
  sortType: "asc" | "desc";
  pagination: TPagination;
};

type TPagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges?: number;
};

type ThotedVideo = {
  name: string;
  slug: string;
  thumb_url: string;
};

type TCast = {
  adult: boolean;
  gender: number; // 1 = Nữ, 2 = Nam, 0 = Không xác định
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

type TCastProfile = {
  biography?: string;
  birthday?: string | null; // có thể null nếu không rõ
  gender: number; // theo TMDB docs
  id: number;
  name: string;
  place_of_birth?: string | null;
  profile_path: string | null;
};

type TCastImage = {
  aspect_ratio: number;
  file_path: string | null;
};

type TTvCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string | null;
  name: string;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  episode_count: number;
};

type TMovieCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  order: number;
};

type TWatchedVideo = {
  name: string;
  slug: string;
  poster_url: string;

  server_index: number;
  server_name: number;

  episode_name: string;
  episode_slug: string;
};
