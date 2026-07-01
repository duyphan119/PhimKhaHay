import CarouselAutoplay from "@/components/carousel-autoplay";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import VideoImage from "@/features/videos/components/video-image";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon } from "@hugeicons/core-free-icons";

type HeroCarouselProps = {
  items: TMovieItem[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  return (
    <section className="">
      <CarouselAutoplay delay={4567}>
        <CarouselContent>
          {items
            .filter(
              (item) =>
                !item.country.find((c) =>
                  ["han-quoc", "trung-quoc"].includes(c.slug),
                ) || item.type !== "series",
            )
            .map((videoItem) => (
              <CarouselItem key={videoItem._id} >
                <div className="relative w-screen lg:h-screen lg:aspect-auto aspect-video">
                  <VideoImage src={videoItem.thumb_url.replace("-thumb.", "-poster.")} alt={videoItem.slug} />
                  {/* <div className="absolute inset-0 pointer-events-none bg-radial-[ellipse_at_center] from-transparent via-black/20 to-black/80" /> */}
                  <div className="absolute inset-y-0 left-0 right-0 bg-black/10 bg-linear-to-r from-black/60 via-black/30 to-black/60"></div>
                  <div className="absolute inset-0 bg-transparent p-4 text-white flex flex-col justify-center px-16">
                    <Link
                      href={`/phim/${videoItem.slug}`}
                      className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2 transition-colors duration-200"
                    >
                      {videoItem.name}
                    </Link>
                    <div className="lg:mt-4 mt-1 space-y-1 text-xs md:text-sm text-secondary-foreground">
                      <p>
                        Thể loại:{" "}
                        {videoItem.category.map((category, index) => (
                          <span key={category.id}>
                            <Link
                              href={`/the-loai/${category.slug}`}
                              className="hover:text-primary hover:underline hover:underline-offset-2 transition-colors duration-200"
                            >
                              {category.name}
                            </Link>
                            {index < videoItem.category.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </p>
                      <p>
                        Quốc gia:{" "}
                        {videoItem.country.map((country, index) => (
                          <span key={country.id}>
                            <Link
                              href={`/quoc-gia/${country.slug}`}
                              className="hover:text-primary hover:underline hover:underline-offset-2 transition-colors duration-200"
                            >
                              {country.name}
                            </Link>
                            {index < videoItem.country.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="lg:mt-8 mt-2">
                      <Link
                        href={`/phim/${videoItem.slug}`}
                        className={buttonVariants({ size: "lg" })}
                      >
                        <HugeiconsIcon icon={PlayIcon} />
                        Xem ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselAutoplay>
    </section>
  )
}