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

export default function CountriesNavigationMenu() {
  const { countries } = useCommonData();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea>
              <div className="grid max-h-[70vh] grid-cols-4 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
                {countries.map((country) => (
                  <Link
                    key={country.name}
                    href={`/quoc-gia/${country.slug}`}
                    className="p-2 col-span-6 sm:col-span-2 md:col-span-3 lg:col-span-1 text-neutral-200 _hover-underline hover:_text-primary"
                  >
                    {country.name}
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
