"use client";

import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import HeaderMenu from "./header-menu";
import HeaderSearch from "./header-search";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


export default function Header() {
  const pathname = usePathname();

  const [isBackgroundTransparent, setIsBackgroundTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/" && window.scrollY === 0) {
        setIsBackgroundTransparent(true);
      } else {
        setIsBackgroundTransparent(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <header className={cn(pathname === "/" ? "sticky sm:fixed border-b sm:border-none" : "sticky border-b", "top-0 inset-x-0 z-10 bg-background", isBackgroundTransparent ? "sm:bg-transparent" : "")}>
      <div className="flex justify-between items-center gap-2 h-16 _container relative">
        <div className="flex items-center gap-2">
          <HeaderMenu />
          <Link
            href="/"
            title="Đi tới trang chủ"
            className="aspect-3/1 block relative h-10"
          >
            <Image
              src={"/images/logo.png"}
              fill={true}
              alt="Logo"
              sizes="(max-width: 1200px) 1536px, 20vw"
              loading="eager"
              unoptimized
              className="object-cover"
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
