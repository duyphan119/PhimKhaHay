import LatestVideosCarousel from "@/features/videos/components/latest-videos-carousel";
import VideosCategorySection from "@/features/videos/components/videos-category-section";
import VideosCountrySection from "@/features/videos/components/videos-country-section";
import {
  getLatestVideos,
  getVideosByCategory,
  getVideosByCountry,
} from "@/features/videos/data";
import WatchedVideosSection from "@/features/watched-videos/components/watched-videos-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PhimKhaHay | Trang chủ",
};

export default async function Home() {
  const results = await Promise.allSettled([
    getLatestVideos(),
    getVideosByCountry("han-quoc"),
    getVideosByCountry("trung-quoc"),
    getVideosByCountry("nhat-ban"),
    getVideosByCategory("hai-huoc", { limit: 6 }),
    getVideosByCategory("phieu-luu", { limit: 6 }),
    getVideosByCategory("hoc-duong", { limit: 6 }),
    getVideosByCategory("the-thao", { limit: 6 }),
    getVideosByCategory("kinh-di", { limit: 6 }),
    getVideosByCategory("hinh-su", { limit: 6 }),
    getVideosByCategory("vien-tuong", { limit: 6 }),
    getVideosByCategory("vo-thuat", { limit: 6 }),
  ]);

  const latestVideos =
    results[0].status === "fulfilled" ? results[0].value.items : [];
  const koreaVideos =
    results[1].status === "fulfilled" ? results[1].value.items : [];
  const chinaVideos =
    results[2].status === "fulfilled" ? results[2].value.items : [];
  const japanVideos =
    results[3].status === "fulfilled" ? results[3].value.items : [];

  return (
    <div className="">
      <LatestVideosCarousel videos={latestVideos} />

      <WatchedVideosSection />
      <div className="mt-12 p-4 rounded-md _bg-layout space-y-8">
        <VideosCountrySection
          title="PHIM HÀN QUỐC"
          titleColor="blue"
          href="/danh-sach?country=han-quoc"
          videos={koreaVideos}
        />

        <VideosCountrySection
          title="PHIM TRUNG QUỐC"
          titleColor="yellow"
          href="/danh-sach?country=trung-quoc"
          videos={chinaVideos}
        />

        <VideosCountrySection
          title="PHIM NHẬT BẢN"
          titleColor="red"
          href="/danh-sach?country=nhat-ban"
          videos={japanVideos}
        />
      </div>

      {results[4].status === "fulfilled" && (
        <VideosCategorySection
          title="Tiếng cười sảng khoái"
          videos={results[4].value.items}
          href="/danh-sach?category=hai-huoc"
        />
      )}
      {results[5].status === "fulfilled" && (
        <VideosCategorySection
          title="Chuyến đi mạo hiểm"
          videos={results[5].value.items}
          href="/danh-sach?category=phieu-luu"
        />
      )}
      {results[6].status === "fulfilled" && (
        <VideosCategorySection
          title="Tuổi học trò"
          videos={results[6].value.items}
          href="/danh-sach?category=hoc-duong"
        />
      )}
      {results[7].status === "fulfilled" && (
        <VideosCategorySection
          title="Sức mạnh và tốc độ"
          videos={results[7].value.items}
          href="/danh-sach?category=the-thao"
        />
      )}
      {results[8].status === "fulfilled" && (
        <VideosCategorySection
          title="Rùng rợn, ám ảnh"
          videos={results[8].value.items}
          href="/danh-sach?category=kinh-di"
        />
      )}
      {results[9].status === "fulfilled" && (
        <VideosCategorySection
          title="Tội ác và công lý"
          videos={results[9].value.items}
          href="/danh-sach?category=hinh-su"
        />
      )}
      {results[10].status === "fulfilled" && (
        <VideosCategorySection
          title="Tương lai giả tưởng"
          videos={results[10].value.items}
          href="/danh-sach?category=vien-tuong"
        />
      )}
      {results[11].status === "fulfilled" && (
        <VideosCategorySection
          title="Quyền cước tinh hoa"
          videos={results[11].value.items}
          href="/danh-sach?category=vo-thuat"
        />
      )}
    </div>
  );
}
