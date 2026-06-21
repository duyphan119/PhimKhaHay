"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { categories } from "@/features/categories/api";
import { countries } from "@/features/countries/api";
import { typelist } from "@/features/typelist/api";
import { getYears } from "@/lib/utils";
import {
  DashboardSquare01Icon,
  Earth,
  Fire,
  Home,
  Menu,
  MoleculesIcon,
  Video,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        onClick={(e) => {
          // chặn warning Blocked aria-hidden on an element...
          e.currentTarget.blur();
        }}
        className="py-4 cursor-pointer outline-0"
      >
        <HugeiconsIcon icon={Menu} color="#fff" size={20} />
      </DrawerTrigger>
      <DrawerContent className="bg-muted">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Navigation Menu</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto">
          <Link
            href="/"
            onClick={handleClose}
            className="flex items-center gap-1.5 px-2 py-2 rounded-sm text-foreground hover:text-primary overflow-hidden transition-all duration-200 hover:bg-linear-to-r hover:from-primary/20 hover:to-transparent relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-1 before:rounded-full before:bg-primary before:opacity-0 before:transition-all before:duration-100 hover:before:h-full hover:before:opacity-100"
          >
            <HugeiconsIcon icon={Home} size={18} />
            Trang chủ
          </Link>
          <Link
            href="/phim-hot"
            onClick={handleClose}
            className="flex items-center gap-1.5 px-2 py-2 rounded-sm text-foreground hover:text-primary overflow-hidden transition-all duration-200 hover:bg-linear-to-r hover:from-primary/20 hover:to-transparent relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-1 before:rounded-full before:bg-primary before:opacity-0 before:transition-all before:duration-100 hover:before:h-full hover:before:opacity-100"
          >
            <HugeiconsIcon icon={Fire} size={18} />
            Phim hot
          </Link>
          <Accordion type="multiple">
            <AccordionItem value="type_list" className="">
              <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Video} size={18} /> Loại phim
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2">
                  {typelist.map((item) => (
                    <Link
                      key={item.name}
                      href={`/danh-sach/${item.slug}`}
                      onClick={handleClose}
                      className="no-underline p-1 hover:text-primary transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="the-loai" className="">
              <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                <div className="flex items-center gap-2"><HugeiconsIcon icon={DashboardSquare01Icon} size={18} /> Thể
                  loại</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/the-loai/${category.slug}`}
                      onClick={handleClose}
                      className="no-underline p-1 hover:text-primary transition-colors duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quoc-gia" className="">
              <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                <div className="flex items-center gap-2"><HugeiconsIcon icon={Earth} size={18} /> Quốc gia</div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2">
                  {countries.map((country) => (
                    <Link
                      key={country.name}
                      href={`/quoc-gia/${country.slug}`}
                      onClick={handleClose}
                      className="no-underline p-1 hover:text-primary transition-colors duration-200"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nam" className="">
              <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={MoleculesIcon} size={18} /> Năm
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3">
                  {getYears().map((year) => (
                    <Link
                      key={year}
                      href={`/nam-phat-hanh/${year}`}
                      onClick={handleClose}
                      className="no-underline p-1 hover:text-primary transition-colors duration-200"
                    >
                      {year}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
