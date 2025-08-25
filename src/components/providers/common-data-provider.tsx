"use client";

import { createContext, useContext } from "react";

type Props = {
  categories: TCategory[];
  countries: TCountry[];
  years: { year: number }[];
  children: React.ReactNode;
};

type CommonDataProps = Omit<Props, "children">;

const CommonDataContext = createContext<CommonDataProps>({
  categories: [],
  countries: [],
  years: [],
});

export const useCommonData = () => useContext(CommonDataContext);

export default function CommonDataProvider({ children, ...props }: Props) {
  return (
    <CommonDataContext.Provider value={props}>
      {children}
    </CommonDataContext.Provider>
  );
}
