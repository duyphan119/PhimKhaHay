"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { typeList } from "../data";

export default function TypelistNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kiểu phim</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <div className="grid max-h-[70vh] grid-cols-3 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
                {typeList.map((item) => (
                  <Link
                    key={item.name}
                    href={`/the-loai/${item.slug}`}
                    className="p-2 col-span-1  _hover-underline hover:_text-primary"
                  >
                    {item.name}
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
