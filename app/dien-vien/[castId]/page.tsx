import Breadcrumb from "@/components/breadcrumb";
import CastProfile from "@/components/cast-profile";
import CastVideos from "@/components/cast-videos";
import { getCastDetails } from "@/lib/cast";
import { TMDB_IMAGE_DOMAIN } from "@/lib/constants";
import {
  Birthday,
  Female02Icon,
  Hospital,
  Male02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ castId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;

  const castDetails = await getCastDetails(awaitedParams.castId);
  if (!castDetails) return { title: "KDPhim | Diễn viên", description: "Thông tin và phim của diễn viên" };

  return {
    title: `KDPhim | Diễn viên ${castDetails.name}`,
    description: `Thông tin và phim của diễn viên ${castDetails.name}`,
  };
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const castDetails = await getCastDetails(awaitedParams.castId);
  if (!castDetails) return null;

  return (
    <div className="_container py-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <Breadcrumb
            items={[
              {
                isCurrent: true,
                name: castDetails.name,
                position: 1,
              },
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-1">
          <CastProfile {...castDetails} />
        </div>
        <CastVideos castId={awaitedParams.castId} />
      </div>
    </div>
  );
}
