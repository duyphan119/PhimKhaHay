type TSeoOnPage = {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  og_image: string[];
  og_url?: string;
};

type TTmdbInfo = {
  type: string;
  id: string;
  season: string | null;
  vote_average: number;
  vote_count: number;
};

type TImdbInfo = {
  id: string;
  vote_average: number;
  vote_count: number;
};

type TModified = {
  time: string; // ISO string
};

type TCategory = {
  id: string;
  name: string;
  slug: string;
};

type TCountry = TCategory;

type TVideoItem = {
  tmdb: TTmdbInfo;
  imdb: TImdbInfo;
  modified: TModified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: TCategoryOrCountry[];
  country: TCategoryOrCountry[];
};

type TPagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
};

type TPaginationFilter = Partial<{
  page: string;
  limit: string;
}>;

type TVideosFilter = TPaginationFilter &
  Partial<{
    year: string;
    country: string;
    category: string;
    sort_field: string;
    sort_type: string;
  }>;

type TParams = {
  type_slug?: string;
  filterCategory?: string[];
  filterCountry?: string[];
  filterYear?: string;
  sortField?: string;
  pagination: TPagination;
  itemsUpdateInDay?: number;
  totalSportsVideos?: number;
  itemsSportsVideosUpdateInDay?: number;
};

type TBreadcrumb = {
  name: string;
  slug?: string;
  position?: number;
  isCurrent: boolean;
}[];

type TVideosResponse = {
  status: string;
  message: string;
  data: {
    seoOnPage: TSeoOnPage;
    items: TVideoItem[];
    itemsSportsVideos?: TVideoItem[];
    params: TParams;
    type_list?: string;
    breadCrumb: TBreadcrumb;
    APP_DOMAIN_FRONTEND?: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

type TCategoriesResponse = {
  status: string;
  message: string;
  data: {
    items: TCategory[];
  };
};

type TYearsResponse = {
  status: string;
  message: string;
  data: {
    items: { year: number }[];
  };
};

type TCountriesResponse = {
  status: string;
  message: string;
  data: {
    items: TCountry[];
  };
};

type TServerDataItem = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

type TEpisode = {
  server_name: string;
  server_data: TServerDataItem[];
};

type TVideoDetails = TVideoItem & {
  content: string;
  director: string[];
  actor: string[];
  episodes: TEpisode[];
  episode_total: string;
  is_copyright: boolean;
  trailer_url: string;
  chieurap: boolean;
  notify: string;
  showTimes: string;
  status: string;
  created: TModified;
};

type TVideoDetailsResponse = {
  status: string;
  message: string;
  data: {
    seoOnPage: TSeoOnPage;
    breadCrumb: TBreadcrumb;
    params: {
      slug: string;
    };
    item: TVideoDetails;
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

type TActorsResponse = {
  status: string;
  message: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    ophim_id: string;
    slug: string;
    imdb_id: string;
    profile_sizes: {
      h632: string;
      original: string;
      w185: string;
      w45: string;
    };
    peoples: {
      tmdb_people_id: number;
      adult: false;
      gender: 2;
      gender_name: string;
      name: string;
      original_name: string;
      character: string;
      known_for_department: string;
      profile_path: string;
      also_known_as: string[];
    }[];
  };
};

type TImagesResponse = {
  status: string;
  message: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    tmdb_season: number;
    ophim_id: string;
    slug: string;
    image_sizes: {
      backdrop: {
        w1280: string;
        original: string;
        w300: string;
        w780: string;
      };
      poster: {
        w154: string;
        original: string;
        w185: string;
        w342: string;
        w500: string;
        w92: string;
        w780: string;
      };
    };
    images: {
      width: number;
      height: number;
      aspect_ratio: number;
      type: "backdrop" | "poster";
      file_path: string;
      iso_639_1: string;
    }[];
  };
};
