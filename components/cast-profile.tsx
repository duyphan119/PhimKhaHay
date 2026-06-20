import { TMDB_IMAGE_DOMAIN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Birthday,
  Female02Icon,
  Hospital,
  Male02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

type CastProfileProps = TCastProfile & {
  className?: string;
};

export default function CastProfile({
  id,
  biography,
  birthday,
  className = "",
  place_of_birth,
  gender,
  name,
  profile_path,
}: CastProfileProps) {
  const isPageCastProfile =
    birthday || place_of_birth || biography ? true : false;
  const imageChildren = (
    <>
      <Image
        unoptimized
        src={
          profile_path
            ? `${TMDB_IMAGE_DOMAIN}${profile_path}`
            : gender === 1
              ? "/images/placeholder-cast-female.png"
              : "/images/placeholder-cast-male.png"
        }
        alt={name}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        loading="eager"
      />

      <div className="absolute inset-x-2 bottom-2 bg-background/80 text-muted-foreground p-2 rounded-lg text-center flex items-center justify-center gap-2 font-semibold">
        <HugeiconsIcon
          icon={gender === 1 ? Female02Icon : Male02Icon}
          size={16}
        />

        <span className="font-semibold">{name}</span>
      </div>
    </>
  );
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm",
        className,
      )}
    >
      {isPageCastProfile ? (
        <div className="relative aspect-[2/3] overflow-hidden">
          {imageChildren}
        </div>
      ) : (
        <Link
          href={`/dien-vien/${id}`}
          className="relative aspect-[2/3] overflow-hidden block"
        >
          {imageChildren}
        </Link>
      )}

      {birthday || place_of_birth || biography ? (
        <div className="space-y-3 p-4">
          {birthday && (
            <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <HugeiconsIcon icon={Birthday} size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Ngày sinh</p>
                <p className="text-sm font-medium">{birthday}</p>
              </div>
            </div>
          )}

          {place_of_birth && (
            <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <HugeiconsIcon icon={Hospital} size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Nơi sinh</p>
                <p className="text-sm font-medium leading-relaxed">
                  {place_of_birth}
                </p>
              </div>
            </div>
          )}

          {biography && (
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-primary" />

                <h3 className="text-sm font-semibold tracking-wide">Tiểu sử</h3>
              </div>

              <p className="text-sm leading-7 text-muted-foreground whitespace-pre-line">
                {biography}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
