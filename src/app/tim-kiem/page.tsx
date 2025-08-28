import videoApi from "@/features/videos/data";
import { getSeo } from "@/lib/utils";
import Search from "@/components/pages/search";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<TPaginationFilter & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const { keyword, ...awaitedSearchParams } = await searchParams;
  try {
    const {
      data: { seoOnPage },
    } = await videoApi.searchVideos(keyword, {
      ...awaitedSearchParams,
      limit: "30",
    });

    return getSeo(seoOnPage);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Tìm kiếm" };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  return <Search searchParams={awaitedSearchParams} />;
}
