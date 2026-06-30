"use client";

import { videosApi } from "@/features/videos/api";
import VideoImage from "@/features/videos/components/video-image";
import { ArrowRight, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {};

export default function HeaderSearch({ }: Props) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [dataVideos, setDataVideos] = useState<{ items: TMovieItem[]; params: TParams } | null>(null);

  const divRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  const queryKeyword = searchParams.get("keyword") || "";

  const [text] = useDebounce([keyword], 234);

  useEffect(() => {
    if (!text) setDataVideos(null);
    else {
      const fetchVideos = async () => {
        try {
          const res = await videosApi.search({
            keyword: text,
            page: "1",
            limit: "12",
          });

          setDataVideos(res);
        } catch (error) {
          setDataVideos(null);
          console.error("Error fetching videos:", error);
        }
      };

      fetchVideos();
    }
  }, [text]);

  useEffect(() => {
    setKeyword(pathname.includes("tim-kiem") ? "" : queryKeyword);
  }, [queryKeyword, pathname]);

  useEffect(() => {
    setOpen(dataVideos ? true : false);
  }, [dataVideos]);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Nếu click ngoài div
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div ref={divRef} className="static">
      <form
        action={`/tim-kiem?keyword=${keyword}`}
        method="get"
        className="flex items-center bg-background/50 border border-muted rounded-sm px-1.5 gap-1"
      >
        <HugeiconsIcon icon={Search} color="#fff" size={14} />
        <input
          type="search"
          placeholder="Tìm tên phim"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          className="flex-1 outline-none py-2 w-full bg-transparent"
        />
      </form>

      {open && dataVideos ? (
        <>
          <div onClick={handleClose} className="fixed top-12 bottom-0 inset-x-0 bg-black/50"></div>
          <div className="absolute right-8 left-8 sm:left-1/5 md:left-1/4 lg:left-1/3 xl:left-1/2 top-12 bg-background/80 shadow rounded-lg">
            <div className="max-h-[50vh] w-full overflow-y-auto no-scrollbar space-y-2 py-2">
              {dataVideos.items.map((videoItem) => (
                <div
                  key={videoItem._id}
                  className="flex gap-2"
                  onClick={handleClose}
                >
                  <Link
                    href={`/phim/${videoItem.slug}`}
                    title={videoItem.name}
                    className="w-1/3 md:w-1/4 aspect-video relative shrink-0"
                  >
                    <VideoImage src={videoItem.poster_url} alt={videoItem.name} />
                  </Link>
                  <div className="text-foreground w-2/3 md:w-3/4">
                    <Link
                      href={`/phim/${videoItem.slug}`}
                      className="hover:text-destructive transition-colors duration-200 line-clamp-3"
                    >
                      {videoItem.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {dataVideos.params.pagination.totalItems > dataVideos.params.pagination.totalItemsPerPage ? (
              <div className="">
                <Link
                  href={`/tim-kiem?keyword=${keyword}&page=2`}
                  title="Xem thêm kết quả"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-1 hover:text-destructive transition-colors duration-200 p-4"
                >
                  Xem thêm
                  <HugeiconsIcon icon={ArrowRight} size={14} />
                </Link>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
