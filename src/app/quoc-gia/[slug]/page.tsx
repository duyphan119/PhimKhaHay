import countryApi from "@/features/countries/data";
import { getSeo } from "@/lib/utils";
import VideosCountry from "@/components/pages/videos-country";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TVideosFilter, "country">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: typelist } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage },
    } = await countryApi.fetchVideosData(typelist, awaitedSearchParams);
    return getSeo(seoOnPage);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: countrySlug } = await params;
  const awaitedSearchParams = await searchParams;

  return (
    <VideosCountry
      countrySlug={countrySlug}
      searchParams={awaitedSearchParams}
    />
  );
}
