"use client";

import { useCommonData } from "@/components/providers/common-data-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeList, typeList } from "@/features/typelist/data";
import { ArrowRightIcon, FilterIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";

type Query = {
  country?: string;
  category?: string;
  year?: number;
  sort_field?: string;
  sort_type?: string;
};

type VideosTypelistFilterProps = {
  searchParams: TVideosFilter;
  typelist: TypeList;
};

export default function VideosTypelistFilter({
  searchParams,
  typelist: defaultTypelist,
}: VideosTypelistFilterProps) {
  const router = useRouter();

  const { categories, countries } = useCommonData();

  const currentYear = new Date().getFullYear();

  const [query, setQuery] = useState<Query>({});
  const [typelist, setTypelist] = useState<TypeList>(defaultTypelist);

  useEffect(() => {
    setQuery({
      ...(searchParams.category ? { category: searchParams.category } : {}),
      ...(searchParams.country ? { country: searchParams.country } : {}),
      ...(searchParams.year ? { year: Number(searchParams.year) } : {}),
      ...(searchParams.sort_field
        ? { sort_field: searchParams.sort_field }
        : {}),
      ...(searchParams.sort_type ? { sort_type: searchParams.sort_type } : {}),
    });
  }, [searchParams]);

  const categoriesSlug = useMemo(
    () => query?.category?.split(",") || [],
    [query]
  );
  const countriesSlug = useMemo(
    () => query?.country?.split(",") || [],
    [query]
  );

  const handleFilter = () => {
    router.push(`/danh-sach/${typelist}?${queryString.stringify(query)}`);
  };

  const handleClick = (key: keyof Query, value: number | string) => {
    // My logic
    // if (!query[key]) {
    //   setQuery({
    //     ...query,
    //     [key]: value,
    //   });
    // } else {
    //   if (["country", "category"].includes(key)) {
    //     if ((query[key] as string).includes(value as string)) {
    //       setQuery({
    //         ...query,
    //         [key]: (query[key] as string)
    //           .split(",")
    //           .filter((item) => item !== value)
    //           .join(","),
    //       });
    //     } else {
    //       setQuery({
    //         ...query,
    //         [key]: `${query[key]},${value}`,
    //       });
    //     }
    //   } else {
    //     if (query[key] === value) {
    //       setQuery({
    //         ...query,
    //         [key]: undefined,
    //       });
    //     } else {
    //       setQuery({
    //         ...query,
    //         [key]: value,
    //       });
    //     }
    //   }
    // }

    // ChatGPT logic
    let newValue: string | number | undefined = value;

    if (["country", "category"].includes(key)) {
      const current = (query[key] as string) || "";
      const values = current.split(",").filter(Boolean);

      newValue = values.includes(value as string)
        ? values.filter((v) => v !== value).join(",") || undefined
        : [...values, value].join(",");
    } else {
      newValue = query[key] === value ? undefined : value;
    }

    setQuery({ ...query, [key]: newValue });
  };

  console.log(query);
  return (
    <Drawer direction="top">
      <DrawerTrigger className={buttonVariants({ variant: "filter" })}>
        <FilterIcon /> Bộ lọc
      </DrawerTrigger>
      <DrawerContent className="!top-0 !bottom-auto">
        <DrawerHeader>
          <DrawerTitle>Bộ lọc</DrawerTitle>
        </DrawerHeader>
        <ScrollArea>
          <div className="px-4 space-y-2 max-h-[70vh]">
            <div className="flex items-start">
              <p className="flex-shrink-0 text-sm pt-1 w-20">Kiểu phim:</p>
              <div className="flex flex-wrap items-center gap-2">
                {typeList.map(({ name, slug }) => {
                  const isActive = typelist === slug;
                  return (
                    <Button
                      key={slug}
                      size="sm"
                      variant={isActive ? "outlinePrimary" : "outline"}
                      onClick={() => {
                        setTypelist(slug as TypeList);
                      }}
                    >
                      {name}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-start">
              <p className="flex-shrink-0 text-sm pt-1 w-20">Quốc gia:</p>

              <div className="flex flex-wrap items-center gap-2">
                {countries.map(({ name, slug }) => {
                  const isActive = countriesSlug.includes(slug);
                  return (
                    <Button
                      key={slug}
                      size="sm"
                      variant={isActive ? "outlinePrimary" : "outline"}
                      onClick={() => {
                        handleClick("country", slug);
                      }}
                    >
                      {name}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-start">
              <p className="flex-shrink-0 text-sm pt-1 w-20">Thể loại:</p>

              <div className="flex flex-wrap items-center gap-2">
                {categories.map(({ name, slug }) => {
                  const isActive = categoriesSlug.includes(slug);
                  return (
                    <Button
                      key={slug}
                      size="sm"
                      variant={isActive ? "outlinePrimary" : "outline"}
                      onClick={() => {
                        handleClick("category", slug);
                      }}
                    >
                      {name}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-start">
              <p className="flex-shrink-0 text-sm pt-1 w-20">Năm:</p>

              <div className="flex flex-wrap items-center gap-2">
                {new Array(currentYear - 1969).fill("").map((_, index) => {
                  const value = currentYear - index;
                  const isActive = query.year === value;
                  return (
                    <Button
                      key={index}
                      size="sm"
                      variant={isActive ? "outlinePrimary" : "outline"}
                      onClick={() => {
                        handleClick("year", value);
                      }}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
        <DrawerFooter>
          <div className="flex items-center gap-2">
            <DrawerTrigger
              onClick={handleFilter}
              className={buttonVariants({ size: "sm" })}
            >
              Lọc kết quả <ArrowRightIcon className="size-3" />
            </DrawerTrigger>
            <DrawerTrigger
              className={buttonVariants({ size: "sm", variant: "destructive" })}
            >
              <XIcon className="size-3" />
              Đóng
            </DrawerTrigger>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
