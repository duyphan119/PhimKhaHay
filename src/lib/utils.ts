import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseHtmlString(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const decoded = doc.body.textContent;
  if (!decoded) return htmlString;
  return decoded;
}

export function shortenServerName(serverName: string) {
  return serverName?.replace("#Hà Nội (", "").replace(")", "") || serverName;
}

export function shortenVideoLanguage(videoLanguage: string) {
  return (
    videoLanguage
      ?.replace("Thuyết Minh", "TM")
      .replace("Lồng Tiếng", "LT")
      .split(" ")[0] || videoLanguage
  );
}

export function getSeo(seoOnPage: TSeoOnPage) {
  return {
    title: `PhimKhaHay | ${seoOnPage.titleHead}`,
    description: seoOnPage.descriptionHead,
    // openGraph: {
    //   type: seoOnPage.og_type as
    //     | "website"
    //     | "article"
    //     | "book"
    //     | "profile"
    //     | "music.song"
    //     | "music.album"
    //     | "music.playlist"
    //     | "music.radio_station"
    //     | "video.movie"
    //     | "video.episode"
    //     | "video.tv_show"
    //     | "video.other"
    //     | undefined,
    //   url: seoOnPage.og_url,
    //   title: seoOnPage.titleHead,
    //   description: seoOnPage.descriptionHead,
    //   images: seoOnPage.og_image.map((img) => ({
    //     url: `${appDomainCdnImage}/uploads/movies/${img
    //       .replace("movies/", "")
    //       .replace("uploads/", "")
    //       .replace("/", "")}`,
    //     width: 1200,
    //     height: 630,
    //     alt: seoOnPage.titleHead,
    //   })),
    // },
  };
}
