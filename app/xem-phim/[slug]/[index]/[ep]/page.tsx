import { buttonVariants } from "@/components/ui/button";
import { videosApi } from "@/features/videos/api";
import VideoDetailsPage from "@/features/videos/pages/video-details";
import { getServerName, stripHtml } from "@/lib/utils";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  episodeName?: string,
) => `/xem-phim/${movieSlug}/${serverIndex}/${episodeName}`;

async function getPageData(params: Promise<Params>) {
  const { slug, ep: episodeName, index } = await params;

  const data = await videosApi.getDetails(slug);

  if (!data) return null;

  const serverIndex = Number(index);

  const currentServer = data.item.episodes?.[serverIndex];

  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.name === episodeName,
  );

  return {
    slug,
    index,
    episodeName,
    item: data.item,
    serverIndex,
    currentServer,
    currentEpisode,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data =
    await getPageData(params);
  if (!data) {
    return {
      title: "phimkhahay | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }
  const { item, currentEpisode, serverIndex } = data;

  const episodeName =
    currentEpisode?.name || currentEpisode?.filename || "Xem phim";

  const serverName = getServerName(item.episodes?.[serverIndex]?.server_name);

  const description =
    stripHtml(item.content).slice(0, 160) ||
    `Xem ${episodeName} của phim ${item.name} chất lượng cao.`;

  const title = `phimkhahay | ${episodeName} - ${serverName} - ${item.name}`;

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const data =
    await getPageData(params);
  if (!data) return notFound();

  const { item, currentEpisode, serverIndex, currentServer } = data;

  if (!item || !currentEpisode) return notFound();

  const currentEpisodeIndex =
    currentServer?.server_data?.findIndex(
      (ep) => ep.name === currentEpisode.name,
    ) ?? -1;

  const prevEpisode =
    currentEpisodeIndex > 0
      ? currentServer?.server_data?.[currentEpisodeIndex - 1]
      : item.episodes?.[serverIndex - 1]?.server_data?.at(-1);

  const nextEpisode =
    currentEpisodeIndex < (currentServer?.server_data.length ?? 0) - 1
      ? currentServer?.server_data?.[currentEpisodeIndex + 1]
      : item.episodes?.[serverIndex + 1]?.server_data?.[0];

  const prevLink = prevEpisode
    ? createEpisodeLink(
      item.slug,
      currentEpisodeIndex > 0 ? serverIndex : serverIndex - 1,
      prevEpisode.name,
    )
    : undefined;

  const nextLink = nextEpisode
    ? createEpisodeLink(
      item.slug,
      currentEpisodeIndex < currentServer.server_data.length - 1
        ? serverIndex
        : serverIndex + 1,
      nextEpisode.name,
    )
    : undefined;

  const serverName = getServerName(item.episodes?.[serverIndex]?.server_name);

  return (
    <VideoDetailsPage
      item={item}
      hideButtons
      currentEpisodeName={currentEpisode.name}
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
    </VideoDetailsPage>
  );
}
