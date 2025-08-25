"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  actorsData: TActorsResponse["data"];
};

export default function Actors({ actorsData }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {actorsData.peoples.map((item, index) => (
        <div
          key={index}
          className="lg:col-span-2 _bg-layout rounded-md overflow-hidden"
        >
          <Link
            href={`/dien-vien/${item.tmdb_people_id}`}
            className="relative block w-full aspect-[185/278]"
          >
            <Image
              unoptimized
              alt="Actor"
              src={
                item.profile_path
                  ? `${actorsData.profile_sizes.w185}${item.profile_path}`
                  : item.gender === 2
                  ? "/placeholder-actor-male.jpg"
                  : "/placeholder-actor-female.jpg"
              }
              fill
            />
          </Link>
          <div className="p-2 text-center">
            <a
              href={`https://www.themoviedb.org/person/${item.tmdb_people_id}`}
              target="_blank"
              className="font-medium text-sm text-lime-400 _hover-underline"
            >
              {item.also_known_as?.find((value) => value.indexOf(" ") !== -1) ||
                item.original_name}
            </a>
            <div className="text-xs text-muted-foreground">
              {item.character}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
