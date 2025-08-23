"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Country } from "@/features/countries/data";
import Link from "next/link";

type TypeListNavigationMenuProps = {
  countries: Country[];
  name: string;
  slug: string;
};

export default function TypeListNavigationMenu({
  countries,
  name,
  slug,
}: TypeListNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-3 lg:w-[600px] sm:w-[300px] w-screen bg-neutral-900">
              {countries.map((country) => (
                <Link
                  key={country.name}
                  href={`/danh-sach?typelist=${slug}&country=${country.slug}`}
                  className="p-2 col-span-3 sm:col-span-2 lg:col-span-1 text-neutral-200 hover:text-lime-400"
                >
                  {name} {country.name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
