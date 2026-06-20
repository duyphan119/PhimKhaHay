"use client";

import { searchVideos } from "@/lib/video";
import { ArrowRight, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {};

export default function HeaderSearch({ }: Props) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [dataVideos, setDataVideos] = useState<TApiResponse | null>(null);

  const divRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  const queryKeyword = searchParams.get("keyword") || "";

  const [text] = useDebounce([keyword], 234);

  useEffect(() => {
    if (!text) setDataVideos(null);
    else {
      const fetchVideos = async () => {
        try {
          const res = await searchVideos(text, {
            page: "1",
            limit: "24",
          });

          setDataVideos(res);
        } catch (error) {
          setDataVideos({
            data: null as any,
            msg: "",
            status: false,
          });
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
    setOpen(dataVideos?.data ? true : false);
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
        className="flex items-center border border-muted rounded-sm px-1.5 gap-1"
      >
        <HugeiconsIcon icon={Search} color="#fff" size={14} />
        <input
          type="search"
          placeholder="Tìm tên phim"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setOpen(true)}
          className="flex-1 outline-none py-2 w-full bg-background"
        />
      </form>
      {open && dataVideos?.data?.items ? (
        <div className="absolute inset-x-0 top-full bg-muted shadow">
          <div className="max-h-[50vh] w-screen overflow-y-auto no-scrollbar space-y-2 py-2">
            {dataVideos.data.items.map((videoItem) => (
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
                  <Image
                    unoptimized
                    src={`https://phimapi.com/image.php?url=${dataVideos.data.APP_DOMAIN_CDN_IMAGE}/${videoItem.thumb_url}`}
                    alt="img1"
                    fill={true}
                    sizes="(max-width: 1200px) 50vw, 100vw"
                    loading="eager"
                    className="rounded-sm"
                  />
                </Link>
                <div className="text-foreground">
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
          {dataVideos.data.params.pagination.totalPages > 1 ? (
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
      ) : null}
    </div>
  );
}
