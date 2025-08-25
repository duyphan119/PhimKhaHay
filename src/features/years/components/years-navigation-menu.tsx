"use client";

import { useCommonData } from "@/components/providers/common-data-provider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function YearsNavigationMenu() {
  const { years } = useCommonData();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Năm</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <div className="grid max-h-[70vh] grid-cols-6 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
                {years.map(({ year }) => (
                  <Link
                    key={year}
                    href={`/nam-phat-hanh/${year}`}
                    className="p-2 col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-1 text-neutral-200 _hover-underline hover:_text-primary"
                  >
                    {year}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
