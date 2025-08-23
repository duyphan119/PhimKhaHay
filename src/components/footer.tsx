"use client";

import { typeList } from "@/features/typelist/data";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      <div className="_container p-4 space-y-4">
        <h1 className="text-2xl font-bold">PhimKhaHay</h1>
        <p className="">
          PhimKhaHay - Trang xem phim online chất lượng cao miễn phí Vietsub,
          thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu
          rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung
          Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng
          phim trực tuyến hay nhất {new Date().getFullYear()} chất lượng 4K!
        </p>
        <Separator />
        <div className="flex flex-wrap gap-4">
          {typeList.map((item) => (
            <Link
              key={item.slug}
              href={`/danh-sach?typelist=${item.slug}`}
              className="justify-start hover:text-primary hover:underline hover:underline-offset-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Separator />
        <p className="">© 2025 PhimKhaHay. All rights reserved.</p>
      </div>
    </footer>
  );
}
