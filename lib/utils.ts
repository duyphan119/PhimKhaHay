import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripHtml = (text?: string) =>
  text?.replace(/<[^>]+>/g, "").trim() || "";

export const getServerName = (name?: string) =>
  name?.replace("#Hà Nội (", "").replace(")", "") || "";

export const getYears = () =>
  Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => 1970 + i,
  ).reverse();
