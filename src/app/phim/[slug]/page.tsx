import Breadcrumb from "@/components/breadcrumb";
import Actors from "@/features/actors/components/actors";
import actorApi from "@/features/actors/data";
import Episodes from "@/features/episodes/components/episodes";
import Images from "@/features/images/components/images";
import imageApi from "@/features/images/data";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoInfo from "@/features/videos/components/video-info";
import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
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
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchVideoDetailsData(slug);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay",
  };
};

export default async function VideoDetails({ params }: VideoDetailsProps) {
  const { slug } = await params;

  const results = await Promise.allSettled([
    videoApi.fetchVideoDetailsData(slug),
    actorApi.fetchActorsData(slug),
    imageApi.fetchImagesData(slug),
  ]);

  if (results[0].status !== "fulfilled") return notFound();
  const {
    data: { item, breadCrumb, APP_DOMAIN_CDN_IMAGE },
  } = results[0].value;

  return (
    <div className="grid grid-cols-12 gap-4">
      <Breadcrumb breadCrumb={breadCrumb} className="col-span-12" />
      <div className="col-span-12 lg:col-span-9">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={`${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`}
                alt="Poster"
                fill
                sizes="(max-width: 1200px) 50vw, 100vw"
                className="object-cover rounded-md shadow"
                priority
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-8">
            <VideoInfo video={item} buttonPlayVisible={true} />
          </div>
          {results[1].status === "fulfilled" &&
            results[1].value.data.peoples.length > 0 && (
              <div className="col-span-12">
                <div className="text-xl font-medium _text-title-pink mb-1">
                  Diễn viên
                </div>

                <Actors actorsData={results[1].value.data} />
              </div>
            )}
          {item.episodes[0]?.server_data?.[0].name !== "" && (
            <div className="col-span-12">
              <div className="text-xl font-medium _text-title-pink mb-1">
                Danh sách tập
              </div>
              <Episodes videoSlug={item.slug} episodes={item.episodes} />
            </div>
          )}
          {results[2].status === "fulfilled" && (
            <div className="col-span-12">
              <div className="text-xl font-medium _text-title-pink mb-1">
                Hình ảnh
              </div>
              <Images imagesData={results[2].value.data} />
            </div>
          )}
          {item.trailer_url && (
            <div className="col-span-12">
              <div className="text-lg font-medium">Trailer</div>
              <iframe
                src={item.trailer_url.replace("watch?v=", "embed/")}
                className="w-full aspect-video"
              ></iframe>
            </div>
          )}
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
    </div>
  );
}
