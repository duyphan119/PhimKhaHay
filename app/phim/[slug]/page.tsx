import VideoDetails from "@/components/video-details";
import { stripHtml } from "@/lib/utils";
import { getVideo } from "@/lib/video";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const { movie } = await getVideo(awaitedParams.slug);

  if (!movie) {
    return {
      title: "KDPhim | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }

  const title = `KDPhim |  ${movie.name}`;

  return {
    title,
    description: stripHtml(movie.content),
  };
}

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const { movie, episodes } = await getVideo(awaitedParams.slug);

  if (!movie) return notFound();

  return <VideoDetails video={movie} episodes={episodes} />;
}
