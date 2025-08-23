import Breadcrumb from "@/components/breadcrumb";
import Servers from "@/features/servers/components/servers";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoContent from "@/features/videos/components/video-content";
import VideoInfo from "@/features/videos/components/video-info";
import VideoStreaming from "@/features/videos/components/video-streaming";
import { getVideo } from "@/features/videos/data";
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
    const { video, servers } = await getVideo(slug);
    const { ep, ser } = await searchParams;
    if (video) {
      const server = servers[Number(ser) || 0];
      const episode =
        server?.episodes?.find(({ slug }) => slug === ep) ||
        server?.episodes?.[0];
      return {
        title: `PhimKhaHay ${episode ? `| ${episode.name} |` : "|"} ${
          video.name
        }`,
      };
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

  const indexServer = Number(ser) || 0;

  const { video, servers } = await getVideo(slug);

  if (!video) return notFound();

  const currentServer = servers[indexServer];
  const indexEdpisode = currentServer.episodes.findIndex(
    ({ slug }) => slug === ep
  );
  const currentEpisode =
    currentServer.episodes[indexEdpisode === -1 ? 0 : indexEdpisode];

  if (!currentEpisode) return redirect(`/xem-phim/${video.slug}`);

  const indexNextEpisode = (indexEdpisode + 1) % currentServer.episodes.length;
  const indexPreviousEpisode =
    (indexEdpisode + currentServer.episodes.length - 1) %
    currentServer.episodes.length;

  return (
    <div className="_container">
      <div className="grid grid-cols-12 gap-4 py-4">
        <Breadcrumb
          items={[
            {
              href: "/danh-sach",
              text: "Danh sách phim",
            },
            ...(currentEpisode
              ? [
                  { href: `/phim/${video.slug}`, text: video.name },
                  { text: currentEpisode.name },
                ]
              : [{ text: video.name }]),
          ]}
          className="col-span-12"
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 space-y-4">
              {currentEpisode && (
                <>
                  <VideoStreaming
                    embedUrl={currentEpisode.link_embed}
                    nextEpisode={currentServer.episodes[indexNextEpisode]}
                    previousEpisode={
                      currentServer.episodes[indexPreviousEpisode]
                    }
                    watchedVideoInput={{
                      id: video.id,
                      name: video.name,
                      originName: video.originName,
                      slug: video.slug,
                      thumbnail: video.thumbnail,
                      serverName: currentServer.name,
                      episodeName: currentEpisode.name,
                      query: `?ep=${currentEpisode.slug}&ser=${indexServer}`,
                      time: new Date().getTime(),
                      otherWatchedEpisodes: [],
                    }}
                  />
                </>
              )}
            </div>
            <div className="col-span-12">
              <div className="mb-2">Danh sách tập</div>
              <Servers
                servers={servers}
                videoSlug={video.slug}
                currentEpisode={currentEpisode}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <div className="relative w-full aspect-[23/35]">
                <Image
                  src={video.poster}
                  alt="Poster"
                  fill
                  sizes="(max-width: 1200px) 50vw, 100vw"
                  className="object-cover rounded-md shadow"
                  priority
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-9">
              <VideoInfo video={video} />
            </div>
            <div className="col-span-12">
              <div className="text-lg font-medium">Nội dung</div>
              <VideoContent content={video.content} />
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <RecommendVideos slug={video.slug} country={video.countries[0]} />
        </div>
      </div>
    </div>
  );
}
