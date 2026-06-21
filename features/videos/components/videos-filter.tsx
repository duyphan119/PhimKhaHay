"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { categories } from "@/features/categories/api";
import { countries } from "@/features/countries/api";
import { typelist } from "@/features/typelist/api";
import { getYears } from "@/lib/utils";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      pathname = `/nam-phat-hanh/${year}`;

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
      pathname = `/nam-phat-hanh/${new Date().getFullYear()}`;

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
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger
          className={buttonVariants({
            variant: "outline",
            className:
              "h-11 gap-2 justify-between rounded-xl border bg-card px-4 hover:no-underline",
          })}
        >
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Filter} size={18} />
            <span>Bộ lọc</span>
          </div>

          <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            {
              [
                filterParams.type_list,
                filterParams.year,
                ...(filterParams.category || []),
                ...(filterParams.country || []),
              ].filter(Boolean).length
            }
          </div>
        </AccordionTrigger>

        <AccordionContent className="pt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {!isSearchFilter && (
              <FilterSection title="Loại phim">
                {typelist.map(({ name, slug }) => (
                  <Button
                    key={slug}
                    size="xs"
                    variant={
                      filterParams.type_list === slug
                        ? "default"
                        : "secondary"
                    }
                    className="rounded-full"
                    onClick={() => select("type_list", slug)}
                  >
                    {name}
                  </Button>
                ))}
              </FilterSection>
            )}

            <FilterSection title="Thể loại">
              {categories.map(({ name, slug }) => (
                <Button
                  key={slug}
                  size="xs"
                  variant={
                    filterParams.category?.includes(slug)
                      ? "default"
                      : "secondary"
                  }
                  className="rounded-full"
                  onClick={() => select("category", slug)}
                >
                  {name}
                </Button>
              ))}
            </FilterSection>

            <FilterSection title="Quốc gia">
              {countries.map(({ name, slug }) => (
                <Button
                  key={slug}
                  size="xs"
                  variant={
                    filterParams.country?.includes(slug)
                      ? "default"
                      : "secondary"
                  }
                  className="rounded-full"
                  onClick={() => select("country", slug)}
                >
                  {name}
                </Button>
              ))}
            </FilterSection>

            <FilterSection title="Năm phát hành">
              {getYears().map((year) => (
                <Button
                  key={year}
                  size="xs"
                  variant={
                    filterParams.year === String(year)
                      ? "default"
                      : "secondary"
                  }
                  className="rounded-full"
                  onClick={() => select("year", String(year))}
                >
                  {year}
                </Button>
              ))}
            </FilterSection>

            <div className="lg:col-span-2">
              <FilterSection title="Sắp xếp">
                <Button
                  size="xs"
                  className="rounded-full"
                  variant={
                    filterParams.sort_field === "modified.time" &&
                      filterParams.sort_type === "desc"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    select("sort_field", "modified.time");
                    select("sort_type", "desc");
                  }}
                >
                  Cập nhật gần đây
                </Button>

                <Button
                  size="xs"
                  className="rounded-full"
                  variant={
                    filterParams.sort_field === "modified.time" &&
                      filterParams.sort_type === "asc"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    select("sort_field", "modified.time");
                    select("sort_type", "asc");
                  }}
                >
                  Cập nhật cũ nhất
                </Button>

                <Button
                  size="xs"
                  className="rounded-full"
                  variant={
                    filterParams.sort_field === "year" &&
                      filterParams.sort_type === "asc"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    select("sort_field", "year");
                    select("sort_type", "asc");
                  }}
                >
                  Năm ↑
                </Button>

                <Button
                  size="xs"
                  className="rounded-full"
                  variant={
                    filterParams.sort_field === "year" &&
                      filterParams.sort_type === "desc"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    select("sort_field", "year");
                    select("sort_type", "desc");
                  }}
                >
                  Năm ↓
                </Button>
              </FilterSection>
            </div>
          </div>

          <div className="sticky bottom-0 mt-6 flex gap-3 border-t bg-background pt-4">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={handleReset}
            >
              Đặt lại
            </Button>

            <Button
              className="flex-1 rounded-xl"
              onClick={handleFilter}
            >
              Áp dụng bộ lọc
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}