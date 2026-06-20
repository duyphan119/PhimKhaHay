"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { typeList, exampleCategories, exampleCountries } from "@/lib/constants";
import { getYears } from "@/lib/utils";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";

type FilterParams = {
  type_list?: string;
  category?: string[];
  country?: string[];
  year?: string;
  sort_field?: string;
  sort_type?: string;
};

type Props = {
  defaultParams?: TVideosParams & { keyword?: string };
  isSearchFilter?: boolean;
};

export default function VideosFilter({
  defaultParams = {},
  isSearchFilter = false,
}: Props) {
  const router = useRouter();

  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [value, setValue] = useState("");

  const select = (key: keyof FilterParams, value: string) => {
    if (key === "category" || key === "country") {
      const currentValues = filterParams[key] || [];
      if (currentValues.includes(value)) {
        setFilterParams((prev) => ({
          ...prev,
          [key]: currentValues.filter((v) => v !== value),
        }));
      } else {
        setFilterParams((prev) => ({
          ...prev,
          [key]: [...currentValues, value],
        }));
      }
    } else {
      setFilterParams((prev) => ({
        ...prev,
        [key]: prev[key] === value ? undefined : value,
      }));
    }
  };

  const handleFilter = () => {
    const {
      type_list,
      category = [],
      country = [],
      year,
      sort_field,
      sort_type,
    } = filterParams;

    const createQuery = (params: Record<string, string | undefined>) => {
      return new URLSearchParams(
        Object.entries(params).filter((entry): entry is [string, string] =>
          Boolean(entry[1]),
        ),
      ).toString();
    };

    const commonParams = {
      sort_field,
      sort_type,
    };

    let pathname = "";
    let query = "";
    if (isSearchFilter) {
      pathname = `/tim-kiem`;

      query = createQuery({
        keyword: defaultParams.keyword,
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    } else if (type_list) {
      pathname = `/danh-sach/${type_list}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        year,
        ...commonParams,
      });
    } else if (year) {
      pathname = `/nam/${year}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    } else if (category.length === 1 && country.length === 1) {
      pathname = `/the-loai/${category[0]}`;

      query = createQuery({
        country: country.join(","),
        year,
        ...commonParams,
      });
    } else if (category.length > country.length) {
      pathname = `/quoc-gia/${country[0]}`;

      query = createQuery({
        category: category.join(","),
        year,
        ...commonParams,
      });
    } else if (category.length < country.length) {
      pathname = `/the-loai/${category[0]}`;

      query = createQuery({
        country: country.join(","),
        year,
        ...commonParams,
      });
    } else {
      pathname = `/nam/${new Date().getFullYear()}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    }
    const url = `${pathname}${query ? `?${query}` : ""}`;
    router.push(url);
    setValue("");
  };

  const handleReset = () => {
    setFilterParams({
      ...(defaultParams.type_list
        ? { type_list: defaultParams.type_list }
        : undefined),
      ...(defaultParams.year ? { year: defaultParams.year } : undefined),
      ...(defaultParams.sort_field
        ? { sort_field: defaultParams.sort_field }
        : undefined),
      ...(defaultParams.sort_type
        ? { sort_type: defaultParams.sort_type }
        : undefined),
      ...(defaultParams.category
        ? { category: defaultParams.category.split(",") }
        : undefined),
      ...(defaultParams.country
        ? { country: defaultParams.country.split(",") }
        : undefined),
    });
  };

  useEffect(() => {
    handleReset();
  }, [defaultParams]);

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger className={buttonVariants({ variant: "outline", className: "justify-between" })}>
          <HugeiconsIcon icon={Filter} size={18} />
          Bộ lọc
        </AccordionTrigger>
        <AccordionContent className="py-4">
          <div className="grid grid-cols-12 gap-4 no-scrollbar overflow-y-auto">
            {isSearchFilter ? null : (
              <div className="col-span-12 bg-background rounded-md p-4">
                <div className="uppercase">Loại phim</div>
                <div className="mt-2 flex gap-2 items-center flex-wrap">
                  {typeList.map(({ name, slug }) => (
                    <Button
                      key={slug}
                      variant={
                        filterParams?.type_list === slug
                          ? "destructive"
                          : "outline"
                      }
                      size="xs"
                      onClick={() => select("type_list", slug)}
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="col-span-12 bg-background rounded-md p-4">
              <div className="uppercase">Thể loại</div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {exampleCategories.map(({ name, slug }) => (
                  <Button
                    key={slug}
                    variant={
                      filterParams?.category?.includes(slug)
                        ? "destructive"
                        : "outline"
                    }
                    size="xs"
                    onClick={() => select("category", slug)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="col-span-12 bg-background rounded-md p-4">
              <div className="uppercase">Quốc gia</div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {exampleCountries.map(({ name, slug }) => (
                  <Button
                    key={slug}
                    variant={
                      filterParams?.country?.includes(slug)
                        ? "destructive"
                        : "outline"
                    }
                    size="xs"
                    onClick={() => select("country", slug)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="col-span-12 bg-background rounded-md p-4">
              <div className="uppercase">Năm</div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {getYears().map((year) => (
                  <Button
                    key={year}
                    variant={
                      filterParams?.year === year + ""
                        ? "destructive"
                        : "outline"
                    }
                    size="xs"
                    onClick={() => select("year", year + "")}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
            <div className="col-span-12 bg-background rounded-md p-4">
              <div className="uppercase">Sắp xếp</div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                <Button
                  variant={
                    filterParams?.sort_field === "modified.time" &&
                      filterParams.sort_type === "desc"
                      ? "destructive"
                      : "outline"
                  }
                  size="xs"
                  onClick={() => {
                    select("sort_field", "modified.time");
                    select("sort_type", "desc");
                  }}
                >
                  Cập nhật gần đây
                </Button>
                <Button
                  variant={
                    filterParams?.sort_field === "modified.time" &&
                      filterParams.sort_type === "asc"
                      ? "destructive"
                      : "outline"
                  }
                  size="xs"
                  onClick={() => {
                    select("sort_field", "modified.time");
                    select("sort_type", "asc");
                  }}
                >
                  Cập nhật cũ nhất
                </Button>
                <Button
                  variant={
                    filterParams?.sort_field === "year" &&
                      filterParams.sort_type === "asc"
                      ? "destructive"
                      : "outline"
                  }
                  size="xs"
                  onClick={() => {
                    select("sort_field", "year");
                    select("sort_type", "asc");
                  }}
                >
                  Năm phát hành tăng dần
                </Button>
                <Button
                  variant={
                    filterParams?.sort_field === "year" &&
                      filterParams.sort_type === "asc"
                      ? "destructive"
                      : "outline"
                  }
                  size="xs"
                  onClick={() => {
                    select("sort_field", "year");
                    select("sort_type", "desc");
                  }}
                >
                  Năm phát hành giảm dần
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={() => handleReset()}
              className="rounded-sm"
            >
              Đặt lại
            </Button>
            <Button onClick={() => handleFilter()} className="rounded-sm">
              Áp dụng
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
// <Drawer direction="top" open={open} onOpenChange={setOpen}>
//   <DrawerTrigger
//     asChild
//     onClick={(e) => {
//       // chặn warning Blocked aria-hidden on an element...
//       e.currentTarget.blur();
//     }}
//   >
//     <Button variant="outline">
//       <HugeiconsIcon icon={Filter} />
//       Bộ lọc
//     </Button>
//   </DrawerTrigger>
//   <DrawerContent className="bg-secondary">
//     <DrawerHeader className="sr-only">
//       <DrawerTitle>Bộ lọc phim</DrawerTitle>
//       <DrawerDescription>
//         Lọc phim theo loại phim, thể loại, quốc gia, năm
//       </DrawerDescription>
//     </DrawerHeader>

//     <div className="grid grid-cols-12 gap-4 no-scrollbar overflow-y-auto">
//       {isSearchFilter ? null : (
//         <div className="col-span-12 bg-background rounded-md p-4">
//           <div className="uppercase">Loại phim</div>
//           <div className="mt-2 flex gap-2 items-center flex-wrap">
//             {typeList.map(({ name, slug }) => (
//               <Button
//                 key={slug}
//                 variant={
//                   filterParams?.type_list === slug
//                     ? "destructive"
//                     : "outline"
//                 }
//                 size="xs"
//                 onClick={() => select("type_list", slug)}
//               >
//                 {name}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Thể loại</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {exampleCategories.map(({ name, slug }) => (
//             <Button
//               key={slug}
//               variant={
//                 filterParams?.category?.includes(slug)
//                   ? "destructive"
//                   : "outline"
//               }
//               size="xs"
//               onClick={() => select("category", slug)}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Quốc gia</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {exampleCountries.map(({ name, slug }) => (
//             <Button
//               key={slug}
//               variant={
//                 filterParams?.country?.includes(slug)
//                   ? "destructive"
//                   : "outline"
//               }
//               size="xs"
//               onClick={() => select("country", slug)}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Năm</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {getYears().map((year) => (
//             <Button
//               key={year}
//               variant={
//                 filterParams?.year === year + "" ? "destructive" : "outline"
//               }
//               size="xs"
//               onClick={() => select("year", year + "")}
//             >
//               {year}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Sắp xếp</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           <Button
//             variant={
//               filterParams?.sort_field === "modified.time" &&
//               filterParams.sort_type === "desc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "modified.time");
//               select("sort_type", "desc");
//             }}
//           >
//             Cập nhật gần đây
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "modified.time" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "modified.time");
//               select("sort_type", "asc");
//             }}
//           >
//             Cập nhật cũ nhất
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "year" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "year");
//               select("sort_type", "asc");
//             }}
//           >
//             Năm phát hành tăng dần
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "year" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "year");
//               select("sort_type", "desc");
//             }}
//           >
//             Năm phát hành giảm dần
//           </Button>
//         </div>
//       </div>
//     </div>

//     <DrawerFooter className="mt-4">
//       <Button variant="outline" onClick={() => handleReset()}>
//         Đặt lại
//       </Button>
//       <Button onClick={() => handleFilter()}>Áp dụng</Button>
//     </DrawerFooter>
//   </DrawerContent>
// </Drawer>
