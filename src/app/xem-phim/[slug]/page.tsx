import Breadcrumb from "@/components/breadcrumb";
import Episodes from "@/features/episodes/components/episodes";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoInfo from "@/features/videos/components/video-info";
import VideoStreaming from "@/features/videos/components/video-streaming";
import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

type VideoStreamingPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ep: string;
    ser: string;
  }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: VideoStreamingPageProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const {
      data: { item, seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchVideoDetailsData(slug);
    const { ep, ser } = await searchParams;
    if (item) {
      const episode = item.episodes[Number(ser) || 0];
      const serverDataItem =
        episode?.server_data?.find(({ slug }) => slug === ep) ||
        episode?.server_data?.[0];
      return getSeo(
        {
          ...seoOnPage,
          titleHead: `PhimKhaHay ${
            episode ? `| ${serverDataItem.name} |` : "|"
          } ${item.name}`,
        },
        APP_DOMAIN_CDN_IMAGE
      );
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay",
  };
};

export default async function VideoStreamingPage({
  params,
  searchParams,
}: VideoStreamingPageProps) {
  const { slug } = await params;
  const { ep, ser } = await searchParams;

  const indexEpisode = Number(ser) || 0;

  const {
    data: { item, APP_DOMAIN_CDN_IMAGE, breadCrumb },
  } = await videoApi.fetchVideoDetailsData(slug);

  if (!item) return notFound();

  const currentEpisode = item.episodes[indexEpisode];
  const indexServerDataItem = currentEpisode.server_data.findIndex(
    ({ slug }) => slug === ep
  );
  const currentServerDataItem =
    currentEpisode.server_data[
      indexServerDataItem === -1 ? 0 : indexServerDataItem
    ];

  if (!currentEpisode) return redirect(`/xem-phim/${item.slug}`);

  const indexNextEpisode =
    (indexServerDataItem + 1) % currentEpisode.server_data.length;
  const indexPreviousEpisode =
    (indexServerDataItem + currentEpisode.server_data.length - 1) %
    currentEpisode.server_data.length;

  return (
    <div className="grid grid-cols-12 gap-4">
      <Breadcrumb
        breadCrumb={[
          ...breadCrumb.filter(({ isCurrent }) => !isCurrent),
          {
            name: item.name,
            slug: `/phim/${item.slug}`,
            isCurrent: false,
          },
          {
            isCurrent: true,
            name: `Tập ${currentServerDataItem.name}`,
          },
        ]}
        className="col-span-12"
      />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 space-y-4">
            {currentEpisode && (
              <>
                <VideoStreaming
                  embedUrl={currentServerDataItem.link_embed}
                  nextServerDataItem={
                    currentEpisode.server_data[indexNextEpisode]
                  }
                  previousServerDataItem={
                    currentEpisode.server_data[indexPreviousEpisode]
                  }
                  watchedVideoInput={{
                    id: item._id,
                    name: item.name,
                    originName: item.origin_name,
                    slug: item.slug,
                    thumbnail: `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.poster_url}`,
                    serverName: currentEpisode.server_name,
                    serverDataItemName: currentServerDataItem.name,
                    query: `?ep=${currentServerDataItem.slug}&ser=${indexEpisode}`,
                    time: new Date().getTime(),
                    otherWatchedEpisodes: [],
                  }}
                />
              </>
            )}
          </div>
          <div className="col-span-12">
            <div className="mb-2">Danh sách tập</div>
            <Episodes
              episodes={item.episodes}
              videoSlug={item.slug}
              current={currentServerDataItem}
            />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`}
                alt="Poster"
                fill
                unoptimized
                className="object-cover rounded-md shadow"
                priority
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-8">
            <VideoInfo video={item} />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <RecommendVideos
          slug={item.slug}
          country={item.country}
          category={item.category}
          videoType={item.type}
        />
      </div>
      {item.type}
    </div>
  );
}
