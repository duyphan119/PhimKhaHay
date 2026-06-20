"use client";

import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense } from "react";
import HeaderMenu from "./header-menu";
import HeaderSearch from "./header-search";
import Image from "next/image";

type Props = {};

export default function Header({ }: Props) {
  return (
    <header className="bg-background fixed top-0 inset-x-0 z-10">
      <div className="flex justify-between items-center gap-2 h-16 _container relative">
        <div className="flex items-center gap-2">
          <HeaderMenu />
          <Link
            href="/"
            title="Đi tới trang chủ"
            className="aspect-[1983/793] block relative h-12"
          >
            <Image
              src={"/images/logo.png"}
              fill={true}
              alt="Logo"
              sizes="(max-width: 1200px) 1983px, 20vw"
              loading="eager"
              unoptimized
            />
          </Link>
        </div>
        <Suspense
          fallback={<HugeiconsIcon icon={Search} color="#fff" size={14} />}
        >
          <HeaderSearch />
        </Suspense>
      </div>
    </header>
  );
}
