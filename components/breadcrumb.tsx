"use client";

import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

type Props = { items: TBreadcrumbItem[] };

export default function Breadcrumb({ items }: Props) {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" title="Đi tới trang chủ">
              Trang chủ
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <Fragment key={item.name}>
            <BreadcrumbSeparator />

            {item.slug ? (
              <BreadcrumbLink asChild>
                <Link title={item.name} href={item.slug}>
                  {item.name}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
