"use client";

import Breadcrumb from "@/components/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import Actors from "@/features/actors/components/actors";
import actorApi from "@/features/actors/data";
import Episodes from "@/features/episodes/components/episodes";
import Images from "@/features/images/components/images";
import imageApi from "@/features/images/data";
import RecommendVideos from "@/features/videos/components/recommend-videos";
import VideoCard from "@/features/videos/components/video-card";
import VideoInfo from "@/features/videos/components/video-info";
import videoApi from "@/features/videos/data";
import VideoInfoSkeleton from "@/features/videos/skeletons/video-info-skeleton";
import { useQueries } from "@tanstack/react-query";
import { PlusSquare } from "lucide-react";
import Image from "next/image";

type Props = {
  slug: string;
};

export default function VideoDetails({ slug }: Props) {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["video-details", slug],
        queryFn: () => videoApi.fetchVideoDetailsData(slug),
      },
      {
        queryKey: ["video-details", "actors", slug],
        queryFn: () => actorApi.fetchActorsData(slug),
      },
      {
        queryKey: ["video-details", "images", slug],
        queryFn: () => imageApi.fetchImagesData(slug),
      },
      {
        queryKey: ["latest-videos"],
        queryFn: () => videoApi.fetchHomeData(),
      },
    ],
  });
  return (
    <div className="grid grid-cols-12 gap-4">
      {queries[0].data ? (
        <Breadcrumb
          breadCrumb={queries[0].data.data.breadCrumb}
          className="col-span-12"
        />
      ) : (
        <div className="col-span-12">
          <Skeleton className="md:w-1/2 w-full h-6" />
        </div>
      )}
      <div className="col-span-12 lg:col-span-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-5">
            {queries[0].data ? (
              <div className="relative w-full aspect-[2/3]">
                <Image
                  src={`${queries[0].data.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${queries[0].data.data.item.thumb_url}`}
                  alt="Poster"
                  fill
                  unoptimized
                  className="object-cover rounded-md shadow"
                  priority
                />
              </div>
            ) : (
              <Skeleton className="w-full aspect-[2/3]" />
            )}
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-7">
            {queries[0].data ? (
              <VideoInfo
                video={queries[0].data.data.item}
                buttonPlayVisible={true}
              />
            ) : (
              <VideoInfoSkeleton buttonPlayVisible={true} />
            )}
          </div>

          <Accordion
            defaultValue={["actors", "episodes", "images"]}
            type="multiple"
            className="col-span-12 space-y-4"
          >
            {queries[1].data
              ? queries[1].data.data.peoples.length > 0 && (
                  <AccordionItem value="actors">
                    <AccordionTrigger
                      hideIcon
                      className="_bg-layout w-full rounded-md"
                    >
                      <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                      <span className="text-xl font-medium _text-title-pink">
                        Diễn viên
                      </span>
                    </AccordionTrigger>
                    <AccordionContent noPadding className="_bg-layout p-4">
                      <Actors actorsData={queries[1].data.data} />
                    </AccordionContent>
                  </AccordionItem>
                )
              : null}
            {queries[0].data
              ? queries[0].data.data.item.episodes[0]?.server_data?.[0].name !==
                  "" && (
                  <AccordionItem value="episodes">
                    <AccordionTrigger
                      hideIcon
                      className="_bg-layout w-full rounded-md"
                    >
                      <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                      <span className="text-xl font-medium _text-title-pink">
                        Danh sách tập
                      </span>
                    </AccordionTrigger>
                    <AccordionContent noPadding className="_bg-layout p-4">
                      <Episodes
                        videoSlug={queries[0].data.data.item.slug}
                        episodes={queries[0].data.data.item.episodes}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )
              : null}
            {queries[2].data ? (
              <AccordionItem value="images">
                <AccordionTrigger
                  hideIcon
                  className="_bg-layout w-full rounded-md"
                >
                  <PlusSquare className="text-pink-600 mr-1 -translate-y-px" />
                  <span className="text-xl font-medium _text-title-pink">
                    Hình ảnh
                  </span>
                </AccordionTrigger>
                <AccordionContent noPadding className="_bg-layout p-4">
                  <Images imagesData={queries[2].data.data} />
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </Accordion>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 text-lg font-medium p-4 _bg-layout rounded-md">
            <div className="_text-title-pink">Phim mới</div>
          </div>
          {queries[3].data
            ? queries[3].data.data.items.map((video) => (
                <VideoCard
                  key={video._id}
                  appDomainCdnImage={
                    queries[3].data?.data.APP_DOMAIN_CDN_IMAGE || ""
                  }
                  video={video}
                  imageType="poster"
                  className="col-span-2 lg:col-span-1 _bg-layout"
                />
              ))
            : null}
        </div>
      </div>
      <div className="col-span-12">
        {queries[0].data ? (
          <RecommendVideos
            slug={queries[0].data.data.item.slug}
            country={queries[0].data.data.item.country}
            category={queries[0].data.data.item.category}
            videoType={queries[0].data.data.item.type}
          />
        ) : null}
      </div>
    </div>
  );
}
