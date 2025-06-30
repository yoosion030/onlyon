"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "@repo/utils";
import { CategoryBadge } from "@blog/components";

type CategoryFilterProps = {
  categories: { category: string; count: number }[];
};

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const selectedCategory = decodeURIComponent(
    searchParams.get("category") || "전체"
  );

  return (
    <div className={cn("flex", "flex-wrap", "gap-2")}>
      {categories.map(({ category, count }) => (
        <CategoryBadge
          key={category}
          category={category}
          isActive={selectedCategory === category}
          count={count}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
