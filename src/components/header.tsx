"use client";

import CategoriesNavigationMenu from "@/features/categories/components/categories-navigation-menu";
import CountriesNavigationMenu from "@/features/countries/components/countries-navigation-menu";
import SearchForm from "@/features/videos/components/search-form";
import Link from "next/link";
import DrawerMenu from "./drawer-menu";
import YearsNavigationMenu from "@/features/years/components/years-navigation-menu";

export default function Header() {
  return (
    <header className="bg-background text-foreground sticky top-0 z-10">
      <div className="flex items-center gap-4 h-16 _container">
        <div className="block translate-y-1 lg:hidden">
          <DrawerMenu />
        </div>
        <div className="text-xl">
          <Link href="/">PhimKhaHay</Link>
        </div>
        <div className="hidden lg:flex items-center">
          <Link
            href="/danh-sach/phim-bo"
            className="block text-sm h-9 font-medium px-4 py-2"
          >
            Phim bộ
          </Link>
          <Link
            href="/danh-sach/phim-le"
            className="block text-sm h-9 font-medium px-4 py-2"
          >
            Phim lẻ
          </Link>
          <Link
            href="/da-xem"
            className="block text-sm h-9 font-medium px-4 py-2"
          >
            Đã xem
          </Link>
          <CategoriesNavigationMenu />
          <CountriesNavigationMenu />
          <YearsNavigationMenu />
        </div>
        <SearchForm />
      </div>
    </header>
  );
}
