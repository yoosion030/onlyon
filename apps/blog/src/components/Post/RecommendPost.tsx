import type { Post } from "@blog/types";
import { cn } from "@repo/utils";
import Link from "next/link";

const RecommendPost = ({ title, publishDate, categories, slug }: Post) => {
  return (
    <Link
      href={slug}
      className={cn(
        "flex",
        "flex-col",
        "gap-2",
        "hover:bg-blue-50",
        "rounded-2xl",
        "p-2",
        "transition",
        "duration-300",
        "ease-in-out",
        "w-full",
      )}
    >
      <h2 className={cn("text-primary-400", "font-bold")}>{title}</h2>
      <p
        className={cn(
          "text-primary-400",
          "font-thin",
          "text-[0.75rem]",
          "flex",
          "gap-1",
        )}
      >
        <span>{new Date(publishDate).toLocaleDateString()}</span>
        <span>|</span>
        <span>{categories.join(", ")}</span>
      </p>
    </Link>
  );
};

export default RecommendPost;
