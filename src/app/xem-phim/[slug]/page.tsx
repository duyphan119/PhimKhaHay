import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import VideoStreaming from "@/pages/video-streaming";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    ep: string;
    ser: string;
  }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const {
      data: { item, seoOnPage },
    } = await videoApi.fetchVideoDetailsData(slug);
    const { ep, ser } = await searchParams;
    if (item) {
      const episode = item.episodes[Number(ser) || 0];
      const serverDataItem =
        episode?.server_data?.find(({ slug }) => slug === ep) ||
        episode?.server_data?.[0];
      return getSeo({
        ...seoOnPage,
        titleHead: `PhimKhaHay ${
          episode ? `| ${serverDataItem.name} |` : "|"
        } ${item.name}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return {
    title: "PhimKhaHay",
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  return <VideoStreaming slug={slug} searchParams={awaitedSearchParams} />;
}
