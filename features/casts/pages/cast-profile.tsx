'use client';

import { useEffect, useState } from "react";
import { castsApi } from "../api";
import Breadcrumb from "@/components/breadcrumb";
import CastProfile from "../components/cast-profile";
import CastVideos from "@/features/videos/components/cast-videos";
import { Button } from "@/components/ui/button";


type CastProfilePageProps = {
  id: string;
}

export default function CastProfilePage({ id }: CastProfilePageProps) {
  const [details, setDetails] = useState<TCastProfile | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    castsApi.getDetails(id).then((data) => setDetails(data)).finally(() => setIsFetched(true))
  }, [id]);

  if (!isFetched) return null;

  if (!details) return <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="max-w-md rounded-2xl border bg-secondary p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-semibold">
        Không thể tải dữ liệu
      </h3>

      <p className="text-sm text-muted-foreground">
        Có thể nguồn dữ liệu hiện đang bị chặn bởi nhà mạng hoặc khu vực của
        bạn. Vui lòng bật <span className="font-medium">1.1.1.1 WARP</span> rồi
        tải lại trang để tiếp tục sử dụng.
      </p>

      <Button
        onClick={() => window.location.reload()}
        className="mt-4"
      >
        Tải lại trang
      </Button>
    </div>
  </div>;
  return (
    <div className="_container py-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <Breadcrumb
            items={[
              {
                isCurrent: true,
                name: details.name,
                position: 1,
              },
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-1">
          <CastProfile {...details} />
        </div>
        <CastVideos cast={details} />
      </div>
    </div>
  )
}