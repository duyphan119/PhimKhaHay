import WatchedVideosPage from "@/features/watched-videos/pages/watched-videos";
import { Metadata } from "next"



type PageProps = {
  searchParams: Promise<{
    page: string;
    limit: string;
  }>
}

export const generateMetadata = async ({ searchParams }: PageProps): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  return {
    title: `phimkhahay | Lịch sử xem${awaitedSearchParams.page ? " | Trang 1" : ""}`,
    description: `Danh sách phim đã xem${awaitedSearchParams.page ? " trang 1" : ""}`
  }
}

export default async function Page({ searchParams }: PageProps) {
  const awaitedSearchParams = await searchParams;
  return (
    <WatchedVideosPage searchParams={awaitedSearchParams} />
  )
}