import Breadcrumb from "@/components/breadcrumb";
import Servers from "@/features/servers/components/servers";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoContent from "@/features/videos/components/video-content";
import VideoInfo from "@/features/videos/components/video-info";
import { getVideo } from "@/features/videos/data";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type VideoDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: VideoDetailsProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const { video } = await getVideo(slug);
    if (video) {
      return {
        title: `PhimKhaHay | ${video.name}`,
      };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay",
  };
};

export default async function VideoDetails({ params }: VideoDetailsProps) {
  const { slug } = await params;

  const { servers, video } = await getVideo(slug);

  if (!video) return notFound();

  return (
    <div className="_container">
      <div className="grid grid-cols-12 gap-4 py-4">
        <Breadcrumb
          items={[
            {
              href: "/danh-sach",
              text: "Danh sách phim",
            },
            {
              text: video.name,
            },
          ]}
          className="col-span-12"
        />
        <div className="col-span-12 lg:col-span-9">
          <div className="grid grid-cols-12 gap-4">
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
              <VideoInfo video={video} buttonPlayVisible={true} />
            </div>
            <div className="col-span-12">
              <div className="mb-2">Danh sách tập</div>
              <Servers servers={servers} videoSlug={video.slug} />
            </div>
            <div className="col-span-12">
              <div className="text-lg font-medium">Nội dung</div>
              <VideoContent content={video.content} />
            </div>
            {video.trailer && (
              <div className="col-span-12">
                <div className="text-lg font-medium">Trailer</div>
                <iframe
                  src={video.trailer.replace("watch?v=", "embed/")}
                  className="w-full aspect-video"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <RecommendVideos slug={video.slug} country={video.countries[0]} />
        </div>
      </div>
    </div>
  );
}
