import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import VideoDetails from "@/components/video-details";
import { getServerName, stripHtml } from "@/lib/utils";
import { getVideo } from "@/lib/video";

type Params = {
  slug: string;
  ep: string;
  index: string;
};

type Props = {
  params: Promise<Params>;
};

const createEpisodeLink = (
  movieSlug: string,
  serverIndex: number,
  episodeSlug?: string,
) => `/xem-phim/${movieSlug}/${serverIndex}/${episodeSlug}`;

async function getPageData(params: Promise<Params>) {
  const { slug, ep: episodeSlug, index } = await params;

  const { movie, episodes } = await getVideo(slug);

  const serverIndex = Number(index);

  const currentServer = episodes?.[serverIndex];

  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.slug === episodeSlug,
  );

  return {
    slug,
    index,
    episodeSlug,
    movie,
    episodes,
    serverIndex,
    currentServer,
    currentEpisode,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movie, episodes, currentEpisode, serverIndex, index, episodeSlug } =
    await getPageData(params);

  if (!movie) {
    return {
      title: "KDPhim | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }

  const episodeName =
    currentEpisode?.name || currentEpisode?.filename || "Xem phim";

  const serverName = getServerName(episodes?.[serverIndex]?.server_name);

  const description =
    stripHtml(movie.content).slice(0, 160) ||
    `Xem ${episodeName} của phim ${movie.name} chất lượng cao.`;

  const title = `KDPhim | ${episodeName} - ${serverName} - ${movie.name}`;

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const { movie, episodes, serverIndex, currentServer, currentEpisode } =
    await getPageData(params);

  if (!movie || !currentEpisode) return null;

  const currentEpisodeIndex =
    currentServer?.server_data?.findIndex(
      (ep) => ep.slug === currentEpisode.slug,
    ) ?? -1;

  const prevEpisode =
    currentEpisodeIndex > 0
      ? currentServer?.server_data?.[currentEpisodeIndex - 1]
      : episodes?.[serverIndex - 1]?.server_data?.at(-1);

  const nextEpisode =
    currentEpisodeIndex < (currentServer?.server_data.length ?? 0) - 1
      ? currentServer?.server_data?.[currentEpisodeIndex + 1]
      : episodes?.[serverIndex + 1]?.server_data?.[0];

  const prevLink = prevEpisode
    ? createEpisodeLink(
        movie.slug,
        currentEpisodeIndex > 0 ? serverIndex : serverIndex - 1,
        prevEpisode.slug,
      )
    : undefined;

  const nextLink = nextEpisode
    ? createEpisodeLink(
        movie.slug,
        currentEpisodeIndex < currentServer.server_data.length - 1
          ? serverIndex
          : serverIndex + 1,
        nextEpisode.slug,
      )
    : undefined;

  const serverName = getServerName(episodes?.[serverIndex]?.server_name);

  return (
    <VideoDetails
      video={movie}
      hideButtons
      episodes={episodes}
      currentEpisodeSlug={currentEpisode.slug}
      serverIndex={serverIndex}
      currentBreadcrumb={`${currentEpisode.name} - ${serverName}`}
    >
      <div className="aspect-video overflow-hidden rounded-lg bg-slate-950">
        <iframe
          src={currentEpisode.link_embed}
          width="100%"
          height="100%"
          allow="fullscreen"
          className="h-full w-full"
        />
      </div>

      {(prevLink || nextLink) && (
        <div className="mt-4 flex justify-center gap-4">
          {prevLink && (
            <Link
              href={prevLink}
              className={buttonVariants({
                variant: "sky",
                className: "rounded-sm",
              })}
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={14} />
              Tập trước
            </Link>
          )}

          {nextLink && (
            <Link
              href={nextLink}
              className={buttonVariants({
                variant: "sky",
                className: "rounded-sm",
              })}
            >
              Tập sau
              <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
            </Link>
          )}
        </div>
      )}
    </VideoDetails>
  );
}
