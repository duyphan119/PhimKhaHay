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
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { typeList } from "@/features/typelist/data";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useCommonData } from "./providers/common-data-provider";

export default function DrawerMenu() {
  const { categories, countries, years } = useCommonData();
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible(false);
  };
  return (
    <Drawer direction="left" open={visible} onOpenChange={setVisible}>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="md:w-1/2 w-3/4 sm:w-2/3">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <ScrollArea className="py-2 h-full">
          <div className="space-y-4">
            {typeList.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                href={`/danh-sach?typelist=${item.slug}`}
                onClick={handleClick}
                className="block px-4 py-2"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/da-xem" className="block px-4 py-2">
              Đã xem
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="country">
                <AccordionTrigger>Quốc gia</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 bg-neutral-900">
                    {countries.map((country) => (
                      <Link
                        key={country.name}
                        href={`/quoc-gia/${country.slug}`}
                        onClick={handleClick}
                        className="col-span-1 text-sm font-medium px-4 py-2 hover:_text-primary"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="category">
                <AccordionTrigger>Thể loại</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 bg-neutral-900">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/the-loai/${category.slug}`}
                        onClick={handleClick}
                        className="col-span-1 text-sm font-medium px-4 py-2 hover:text-lime-400"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="year">
                <AccordionTrigger>Năm</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 bg-neutral-900">
                    {years.map(({ year }) => (
                      <Link
                        key={year}
                        href={`/nam-phat-hanh/${year}`}
                        onClick={handleClick}
                        className="col-span-1 text-sm font-medium px-4 py-2 hover:_text-primary"
                      >
                        {year}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
