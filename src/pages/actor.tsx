"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import actorApi from "@/features/actors/data";
import VideoCard from "@/features/videos/components/video-card";
import VideoCardSkeleton from "@/features/videos/skeletons/video-card-skeleton";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  actorId: string | number;
};

export default function Actor({ actorId }: Props) {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["actor", actorId],
        queryFn: async () => {
          const res = await fetch(`/api/actors/${actorId}`, {
            cache: "no-cache",
          });
          const data = await res.json();

          return data as TActorProfileRaw;
        },
      },
      {
        queryKey: ["videos-actor", actorId],
        queryFn: async () => {
          const res = await fetch(`/api/actors/${actorId}/videos`, {
            cache: "no-cache",
          });

          const data = await res.json();

          return data as {
            items: TVideoItem[];
            APP_DOMAIN_CDN_IMAGE: string;
          };
        },
      },
    ],
  });

  console.log(queries[1].data);

  return (
    <>
      {queries[0].data ? (
        <Breadcrumb
          breadCrumb={[
            { name: `Diễn viên ${queries[0].data.name}`, isCurrent: true },
          ]}
        />
      ) : (
        <Skeleton className="h-6" />
      )}
      <div className="flex md:flex-row flex-col gap-4">
        <div className="space-y-4">
          {queries[0].data ? (
            <>
              <div className="relative aspect-[2/3] w-full md:w-[300px]">
                <Image
                  unoptimized
                  src={
                    queries[0].data.avatar ||
                    (queries[0].data.gender === "Nam"
                      ? "/placeholder-actor-male.jpg"
                      : "/placeholder-actor-female.jpg")
                  }
                  alt="Profile"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="_text-primary text-3xl">{queries[0].data.name}</h3>
              <div className="space-y-1">
                <p className="">Giới tính: {queries[0].data.gender}</p>
                <p className="">Ngày sinh: {queries[0].data.birthday}</p>
              </div>
            </>
          ) : (
            <>
              <Skeleton className="aspect-[2/3] w-full md:w-[300px]" />
              <Skeleton className="h-8" />
              <div className="space-y-1">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
              </div>
            </>
          )}
        </div>
        <div className="md:flex-1">
          <div className="grid grid-cols-12 gap-4 h-auto">
            {queries[1].data
              ? queries[1].data.items.map((video) => (
                  <VideoCard
                    key={video._id}
                    video={video}
                    imageType="poster"
                    appDomainCdnImage={
                      queries[1].data?.APP_DOMAIN_CDN_IMAGE || ""
                    }
                    className="col-span-6 sm:col-span-4 md:col-span-3 _bg-layout"
                  />
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <VideoCardSkeleton
                    key={index}
                    imageType="poster"
                    className="col-span-6 sm:col-span-4 md:col-span-3"
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
