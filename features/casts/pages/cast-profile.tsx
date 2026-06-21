'use client';

import { useEffect, useState } from "react";
import { castsApi } from "../api";
import Breadcrumb from "@/components/breadcrumb";
import CastProfile from "../components/cast-profile";
import CastVideos from "@/features/videos/components/cast-videos";


type CastProfilePageProps = {
  id: string;
}

export default function CastProfilePage({ id }: CastProfilePageProps) {
  const [details, setDetails] = useState<TCastProfile | null>(null);
  useEffect(() => {
    castsApi.getDetails(id).then((data) => setDetails(data))
  }, [id]);


  console.log(details)
  if (!details) return null;
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