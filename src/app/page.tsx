import categoryApi, { categorySlugTitleMap } from "@/features/categories/data";
import countryApi from "@/features/countries/data";
import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import VideosCategorySection from "@/features/videos/components/videos-category-section";
import VideosCountrySection from "@/features/videos/components/videos-country-section";
import videoApi from "@/features/videos/data";
import WatchedVideosSection from "@/features/watched-videos/components/watched-videos-section";
import { getSeo } from "@/lib/utils";

export const generateMetadata = async () => {
  const defaultTitle = "PhimKhaHay | Trang chủ";
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchHomeData();

    return getSeo(
      {
        ...seoOnPage,
        titleHead: defaultTitle,
      },
      APP_DOMAIN_CDN_IMAGE
    );
  } catch (error) {
    console.log(error);
  }

  return {
    title: defaultTitle,
  };
};

export default async function Home() {
  const results = await Promise.allSettled([
    videoApi.fetchHomeData(),
    countryApi.fetchVideosData("han-quoc"),
    categoryApi.fetchVideosData("hoc-duong", {
      limit: "6",
      country: "han-quoc",
    }),
    categoryApi.fetchVideosData("hinh-su", { limit: "6", country: "han-quoc" }),
    countryApi.fetchVideosData("trung-quoc"),
    categoryApi.fetchVideosData("vien-tuong", {
      limit: "6",
      country: "trung-quoc",
    }),
    categoryApi.fetchVideosData("co-trang", {
      limit: "6",
      country: "trung-quoc",
    }),
    countryApi.fetchVideosData("nhat-ban"),
    categoryApi.fetchVideosData("phieu-luu", {
      limit: "6",
      country: "nhat-ban",
    }),
    categoryApi.fetchVideosData("the-thao", {
      limit: "6",
      country: "nhat-ban",
    }),
    categoryApi.fetchVideosData("hai-huoc", { limit: "6" }),
    categoryApi.fetchVideosData("kinh-di", { limit: "6" }),
  ]);

  const appDomainCdnImage =
    results[0].status === "fulfilled"
      ? results[0].value.data.APP_DOMAIN_CDN_IMAGE
      : "";

  return (
    <div className="">
      <LatestVideosCarousel
        appDomainCdnImage={appDomainCdnImage}
        videos={
          results[0].status === "fulfilled" ? results[0].value.data.items : []
        }
      />

      <WatchedVideosSection />
      <VideosCountrySection
        appDomainCdnImage={appDomainCdnImage}
        title="PHIM HÀN QUỐC"
        titleColor="blue"
        href="/quoc-gia/han-quoc"
        videos={
          results[1].status === "fulfilled" ? results[1].value.data.items : []
        }
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["hoc-duong"]}
        videos={
          results[2].status === "fulfilled" ? results[2].value.data.items : []
        }
        href="/the-loai/hoc-duong"
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["hinh-su"]}
        videos={
          results[3].status === "fulfilled" ? results[3].value.data.items : []
        }
        href="/the-loai/hinh-su"
      />

      <VideosCountrySection
        appDomainCdnImage={appDomainCdnImage}
        title="PHIM TRUNG QUỐC"
        titleColor="yellow"
        href="/quoc-gia/trung-quoc"
        videos={
          results[4].status === "fulfilled" ? results[4].value.data.items : []
        }
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["vien-tuong"]}
        videos={
          results[5].status === "fulfilled" ? results[5].value.data.items : []
        }
        href="/the-loai/vien-tuong"
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["co-trang"]}
        videos={
          results[6].status === "fulfilled" ? results[6].value.data.items : []
        }
        href="/the-loai/co-trang"
      />

      <VideosCountrySection
        appDomainCdnImage={appDomainCdnImage}
        title="PHIM NHẬT BẢN"
        titleColor="red"
        href="/quoc-gia/nhat-ban"
        videos={
          results[7].status === "fulfilled" ? results[7].value.data.items : []
        }
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["phieu-luu"]}
        videos={
          results[8].status === "fulfilled" ? results[8].value.data.items : []
        }
        href="/the-loai/phieu-luu"
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["the-thao"]}
        videos={
          results[9].status === "fulfilled" ? results[9].value.data.items : []
        }
        href="/the-loai/the-thao"
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["hai-huoc"]}
        videos={
          results[10].status === "fulfilled" ? results[10].value.data.items : []
        }
        href="/the-loai/hai-huoc"
      />

      <VideosCategorySection
        appDomainCdnImage={appDomainCdnImage}
        title={categorySlugTitleMap["kinh-di"]}
        videos={
          results[11].status === "fulfilled" ? results[11].value.data.items : []
        }
        href="/the-loai/kinh-di"
      />
    </div>
  );
}
