"use client";

import Image from "next/image";
import { useMemo } from "react";

type Props = {
  imagesData: TImagesResponse["data"];
};

export default function Images({ imagesData }: Props) {
  const filteredImages = useMemo(() => {
    if (!imagesData.images || imagesData.images.length === 0) return [];
    const map: Record<string, number> = {};
    let iso_max_items = imagesData.images[0].iso_639_1;

    for (let i = 1; i < imagesData.images.length; i++) {
      if (map[imagesData.images[i].iso_639_1])
        map[imagesData.images[i].iso_639_1] += 1;
      else map[imagesData.images[i].iso_639_1] = 1;

      if (map[imagesData.images[i].iso_639_1] > map[iso_max_items]) {
        iso_max_items = imagesData.images[i].iso_639_1;
      }
    }

    return imagesData.images.filter(
      ({ iso_639_1, aspect_ratio }) =>
        iso_639_1 === iso_max_items && aspect_ratio > 1
    );
  }, [imagesData]);
  return (
    <div className="space-y-2">
      {filteredImages.map((image, index) => (
        <div
          key={index}
          className="relative"
          style={{ aspectRatio: image.aspect_ratio }}
        >
          <Image
            src={`${imagesData.image_sizes.backdrop.w1280}/${image.file_path}`}
            alt="Backdrop image"
            fill
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
