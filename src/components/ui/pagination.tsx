import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  disabled?: boolean;
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  Pick<ButtonProps, "rounded"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  disabled,
  size = "iconXl",
  rounded = "full",
  isActive,
  ...props
}: PaginationLinkProps) => {
  const _className = cn(
    buttonVariants({
      variant: isActive ? "paginationActive" : "pagination",
      size,
      rounded,
    }),
    className,
    disabled && "cursor-not-allowed"
  );
  return disabled || isActive ? (
    <div className={_className}>{props.children}</div>
  ) : (
    <Link className={_className} {...props} />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = (
  props: React.ComponentProps<typeof PaginationLink>
) => (
  <PaginationLink aria-label="Go to previous page" size="iconXl" {...props}>
    <ArrowLeftIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="iconXl" {...props}>
    <ArrowRightIcon className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
