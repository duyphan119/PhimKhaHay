import { castsApi } from "@/features/casts/api";
import { videosApi } from "@/features/videos/api";
import VideoDetailsPage from "@/features/videos/pages/video-details";
import { randomVideos, stripHtml } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import hotVideos from "@/lib/hot-videos.json";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const data = await videosApi.getDetails(awaitedParams.slug);

  if (!data) {
    return {
      title: "phimkhahay | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }

  const title = `phimkhahay |  ${data.item.name}`;

  return {
    title,
    description: stripHtml(data.item.content),
  };
}

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const data = await videosApi.getDetails(awaitedParams.slug);

  if (!data) return notFound();

  return <VideoDetailsPage item={data.item} hotVideos={randomVideos(hotVideos, 17)} />;
}
