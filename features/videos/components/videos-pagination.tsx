"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useRef } from "react";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  pagination: TPagination;
  searchParams?: Record<string, string>;
};

export default function VideosPagination({
  pagination: { currentPage, totalItems, totalItemsPerPage },
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

  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  useEffect(() => {
    formRef.current?.reset();
  }, [searchParams]);

  if (totalPages === 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-background px-4 py-2">
      <Link
        href={getHref(Math.max(1, currentPage - 1))}
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
      </Link>

      <div className="text-sm text-muted-foreground">
        Trang <span className="font-semibold text-foreground">{currentPage}</span>
        <span className="mx-1">/</span>
        <span>{totalPages}</span>
      </div>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const page = Number(formData.get("page"));

          if (!page || page < 1 || page > totalPages) return;

          router.push(getHref(page));
        }}
        className="flex items-center gap-2"
      >
        <input
          name="page"
          type="number"
          min={1}
          max={totalPages}
          placeholder={currentPage.toString()}
          className="h-9 w-16 rounded-md border bg-background px-2 text-center text-sm"
        />

        <button
          type="submit"
          className={buttonVariants({
            size: "sm",
          })}
        >
          Đi
        </button>
      </form>

      <Link
        href={getHref(Math.min(totalPages, currentPage + 1))}
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Link>
    </div>
  );
}
