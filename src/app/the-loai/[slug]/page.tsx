import categoryApi from "@/features/categories/data";
import { getSeo } from "@/lib/utils";
import VideosCategory from "@/pages/videos-category";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Omit<TVideosFilter, "category">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: PageProps): Promise<Metadata> => {
  const { slug: categorySlug } = await params;
  const awaitedSearchParams = await searchParams;
  try {
    const {
      data: { seoOnPage },
    } = await categoryApi.fetchVideosData(categorySlug, awaitedSearchParams);
    return getSeo(seoOnPage);
  } catch (error) {
    console.log(error);
  }
  return { title: "PhimKhaHay | Danh sách phim" };
};
export default async function Page({ params, searchParams }: PageProps) {
  const { slug: categorySlug } = await params;
  const awaitedSearchParams = await searchParams;

  return (
    <VideosCategory
      categorySlug={categorySlug}
      searchParams={awaitedSearchParams}
    />
  );
}
