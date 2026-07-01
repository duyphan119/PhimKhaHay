'use client';

import { useEffect, useState } from "react";
import { castsApi } from "../api";
import Image from "next/image";
import DialogImage from "./dialog-image";

type CastImagesProps = {
  cast: TCastProfile;
}

export default function CastImages({ cast }: CastImagesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [images, setImages] = useState<TCastImage[]>([])

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await castsApi.getImages(cast.id);

        setImages(data?.profiles || [])
      } catch (error) {
        console.log(error)
      }
      finally {
        setIsLoading(false)
      }
    })()
  }, [cast]);

  if (isLoading) return null;

  const filteredImages = images.filter(({ file_path }) => file_path !== cast.profile_path);

  if (filteredImages.length === 0) return null;

  return (
    <div className="rounded-xl bg-muted/40 p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-1 rounded-full bg-primary" />

        <h3 className="text-sm font-semibold tracking-wide">
          Hình ảnh
        </h3>

        <span className="text-xs text-muted-foreground">
          ({filteredImages.length})
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredImages.map((image, index) => (
          <DialogImage key={index} image={image}>
            <div key={index} className="overflow-hidden rounded-xl border bg-card hover:cursor-zoom-in">
              <div className="relative aspect-2/3">
                <Image
                  unoptimized
                  fill
                  alt={`${name} ${index + 1}`}
                  src={`${process.env.DOMAIN_TMDB_IMAGE}${image.file_path}`}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </DialogImage>
        ))}
      </div>
    </div>
  )
}