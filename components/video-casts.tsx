"use client";

import { getCasts } from "@/lib/cast";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  tmdbType: string | null;
  tmdbId: string | number | null;
  castNames: string[];
};

export default function VideoCasts({ tmdbId, tmdbType, castNames }: Props) {
  const [casts, setCasts] = useState<TCast[]>([]);
  useEffect(() => {
    (async () => {
      if (tmdbType && tmdbId) {
        const data = await getCasts(tmdbType, tmdbId);
        setCasts(data);
      }
    })();
  }, [tmdbType, tmdbId]);

  if (!tmdbId || !tmdbType)
    return (
      <p className="mt-2 text-sm leading-6 text-foreground">
        {castNames.length ? castNames.join(", ") : "Đang cập nhật"}
      </p>
    );

  if (casts.length === 0) return <div className="mt-4 text-sm text-muted-foreground">
    Vui lòng bật 1.1.1.1 để tải thông tin diễn viên.
  </div>
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
      {casts.map((castItem) => (
        <div key={castItem.id} className="border border-muted">
          <Link
            href={`/dien-vien/${castItem.id}`}
            title={castItem.name}
            className="relative aspect-[2/3] block"
          >
            <Image
              unoptimized
              src={
                castItem.profile_path
                  ? `https://image.tmdb.org/t/p/h632${castItem.profile_path}`
                  : castItem.gender === 1
                    ? "/images/placeholder-cast-female.png"
                    : "/images/placeholder-cast-male.png"
              }
              alt="Profile"
              fill
              className="rounded-ss-md rounded-se-md object-cover"
            />
          </Link>
          <div className="p-1 flex flex-col items-center">
            <Link
              href={`/dien-vien/${castItem.id}`}
              title={castItem.name}
              className="text-sm hover:text-destructive transition-colors duration-200"
            >
              {castItem.name}
            </Link>
            <div className="text-muted-foreground text-xs text-center">
              {castItem.character}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
