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

export function randomVideos<T>(videos: T[], newLength?: number): T[] {
  const shuffled = [...videos];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return newLength ? shuffled.slice(0, newLength) : shuffled;
}
