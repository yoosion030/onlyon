import { type Post } from "@blog/types";
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
        "hover:bg-primary-400/5",
        "rounded-2xl",
        "p-2",
        "transition",
        "duration-300",
        "ease-in-out",
        "w-full"
      )}
    >
      <h2 className={cn("text-primary-400", "font-bold")}>{title}</h2>
      <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
        {new Date(publishDate).toLocaleDateString()} | {categories.join(", ")}
      </p>
    </Link>
  );
};

export default RecommendPost;
