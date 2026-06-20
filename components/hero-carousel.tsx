import CarouselAutoplay from "@/components/carousel-autoplay";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

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
                <div className="relative aspect-video w-full">
                  <Image
                    unoptimized
                    src={`https://phimapi.com/image.php?url=${videoItem.thumb_url}`}
                    alt={videoItem.slug}
                    fill={true}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    loading="eager"
                    className="object-cover"
                  />
                  <div className="absolute left-0 bottom-0 max-w-[60%] bg-black/40 p-4 text-white shadow-xl flex flex-col justify-end">
                    <Link
                      href={`/phim/${videoItem.slug}`}
                      className="text-sm font-semibold line-clamp-2 hover:text-primary hover:underline hover:underline-offset-2 transition-colors duration-200"
                    >
                      {videoItem.name}
                    </Link>
                    <div className="mt-3 space-y-1 text-xs text-secondary-foreground">
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
                    <div className="mt-4">
                      <Link
                        href={`/phim/${videoItem.slug}`}
                        className={buttonVariants({ className: "px-40 lg:px-56" })}

                      >
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