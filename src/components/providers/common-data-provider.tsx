"use client";

import categoryApi from "@/features/categories/data";
import countryApi from "@/features/countries/data";
import yearApi from "@/features/years/data";
import { useQueries } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

type CommonDataProps = {
  categories: TCategory[];
  countries: TCountry[];
  years: { year: number }[];
};

const CommonDataContext = createContext<CommonDataProps>({
  categories: [],
  countries: [],
  years: [],
});

export const useCommonData = () => useContext(CommonDataContext);

export default function CommonDataProvider({ children }: Props) {
  const [
    { data: categoriesData },
    { data: countriesData },
    { data: yearsData },
  ] = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => categoryApi.fetchCategoriesData(),
      },
      {
        queryKey: ["countries"],
        queryFn: () => countryApi.fetchCountriesData(),
      },
      {
        queryKey: ["years"],
        queryFn: () => yearApi.fetchYearsData(),
      },
    ],
  });
  return (
    <CommonDataContext.Provider
      value={{
        categories: categoriesData?.data.items || [],
        countries: countriesData?.data.items || [],
        years: yearsData?.data.items || [],
      }}
    >
      {children}
    </CommonDataContext.Provider>
  );
}
