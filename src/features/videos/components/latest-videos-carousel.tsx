"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { InfoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type LatestVideosCarouselProps = {
  videos: TVideoItem[];
  appDomainCdnImage: string;
  isLoading?: boolean;
};

export default function LatestVideosCarousel({
  videos,
  appDomainCdnImage,
  isLoading,
}: LatestVideosCarouselProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 34567,
        }),
      ]}
    >
      <CarouselContent>
        {isLoading ? (
          <CarouselItem>
            <Skeleton className="aspect-video md:aspect-auto md:h-[calc(100vh-12rem)] w-full" />
          </CarouselItem>
        ) : (
          videos.map((video) => (
            <CarouselItem key={video._id} className="">
              <div className="select-none relative aspect-video md:aspect-auto md:h-[calc(100vh-12rem)] w-full">
                <div className=" w-full h-full relative">
                  {/* api không trả về poster_url */}
                  <Image
                    unoptimized
                    src={`${appDomainCdnImage}/uploads/movies/${video.thumb_url.replace(
                      "-thumb",
                      "-poster"
                    )}`}
                    alt="Thumbnail"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20 p-5 md:p-10 flex items-center">
                  <div className="flex flex-col justify-end w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
                    <h1 className="md:block hidden font-medium text-5xl text-lime-400 mb-1">
                      {video.origin_name}
                    </h1>
                    <Link
                      href={`/xem-phim/${video.slug}`}
                      className="md:hidden _text-primary text-xl _hover-underline"
                    >
                      {video.name}
                    </Link>
                    <h4 className="text-sm md:text-2xl mb-2 md:mb-6">
                      {video.name}
                    </h4>

                    <div className="hidden md:flex items-center flex-wrap mb-1 text-xs md:text-sm">
                      <div className="w-16">Quốc gia</div>
                      {video.country.map((country, index) => (
                        <Fragment key={index}>
                          {index > 0 ? (
                            <span>,&nbsp;</span>
                          ) : (
                            <span>:&nbsp;</span>
                          )}
                          <Link
                            href={`/quoc-gia/${country.slug}`}
                            className="hover:text-primary _hover-underline"
                          >
                            {country.name}
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                    <div className="hidden md:flex items-center flex-wrap mb-1 text-xs md:text-sm">
                      <div className="w-16">Năm</div>
                      <span>:&nbsp;</span>
                      <Link
                        href={`/nam-phat-hanh/${video.year}`}
                        className="hover:text-primary _hover-underline"
                      >
                        {video.year}
                      </Link>
                    </div>
                    <div className="hidden md:flex items-center flex-wrap text-xs md:text-sm">
                      <div className="w-16">Thể loại</div>
                      {video.category.map((category, index) => (
                        <Fragment key={index}>
                          {index > 0 ? (
                            <span>,&nbsp;</span>
                          ) : (
                            <span>:&nbsp;</span>
                          )}
                          <Link
                            href={`/the-loai/${category.slug}`}
                            className="hover:text-primary _hover-underline"
                          >
                            {category.name}
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                    <div className="flex gap-2 items-center mt-2 md:mt-6">
                      <Link
                        href={`/xem-phim/${video.slug}`}
                        title="Xem ngay"
                        className={buttonVariants({
                          variant: "gradientYellowRed",
                          size: "auto",
                          className:
                            "opacity-80 h-8 px-3 text-xs [&_svg]:size-3 md:text-sm md:h-9 md:px-4 md:py-2 md:[&_svg]:size-3.5",
                        })}
                      >
                        <PlayIcon />
                        XEM NGAY
                      </Link>
                      <Link
                        href={`/phim/${video.slug}`}
                        title="Xem chi tiết"
                        className={buttonVariants({
                          variant: "gradientGrayNeutral",
                          size: "auto",
                          className:
                            "opacity-80 h-8 px-3 text-xs [&_svg]:size-3 md:text-sm md:h-9 md:px-4 md:py-2 md:[&_svg]:size-3.5",
                        })}
                      >
                        <InfoIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
