"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useRef } from "react";
import { Button, buttonVariants } from "./ui/button";

type Props = {
  pagination: TPagination;
  searchParams?: Record<string, string>;
};

export default function VideosPagination({
  pagination: { currentPage, totalPages },
  searchParams,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const getHref = (page: number) => {
    const queryParams = queryString.stringify({
      ...searchParams,
      page,
    });
    return `${pathname}?${queryParams}`;
  };

  useEffect(() => {
    formRef.current?.reset();
  }, [searchParams]);

  if (totalPages === 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage === 1 ? null : (
        <Link href={getHref(1)} className={buttonVariants({})}>
          <HugeiconsIcon icon={ArrowLeft01Icon} />
          Trang trước
        </Link>
      )}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const newPage = document.getElementById("page") as HTMLInputElement;
          router.push(getHref(Number(newPage.value)));
        }}
      >
        <input
          type="number"
          min={1}
          max={totalPages}
          id="page"
          placeholder={currentPage.toString()}
          className="border border-foreground rounded-md h-7 w-12 text-sm text-right px-1"
        />
      </form>
      <div className="text-sm">/{totalPages}</div>
      {currentPage === totalPages ? null : (
        <Link href={getHref(currentPage + 1)} className={buttonVariants({})}>
          Trang tiếp theo
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Link>
      )}
    </div>
  );
}
