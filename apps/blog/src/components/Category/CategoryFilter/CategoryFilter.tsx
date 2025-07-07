"use client";

import { useSearchParams } from "next/navigation";

import { cn } from "@repo/utils";
import { CategoryBadge } from "@blog/components";
import { type Category } from "@blog/types";

type CategoryFilterProps = {
  categories: Category[];
};

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const searchParams = useSearchParams();
  const selectedCategory = decodeURIComponent(
    searchParams.get("category") || "전체"
  );

  return (
    <div className={cn("flex", "flex-wrap", "gap-2")}>
      {categories.length > 0 &&
        categories.map(({ category, count }) => (
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
