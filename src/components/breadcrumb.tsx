import {
  Breadcrumb as BreadcrumbWrapper,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

type BreadcrumbProps = {
  breadCrumb: TBreadcrumb;
  className?: string;
};

export default function Breadcrumb({ breadCrumb, className }: BreadcrumbProps) {
  return (
    <BreadcrumbWrapper className={className}>
      <BreadcrumbList>
        {[{ name: "Trang chủ", slug: "/" }, ...breadCrumb].map(
          (item, index) => (
            <Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.slug ? (
                  <BreadcrumbLink href={item.slug}>{item.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        )}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
}
