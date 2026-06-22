import { cn } from "@/lib/utils";
import Image from "next/image";

type VideoImageProps = {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
};

export default function VideoImage({
  src,
  alt = "",
  sizes = "(max-width: 640px) 25vw,  (max-width: 1024px) 50vw, 100vw",
  className,
}: VideoImageProps) {
  return (
    <Image
      src={`${process.env.DOMAIN_CDN_IMAGE}/uploads/movies/${src}`}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      loading="lazy"
      crossOrigin="anonymous"
      unoptimized
    />
  );
}
