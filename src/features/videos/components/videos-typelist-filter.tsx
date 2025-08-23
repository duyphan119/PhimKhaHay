"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { categories } from "@/features/categories/data";
import { countries } from "@/features/countries/data";
import { TypeList, typeList } from "@/features/typelist/data";
import { ArrowRightIcon, FilterIcon, SortDescIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { VideosParams } from "../data";
import queryString from "query-string";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

type Query = {
  country?: string;
  category?: string;
  year?: number;
  sort_field?: string;
  sort_type?: string;
};

type VideosTypelistFilterProps = {
  searchParams: VideosParams;
  typelist: TypeList;
};

export default function VideosTypelistFilter({
  searchParams,
  typelist: defaultTypelist,
}: VideosTypelistFilterProps) {
  const router = useRouter();

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
  return (
    <Accordion type="multiple" className="space-y-4">
      <AccordionItem value="filter">
        <AccordionTrigger
          hideIcon={true}
          className="bg-secondary hover:bg-secondary/70 rounded-md"
        >
          <FilterIcon className="size-4 mr-2" /> Bộ lọc
        </AccordionTrigger>
        <AccordionContent
          noPadding={true}
          className="bg-background p-4 rounded-md space-y-2"
        >
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
          <div className="flex items-center gap-2">
            <AccordionTrigger
              onClick={handleFilter}
              hideIcon={true}
              className={buttonVariants({ size: "sm" })}
            >
              Lọc kết quả <ArrowRightIcon className="size-3" />
            </AccordionTrigger>
            <AccordionTrigger
              hideIcon={true}
              className={buttonVariants({ size: "sm", variant: "destructive" })}
            >
              <XIcon className="size-3" />
              Đóng
            </AccordionTrigger>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sort">
        <AccordionTrigger
          hideIcon={true}
          className="bg-secondary hover:bg-secondary/70 rounded-md"
        >
          <SortDescIcon className="size-4 mr-2" /> Sắp xếp
        </AccordionTrigger>
        <AccordionContent
          noPadding={true}
          className="bg-background p-4 rounded-md space-y-2"
        >
          <div className="flex items-start">
            <p className="flex-shrink-0 text-sm pt-1 w-20">Xếp theo:</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  name: "Thời gian cập nhật",
                  value: "modified.time",
                },
                {
                  name: "Năm phát hành",
                  value: "year",
                },
              ].map(({ name, value }) => {
                const isActive = query.sort_field === value;
                return (
                  <Button
                    key={value}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("sort_field", value);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-start">
            <p className="flex-shrink-0 text-sm pt-1 w-20">Cách xếp:</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  name: "Giảm dần",
                  value: "desc",
                },
                {
                  name: "Tăng dần",
                  value: "asc",
                },
              ].map(({ name, value }) => {
                const isActive = query.sort_type === value;
                return (
                  <Button
                    key={value}
                    size="sm"
                    variant={isActive ? "outlinePrimary" : "outline"}
                    onClick={() => {
                      handleClick("sort_type", value);
                    }}
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AccordionTrigger
              onClick={handleFilter}
              hideIcon={true}
              className={buttonVariants({ size: "sm" })}
            >
              Sắp xếp kết quả <ArrowRightIcon className="size-3" />
            </AccordionTrigger>
            <AccordionTrigger
              hideIcon={true}
              className={buttonVariants({ size: "sm", variant: "destructive" })}
            >
              <XIcon className="size-3" />
              Đóng
            </AccordionTrigger>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
