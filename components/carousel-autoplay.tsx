"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "./ui/carousel";

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export default function CarouselAutoplay({ children, delay = 3456 }: Props) {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay,
        }),
      ]}
    >
      {children}
    </Carousel>
  );
}
