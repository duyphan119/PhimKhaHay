"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type VideosPaginationProps = {
  pagination: TPagination;
  className?: string;
  searchParams?: TPaginationFilter;
};

export default function VideosPagination({
  pagination,
  className = "mt-4",
  searchParams,
}: VideosPaginationProps) {
  const totalPages = Math.ceil(
    pagination.totalItems / pagination.totalItemsPerPage
  );

  const pathname = usePathname();
  const router = useRouter();
  const getHref = (page: number) => {
    return `${pathname}?${qs.stringify({
      ...searchParams,
      page: page,
    })}`;
  };

  const [page, setPage] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
      router.push(getHref(page));
    }
  };

  useEffect(() => {
    setPage(pagination.currentPage);
  }, [pagination.currentPage]);

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={pagination.currentPage === 1}
            href={getHref(pagination.currentPage - 1)}
          />
        </PaginationItem>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-1 rounded-3xl h-12 px-4 bg-secondary"
        >
          Trang
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) =>
              setPage(Math.max(1, Math.min(Number(e.target.value), totalPages)))
            }
            className="w-14 px-1.5 py-0.5 bg-transparent outline-none border border-neutral-500 rounded-md h-8"
          />
          &nbsp;/&nbsp;{totalPages}
        </form>
        {/* {Array(pagination.currentPage > 2 ? 5 : 7)
          .fill(pagination.currentPage - 2)
          .map((value, index) => {
            const page = value + index;
            const isActive = page === pagination.currentPage;
            if (page < 1 || page > totalPages) return null;
            return (
              <PaginationItem key={index}>
                <PaginationLink isActive={isActive} href={getHref(page)}>
                  {value + index}
                </PaginationLink>
              </PaginationItem>
            );
          })} */}
        <PaginationItem>
          <PaginationNext
            disabled={pagination.currentPage === totalPages}
            href={getHref(pagination.currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
