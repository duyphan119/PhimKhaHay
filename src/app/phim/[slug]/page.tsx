import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import VideoDetails from "@/pages/video-details";
import { Metadata } from "next";

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
      data: { seoOnPage },
    } = await videoApi.fetchVideoDetailsData(slug);
    return getSeo(seoOnPage);
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay",
  };
};

export default async function Page({ params }: VideoDetailsProps) {
  const { slug } = await params;

  return <VideoDetails slug={slug} />;
}
