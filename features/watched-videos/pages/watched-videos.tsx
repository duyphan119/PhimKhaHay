"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import VideoCard from "@/features/videos/components/video-card";
import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { watchedVideosApi } from "../api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import VideosPagination from "@/features/videos/components/videos-pagination";

type WatchedVideosPageProps = {
  searchParams: {
    page: string;
    limit: string;
  }
}

export default function WatchedVideosPage({ searchParams }: WatchedVideosPageProps) {
  const router = useRouter();
  const [data, setData] = useState<{ items: TWatchedVideo[]; pagination?: TPagination }>();

  useEffect(() => {
    (() => {
      const data = watchedVideosApi.getAll(searchParams);
      setData(data);
    })()
  }, [searchParams])

  const handleDelete = (item: TWatchedVideo) => {
    watchedVideosApi.delete(item.slug);

    router.refresh()
  }

  return (
    <div className="_container space-y-4 py-4">
      <Breadcrumb
        items={[{ isCurrent: true, name: 'Lịch sử xem', position: 1 }]}
      />
      {(!data || data.items.length === 0) ? <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
        <div>
          <h2 className="text-xl font-semibold">
            Chưa có phim nào trong lịch sử xem
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Khám phá những bộ phim hấp dẫn và bắt đầu xem ngay.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/phim-hot" className={buttonVariants({})}>
            Khám phá phim hot
          </Link>

          <Link
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Về trang chủ
          </Link>
        </div>
      </div> : <>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items.map((videoItem, index) => (
            <div key={videoItem.slug} className="col-span-1">
              <VideoCard
                videoItem={{
                  ...videoItem,
                  episode_current: `Tập ${videoItem.episodeName}`
                }}
                href={`/xem-phim/${videoItem.slug}/${videoItem.serverIndex}/${videoItem.episodeName}`}
                aspectType="thumbnail"
              />
              <Button onClick={() => handleDelete(videoItem)} variant="destructive" className="mt-2">
                <HugeiconsIcon icon={Trash2} />
                Xóa</Button>
            </div>
          ))}
        </div>
        {data.pagination ? <div className="">
          <VideosPagination
            pagination={data.pagination}
            searchParams={searchParams}
          />
        </div> : null}
      </>}

    </div>
  )
}