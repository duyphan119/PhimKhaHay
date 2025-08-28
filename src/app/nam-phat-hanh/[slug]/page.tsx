import yearApi from "@/features/years/data";
import { getSeo } from "@/lib/utils";
import VideosYear from "@/pages/videos-year";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TVideosFilter, "year">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: year } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage, APP_DOMAIN_CDN_IMAGE },
    } = await yearApi.fetchVideosData(year, awaitedSearchParams);
    return getSeo(seoOnPage, APP_DOMAIN_CDN_IMAGE);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: year } = await params;
  const awaitedSearchParams = await searchParams;

  return <VideosYear year={year} searchParams={awaitedSearchParams} />;
}
