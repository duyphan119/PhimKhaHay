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

export default function CategoriesNavigationMenu() {
  const { categories } = useCommonData();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <div className="grid max-h-[70vh] grid-cols-4 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/the-loai/${category.slug}`}
                    className="p-2 col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-1  _hover-underline hover:_text-primary"
                  >
                    {category.name}
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
