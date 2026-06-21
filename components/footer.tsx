import { typelist } from "@/features/typelist/api";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Khám phá",
    items: [
      { name: "Trang chủ", href: "/" },
      { name: "Phim hot", href: "/phim-hot" },
    ],
  },
  {
    title: "Loại phim",
    items: typelist.map(({ name, slug }) => ({
      name,
      href: `/danh-sach/${slug}`,
    })),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur">
      <div className="_container py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          {/* Left */}
          <div className="space-y-5">
            <Link
              href="/"
              title="Đi tới trang chủ"
              className="relative block h-10 aspect-3/1"
            >
              <Image
                src="/images/logo.png"
                alt="phimkhahay Logo"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="90px"
              />
            </Link>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              phimkhahay là nền tảng xem phim online chất lượng cao với kho phim đa
              dạng: phim lẻ, phim bộ, anime, TV Shows và nhiều nội dung cập nhật
              mỗi ngày.
            </p>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Full HD
              </div>

              <div className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Vietsub
              </div>

              <div className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                Cập nhật nhanh
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-border/60 bg-muted/20 p-5"
              >
                <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
                  {group.title}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-colors duration-200 group-hover:bg-primary" />

                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 gap-3 border-t border-border pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="text-center">© 2026 phimkhahay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
