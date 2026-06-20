import CastProfile from "@/components/cast-profile";
import HeroCarousel from "@/components/hero-carousel";
import SectionHeader from "@/components/section-header";
import VideoCard from "@/components/video-card";
import { hotCasts } from "@/lib/constants";
import recommendVideos from "@/lib/recommend-videos.json";
import {
  getLatestVideos,
  getVideosByCountry,
  getVideosByTypeList,
} from "@/lib/video";
import {
  Fire,
  Globe02Icon,
  PlayCircleIcon,
  SparklesIcon
} from "@hugeicons/core-free-icons";

const sections = [
  {
    title: "Hoa ngữ đặc sắc",
    icon: Globe02Icon,
    iconColor: "text-cyan-500",
    gradientClassName: "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient",
    href: "/danh-sach/phim-bo?country=trung-quoc"
  },
  {
    title: "K-Drama gây sốt",
    icon: SparklesIcon,
    iconColor: "text-fuchsia-500",
    gradientClassName: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient",
    href: "/danh-sach/phim-bo?country=han-quoc",
  },
  {
    title: "Thế giới Anime",
    icon: PlayCircleIcon,
    iconColor: "text-emerald-500",
    gradientClassName: "bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient",
    href: "/danh-sach/hoat-hinh"
  },
  {
    title: "Visual nổi bật",
    icon: PlayCircleIcon,
    iconColor: "text-violet-500",
    gradientClassName: "bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
  }
]

export default async function Home() {
  const [carouselItems, ...data] = await Promise.allSettled([
    getLatestVideos({ page: 1 }),
    getVideosByCountry("trung-quoc", {
      page: "1",
      limit: "12",
    }),
    getVideosByCountry("han-quoc", {
      page: "1",
      limit: "12",
    }),
    getVideosByTypeList("hoat-hinh", {
      page: "1",
      limit: "12",
      country: "nhat-ban",
    })
  ])

  const sectionVideos = data.map((item) => item.status === 'fulfilled' ? item.value.data : null)

  return (
    <div className="_container space-y-4 lg:space-y-8 pb-4 lg:pb-8">
      <HeroCarousel items={carouselItems.status === 'fulfilled' ? (carouselItems.value?.items || []) : []} />
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9 space-y-4 lg:space-y-8 lg:order-1 order-2">
          {sections.map((item, index) => (
            <section key={index} className="space-y-2 lg:space-y-4">
              <SectionHeader  {...item} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
                {index === sections.length - 1 ? hotCasts.map((cast) => (
                  <CastProfile
                    key={cast.id}
                    {...cast}
                    className="col-span-1"
                  />
                )) : sectionVideos[index]?.items?.map((videoItem) => (
                  <div key={videoItem._id} className="col-span-1">
                    <VideoCard
                      videoItem={videoItem}
                      imageDomain={sectionVideos[index]?.APP_DOMAIN_CDN_IMAGE}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-3 lg:order-2 order-1">
          <section className="space-y-2 lg:space-y-4">
            <SectionHeader
              title="Phim nổi bật"
              icon={Fire}
              iconColor="text-red-500"
              gradientClassName="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
              href="/phim-hot"
            />
            <div className="gap-2 lg:gap-4 grid grid-cols-2">
              {recommendVideos.slice(0, 24).map((videoItem) => (
                <div key={videoItem.slug} className="col-span-1 lg:col-span-2">
                  <VideoCard
                    videoItem={videoItem}
                    className="lg:hidden"
                  />
                  <VideoCard direction="row"
                    videoItem={videoItem}
                    className="lg:flex hidden"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
