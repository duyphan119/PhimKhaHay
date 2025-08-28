"use client";

import categoryApi, { categorySlugTitleMap } from "@/features/categories/data";
import countryApi from "@/features/countries/data";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import VideosCategorySection from "@/features/videos/components/videos-category-section";
import VideosCountrySection from "@/features/videos/components/videos-country-section";
import videoApi from "@/features/videos/data";
import WatchedVideosSection from "@/features/watched-videos/components/watched-videos-section";
import { useQueries } from "@tanstack/react-query";
import { Fragment } from "react";

type BaseConfig = {
  key: (string | number)[];
  fn: () => Promise<TVideosResponse>;
};

type LatestConfig = BaseConfig & {
  type: "latest";
};

type CountryConfig = BaseConfig & {
  type: "country";
  title: string;
  color: "red" | "blue" | "yellow";
  href: string;
};

type CategoryConfig = BaseConfig & {
  type: "category";
  slug: keyof typeof categorySlugTitleMap; // ràng buộc slug chỉ trong map
  href: string;
};

export type QueryConfig = LatestConfig | CountryConfig | CategoryConfig;

const queryConfigs: QueryConfig[] = [
  {
    key: ["latest-videos"],
    fn: () => videoApi.fetchHomeData(),
    type: "latest",
  },
  {
    key: ["videos-country", "han-quoc"],
    fn: () => countryApi.fetchVideosData("han-quoc"),
    type: "country",
    title: "PHIM HÀN QUỐC",
    color: "blue",
    href: "/quoc-gia/han-quoc",
  },
  {
    key: ["videos-category", "hoc-duong", "han-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("hoc-duong", {
        limit: "6",
        country: "han-quoc",
      }),
    type: "category",
    slug: "hoc-duong",
    href: "/the-loai/hoc-duong",
  },
  {
    key: ["videos-category", "hinh-su", "han-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("hinh-su", {
        limit: "6",
        country: "han-quoc",
      }),
    type: "category",
    slug: "hinh-su",
    href: "/the-loai/hinh-su",
  },
  {
    key: ["videos-country", "trung-quoc"],
    fn: () => countryApi.fetchVideosData("trung-quoc"),
    type: "country",
    title: "PHIM TRUNG QUỐC",
    color: "yellow",
    href: "/quoc-gia/trung-quoc",
  },
  {
    key: ["videos-category", "vien-tuong", "trung-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("vien-tuong", {
        limit: "6",
        country: "trung-quoc",
      }),
    type: "category",
    slug: "vien-tuong",
    href: "/the-loai/vien-tuong",
  },
  {
    key: ["videos-category", "co-trang", "trung-quoc"],
    fn: () =>
      categoryApi.fetchVideosData("co-trang", {
        limit: "6",
        country: "trung-quoc",
      }),
    type: "category",
    slug: "co-trang",
    href: "/the-loai/co-trang",
  },
  {
    key: ["videos-country", "nhat-ban"],
    fn: () => countryApi.fetchVideosData("nhat-ban"),
    type: "country",
    title: "PHIM NHẬT BẢN",
    color: "red",
    href: "/quoc-gia/nhat-ban",
  },
  {
    key: ["videos-category", "phieu-luu", "nhat-ban"],
    fn: () =>
      categoryApi.fetchVideosData("phieu-luu", {
        limit: "6",
        country: "nhat-ban",
      }),
    type: "category",
    slug: "phieu-luu",
    href: "/the-loai/phieu-luu",
  },
  {
    key: ["videos-category", "the-thao", "nhat-ban"],
    fn: () =>
      categoryApi.fetchVideosData("the-thao", {
        limit: "6",
        country: "nhat-ban",
      }),
    type: "category",
    slug: "the-thao",
    href: "/the-loai/the-thao",
  },
  {
    key: ["videos-category", "hai-huoc"],
    fn: () => categoryApi.fetchVideosData("hai-huoc", { limit: "6" }),
    type: "category",
    slug: "hai-huoc",
    href: "/the-loai/hai-huoc",
  },
  {
    key: ["videos-category", "kinh-di"],
    fn: () => categoryApi.fetchVideosData("kinh-di", { limit: "6" }),
    type: "category",
    slug: "kinh-di",
    href: "/the-loai/kinh-di",
  },
];
export default function Home() {
  const queries = useQueries({
    queries: queryConfigs.map((q) => ({
      queryKey: q.key,
      queryFn: q.fn,
    })),
  });

  return (
    <>
      {queries.map((query, i) => {
        const cfg = queryConfigs[i];
        const data = query.data?.data;
        const appDomainCdnImage = data?.APP_DOMAIN_CDN_IMAGE || "";
        const videos = data?.items || [];

        if (cfg.type === "latest") {
          return (
            <Fragment key={i}>
              <LatestVideosCarousel
                appDomainCdnImage={appDomainCdnImage}
                videos={videos}
                isLoading={query.isLoading}
              />
              <WatchedVideosSection />
            </Fragment>
          );
        }

        if (cfg.type === "country") {
          return (
            <VideosCountrySection
              key={i}
              title={cfg.title!}
              titleColor={cfg.color!}
              href={cfg.href!}
              appDomainCdnImage={appDomainCdnImage}
              videos={videos}
              isLoading={query.isLoading}
            />
          );
        }

        if (cfg.type === "category") {
          return (
            <VideosCategorySection
              key={i}
              appDomainCdnImage={appDomainCdnImage}
              videos={videos}
              isLoading={query.isLoading}
              title={categorySlugTitleMap[cfg.slug!]}
              href={cfg.href!}
            />
          );
        }

        return null;
      })}
    </>
  );
}
