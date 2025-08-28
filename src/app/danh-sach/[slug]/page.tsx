import { TypeList } from "@/features/typelist/data";
import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import Videos from "@/pages/videos";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: TypeList;
  }>;
  searchParams: Promise<TVideosFilter>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await videoApi.fetchVideosData(typelist, awaitedSearchParams);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;

  return <Videos typelist={typelist} searchParams={awaitedSearchParams} />;
}
