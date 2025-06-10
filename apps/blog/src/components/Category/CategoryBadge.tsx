"use client";

import { cn } from "@repo/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type CategoryBadgeProps = {
  category: string;
  count?: number;
  isActive: boolean;
};

const defaultCategory = "전체";

const CategoryBadge = ({ category, isActive, count }: CategoryBadgeProps) => {
  const searchParams = useSearchParams();

  const createQueryString = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === defaultCategory) {
      params.delete("category");
    } else {
      params.set("category", encodeURIComponent(category));
    }

    return params.toString();
  };

  const href =
    category === defaultCategory ? "/" : `?${createQueryString(category)}`;

  return (
    <Link
      href={href}
      className={cn(
        "px-3",
        "py-1",
        "text-[0.625rem]",
        "rounded-[0.25rem]",
        "font-medium",
        "border",
        "transition-colors",
        "hover:bg-primary-400/5",
        isActive
          ? ["bg-primary", "text-white", "border-primary", "hover:text-primary"]
          : ["text-primary", "border-primary", "bg-transparent"]
      )}
    >
      {category}
      {count && <span className={cn("ml-1")}>({count})</span>}
    </Link>
  );
};

export default CategoryBadge;
