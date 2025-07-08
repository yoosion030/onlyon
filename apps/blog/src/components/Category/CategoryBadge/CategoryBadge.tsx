import type { Category } from "@blog/types";
import { cn } from "@repo/utils";
import Link from "next/link";

export type CategoryBadgeProps = Category & {
  isActive: boolean;
};

export default function CategoryBadge({
  category,
  isActive,
  count = 0,
}: CategoryBadgeProps) {
  const href =
    category === "전체" ? "/" : `?category=${encodeURIComponent(category)}`;

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1 text-[0.625rem] rounded-[0.25rem] font-medium border transition-all hover:bg-blue-50 disabled:opacity-50",
        isActive
          ? ["bg-primary", "text-white", "border-primary", "hover:text-primary"]
          : ["text-primary", "border-primary", "bg-transparent"],
      )}
      prefetch={true}
    >
      {category}
      {count > 0 && <span className="ml-1">({count})</span>}
    </Link>
  );
}
