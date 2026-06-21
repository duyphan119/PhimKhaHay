import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  icon?: any;
  iconColor?: string;
  gradientClassName?: string;
  href?: string;
};

export default function SectionHeader({
  title,
  icon,
  iconColor,
  gradientClassName,
  href,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-md bg-muted/60 px-3 py-2">
      <div className="flex items-center gap-2 text-lg font-semibold">
        {icon ? <HugeiconsIcon
          icon={icon}
          size={18}
          className={cn("shrink-0", iconColor)}
        /> : null}

        <span
          className={
            cn("bg-linear-to-r bg-clip-text text-transparent tracking-wide bg-position-[200%_200%] animate-gradient", gradientClassName)}
        >
          {title}
        </span>
      </div>

      {href ? (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-200 hover:text-destructive"
        >
          Xem tất cả
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Link>
      ) : null}
    </div>
  );
}
