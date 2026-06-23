import HeroCarousel from "@/components/hero-carousel";
import SectionHeader from "@/components/section-header";
import CastProfile from "@/features/casts/components/cast-profile";
import { countriesApi } from "@/features/countries/api";
import { videosApi } from "@/features/videos/api";
import VideoCard from "@/features/videos/components/video-card";
import HomeWatchedVideos from "@/features/watched-videos/components/home-watched-videos";
import { HOT_VIDEOS, HOT_CASTS } from "@/lib/constants";
import {
  Fire,
  Globe02Icon,
  PlayCircleIcon,
  SparklesIcon
} from "@hugeicons/core-free-icons";

const sections = [
  {
    title: "Phim nổi bật",
    icon: Fire,
    iconColor: "text-red-500",
    gradientClassName: "from-red-500 via-orange-500 to-yellow-400",
    href: "/phim-hot"
  },
  {
    title: "Phim Trung Quốc",
    icon: Globe02Icon,
    iconColor: "text-cyan-500",
    gradientClassName: "from-cyan-400 via-sky-500 to-blue-600",
    href: "/quoc-gia/trung-quoc"
  },
  {
    title: "Phim Hàn Quốc",
    icon: SparklesIcon,
    iconColor: "text-fuchsia-500",
    gradientClassName: "from-fuchsia-500 via-pink-500 to-rose-500",
    href: "/quoc-gia/han-quoc",
  },
  {
    title: "Phim Nhật Bản",
    icon: PlayCircleIcon,
    iconColor: "text-emerald-500",
    gradientClassName: "from-emerald-400 via-green-500 to-lime-400",
    href: "/danh-sach/hoat-hinh"
  },
  {
    title: "Visual nổi bật",
    icon: PlayCircleIcon,
    iconColor: "text-violet-500",
    gradientClassName: "from-violet-500 via-purple-500 to-indigo-500"
  }
]

export default async function Home() {
  const [carouselItems, ...data] = await Promise.allSettled([
    videosApi.getHome(),
    countriesApi.getVideos("trung-quoc", {
      page: "1",
      limit: "24",
      sort_field: 'modified.time',
      sort_type: 'desc'
    }),
    countriesApi.getVideos("han-quoc", {
      page: "1",
      limit: "24",
      sort_field: 'modified.time',
      sort_type: 'desc'
    }),
    countriesApi.getVideos("nhat-ban", {
      page: "1",
      limit: "24",
      sort_field: 'modified.time',
      sort_type: 'desc'
    }),
  ])
  const sectionVideos = data.map((item) => item.status === 'fulfilled' ? item.value : null)

  const [firstSection, ...otherSections] = sections;

  return (
    <div className="space-y-4 lg:space-y-8 pb-4 lg:pb-8">
      <HeroCarousel items={carouselItems.status === 'fulfilled' ? (carouselItems.value?.items || []) : []} />
      <div className="_container grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9 space-y-4 lg:space-y-8">
          <HomeWatchedVideos />
          {otherSections.map((item, index) => (
            <section key={index} className="space-y-2 lg:space-y-4">
              <SectionHeader  {...item} />
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {index === otherSections.length - 1 ? HOT_CASTS.map((cast) => (
                  <CastProfile
                    key={cast.id}
                    {...cast}
                    className="col-span-1"
                  />
                )) : sectionVideos[index]?.items.map((videoItem) => (
                  <div key={videoItem._id} className="col-span-1">
                    <VideoCard
                      videoItem={videoItem}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-3">
          <section className="space-y-2 lg:space-y-4">
            <SectionHeader {...firstSection} />
            <div className="gap-4 grid grid-cols-12">
              {HOT_VIDEOS.slice(0, 24).map((videoItem: ThotedVideo) => (
                <div key={videoItem.slug} className="col-span-4 lg:col-span-12">
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
