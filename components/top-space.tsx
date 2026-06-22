"use client";

import { usePathname } from "next/navigation";

export default function TopSpace() {
  const pathname = usePathname();
  return (
    <div className={pathname === '/' ? "" : "h-0 sm:h-16"} />
  )
}
