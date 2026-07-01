import Breadcrumb from "@/components/breadcrumb";
import { castsApi } from "@/features/casts/api";
import CastProfile from "@/features/casts/components/cast-profile";
import CastProfilePage from "@/features/casts/pages/cast-profile";
import CastVideos from "@/features/videos/components/cast-videos";
import { Metadata } from "next";

type Props = {
  params: Promise<{ castId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;

  const castDetails = await castsApi.getDetails(awaitedParams.castId);
  if (!castDetails) return { title: "phimkhahay | Diễn viên", description: "Thông tin và phim của diễn viên" };

  return {
    title: `phimkhahay | Diễn viên ${castDetails.name}`,
    description: `Thông tin và phim của diễn viên ${castDetails.name}`,
  };
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  return <CastProfilePage id={awaitedParams.castId} />
}
