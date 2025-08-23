import { Category } from "@/features/categories/data";
import { Country } from "@/features/countries/data";
import qs from "query-string";
import { TypeList } from "../typelist/data";

export type TMDB = {
  type: string;
  id: string;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

export type IMDB = {
  id: string;
  vote_average: number;
  vote_count: number;
};

export type LatestVideo = {
  id: string;
  name: string;
  originName: string;
  slug: string;
  thumbnail: string;
  poster: string;
  episodeCurrent: string;
  categories: Category[];
  countries: Country[];
  language: string;
  year: number;
  tmdb: TMDB;
  imdb: IMDB;
};

export type Pagination = {
  totalItems: number;
  currentPage: number;
  pageRanges: number;
  totalItemsPerPage: number;
};

export type LatestVideoParams = {
  page?: string | number;
};

type LatestVideoRaw = {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
  thumb_url: string;
  poster_url: string;
  episode_current: string;
  country: Country[];
  category: Category[];
  lang: string;
  tmdb: TMDB;
  imdb: IMDB;
  year: number;
};

export type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

export const getLatestVideos = async (params: LatestVideoParams = {}) => {
  try {
    const response = await fetch(
      `https://ophim1.com/v1/api/home?${qs.stringify(params)}`
    );

    const {
      data: { items, pagination, APP_DOMAIN_CDN_IMAGE },
    } = await response.json();

    const latestVideos: LatestVideo[] = items.map((item: LatestVideoRaw) => ({
      id: item._id,
      year: item.year,
      name: item.name,
      originName: item.origin_name,
      slug: item.slug,
      thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url.replace(
        "-thumb",
        "-poster"
      )}`,
      poster: item.poster_url,
      episodeCurrent: item.episode_current,
      countries: item.country,
      categories: item.category,
      language: item.lang,
      tmdb: item.tmdb,
      imdb: item.imdb,
    }));

    return {
      seoOnPage: DEFAULT_VIDEOS_RESPONSE.seoOnPage,
      titlePage: "Phim mới cập nhật",
      items: latestVideos,
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getLatestVideos error", error);
    return {
      titlePage: "Phim mới cập nhật",
      seoOnPage: DEFAULT_VIDEOS_RESPONSE.seoOnPage,
      items: [],
      pagination: {
        totalItems: 0,
        currentPage: 1,
        pageRanges: 1,
        totalItemsPerPage: 24,
      },
    };
  }
};

export type Video = LatestVideo & {
  director: string;
  actors: string[];
  content: string;
  totalEpisodes: number;
  trailer: string;
};

export type VideoServer = {
  name: string;
  episodes: Episode[];
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_m3u8: string;
  link_embed: string;
};

const DEFAULT_VIDEOS_RESPONSE: {
  titlePage: string;
  items: LatestVideo[];
  pagination: Pagination;
  seoOnPage: SeoOnPage;
  breadcrumb: Breadcrumb;
  APP_DOMAIN_CDN_IMAGE: string;
} = {
  titlePage: "",
  items: [],
  pagination: {
    totalItems: 0,
    currentPage: 1,
    pageRanges: 1,
    totalItemsPerPage: 24,
  },
  seoOnPage: {
    og_type: "",
    titleHead: "",
    descriptionHead: "",
    og_image: [],
    og_url: "",
  },
  breadcrumb: [],
  APP_DOMAIN_CDN_IMAGE: "",
};

export const getVideo = async (slug: string) => {
  try {
    const response = await fetch(`https://ophim1.com/v1/api/phim/${slug}`, {
      cache: "no-cache",
    });

    const {
      data: { item: movie, APP_DOMAIN_CDN_IMAGE },
    } = await response.json();
    const video: Video = {
      id: movie._id,
      name: movie.name,
      originName: movie.origin_name,
      slug: movie.slug,
      thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.poster_url}`,
      poster: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.thumb_url}`,
      actors: movie.actor,
      content: movie.content,
      director: movie.director,
      categories: movie.category,
      countries: movie.country,
      episodeCurrent: movie.episode_current,
      language: movie.lang,
      totalEpisodes: +movie.episode_total,
      year: movie.year,
      trailer: movie.trailer_url,
      tmdb: movie.tmdb,
      imdb: movie.imdb,
    };

    const servers: VideoServer[] = movie.episodes.map(
      (item: { server_name: string; server_data: Episode[] }) => ({
        name: item.server_name,
        episodes: item.server_data.filter(
          ({ link_embed }) => link_embed !== ""
        ),
      })
    );

    return {
      video,
      servers,
    };
  } catch (error) {
    console.log("getVideo error", error);
    return {
      video: null,
      servers: [],
    };
  }
};

export type VideosTypelistParams = VideosParams;
// export type VideosCountryParams = VideosParams;

export type VideosParams = Partial<{
  page: number | string;
  sort_field: string;
  sort_type: "asc" | "desc";
  category: string;
  country: string;
  year: number | string;
  limit: number | string;
}>;

export type Breadcrumb = {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
}[];

export const getVideosByTypeList = async (
  typeList: TypeList,
  params: VideosParams = {}
) => {
  try {
    const response = await fetch(
      `https://ophim1.com/v1/api/danh-sach/${typeList}?${qs.stringify(params)}`
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
        breadCrumb,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,
      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        year: item.year,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.poster_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
        tmdb: item.tmdb,
        imdb: item.imdb,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
      breadcrumb: breadCrumb as Breadcrumb,
      APP_DOMAIN_CDN_IMAGE,
    };
  } catch (error) {
    console.log("getVideosByTypeList error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export const getVideosByCountry = async (
  countrySlug: string,
  params: Omit<VideosParams, "country"> = {}
) => {
  try {
    const response = await fetch(
      `https://ophim1.com/v1/api/quoc-gia/${countrySlug}?${qs.stringify(
        params
      )}`,
      {
        next: {
          revalidate: 30,
          tags: ["videosByCountry", countrySlug],
        },
      }
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,
      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        year: item.year,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.poster_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
        tmdb: item.tmdb,
        imdb: item.imdb,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByCountry error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export const getVideosByCategory = async (
  categorySlug: string,
  params: Omit<VideosParams, "category"> = {}
) => {
  try {
    const response = await fetch(
      `https://ophim1.com/v1/api/the-loai/${categorySlug}?${qs.stringify(
        params
      )}`
    );
    const {
      data: {
        items,
        APP_DOMAIN_CDN_IMAGE,
        params: { pagination },
        titlePage,
        seoOnPage,
      },
    } = await response.json();
    return {
      titlePage,
      seoOnPage: seoOnPage as SeoOnPage,

      items: items.map((item: LatestVideoRaw) => ({
        id: item._id,
        year: item.year,
        name: item.name,
        originName: item.origin_name,
        slug: item.slug,
        thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.poster_url}`,
        poster: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`,
        episodeCurrent: item.episode_current,
        countries: item.country,
        categories: item.category,
        language: item.lang,
        tmdb: item.tmdb,
        imdb: item.imdb,
      })) as LatestVideo[],
      pagination: pagination as Pagination,
    };
  } catch (error) {
    console.log("getVideosByCountry error", error);
    return {
      ...DEFAULT_VIDEOS_RESPONSE,
    };
  }
};

export type SearchVideosParams = VideosParams & { keyword: string };

export const searchVideos = async (params: SearchVideosParams) => {
  if (params.keyword) {
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/tim-kiem?${qs.stringify(params)}`,
        {
          cache: "no-cache",
        }
      );
      const {
        data: {
          items,
          APP_DOMAIN_CDN_IMAGE,
          params: { pagination },
          titlePage,
          seoOnPage,
        },
      } = await response.json();
      return {
        titlePage,
        seoOnPage: seoOnPage as SeoOnPage,
        items: items.map((item: LatestVideoRaw) => ({
          id: item._id,
          year: item.year,
          name: item.name,
          originName: item.origin_name,
          slug: item.slug,
          thumbnail: `${APP_DOMAIN_CDN_IMAGE}/${item.thumb_url}`,
          poster: `${APP_DOMAIN_CDN_IMAGE}/${item.poster_url}`,
          episodeCurrent: item.episode_current,
          countries: item.country,
          categories: item.category,
          language: item.lang,
          tmdb: item.tmdb,
          imdb: item.imdb,
        })) as LatestVideo[],
        pagination: pagination as Pagination,
      };
    } catch (error) {
      console.log(`searchVideos error`, error);
    }
  }
  return DEFAULT_VIDEOS_RESPONSE;
};
