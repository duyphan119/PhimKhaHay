"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LatestVideo } from "@/features/videos/data";
import Autoplay from "embla-carousel-autoplay";
import { InfoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type LatestVideosCarouselProps = {
  videos: LatestVideo[];
};

export default function LatestVideosCarousel({
  videos,
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
        {videos.map((video) => (
          <CarouselItem key={video.id} className="">
            <div className="select-none relative h-[calc(100vh-12rem)] w-full">
              <Link
                href={`/phim/${video.slug}`}
                className="block w-full h-full relative"
              >
                <Image
                  src={video.thumbnail}
                  alt="Thumbnail"
                  fill
                  sizes="(max-width: 1200px) 50vw, 100vw"
                  className="object-contain object-right"
                  priority
                />
              </Link>

              <div className="absolute bg-gradient-to-r from-background to-background/20 inset-0 z-[10] p-4 md:p-10 flex items-center">
                <div className="flex flex-col justify-end w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
                  <h1 className="md:block hidden font-medium text-5xl text-lime-400 mb-1">
                    {video.originName}
                  </h1>
                  <h4 className="md:block hidden text-2xl mb-6">
                    {video.name}
                  </h4>
                  <Link
                    href={`/xem-phim/${video.slug}`}
                    className="md:hidden text-center md:text-3xl hover:text-primary hover:underline hover:underline-offset-2 px-12"
                  >
                    {video.name}
                  </Link>
                  <div className="hidden md:flex items-center flex-wrap mb-1 text-xs md:text-sm">
                    <div className="w-16">Quốc gia</div>
                    {video.countries.map((country, index) => (
                      <Fragment key={index}>
                        {index > 0 ? (
                          <span>,&nbsp;</span>
                        ) : (
                          <span>:&nbsp;</span>
                        )}
                        <Link
                          href={`/quoc-gia/${country.slug}`}
                          className="hover:text-primary hover:underline hover:underline-offset-2"
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
                      className="hover:text-primary hover:underline hover:underline-offset-2"
                    >
                      {video.year}
                    </Link>
                  </div>
                  <div className="hidden md:flex items-center flex-wrap text-xs md:text-sm">
                    <div className="w-16">Thể loại</div>
                    {video.categories.map((category, index) => (
                      <Fragment key={index}>
                        {index > 0 ? (
                          <span>,&nbsp;</span>
                        ) : (
                          <span>:&nbsp;</span>
                        )}
                        <Link
                          href={`/the-loai/${category.slug}`}
                          className="hover:text-primary hover:underline hover:underline-offset-2"
                        >
                          {category.name}
                        </Link>
                      </Fragment>
                    ))}
                  </div>
                  <div className="hidden md:flex gap-2 items-center mt-6">
                    <Link
                      href={`/xem-phim/${video.slug}`}
                      title="Xem ngay"
                      className={buttonVariants({
                        variant: "gradientYellowRed",
                        className: "opacity-80",
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
                        className: "opacity-80",
                      })}
                    >
                      <InfoIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
