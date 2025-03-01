import { cn } from "@repo/utils";
import { type Post } from "../types";
import BasePosterImage from "./GeneratedPosterImage";
import Link from "next/link";

const RepresentPost = ({ post }: { post: Post }) => {
  const { title, description, publishDate, posterImage, categories, slug } =
    post;

  return (
    <Link href={slug} className={cn("max-w-[43.75rem]")}>
      {posterImage ? (
        <img
          src={posterImage}
          alt={title}
          width="700"
          height="360"
          className={cn("aspect-video", "rounded-2xl")}
        />
      ) : (
        <BasePosterImage title={title} width={700} height={360} alt={title} />
      )}

      <div className={cn("flex", "flex-col", "gap-1", "py-3")}>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {publishDate.toLocaleDateString()} | {categories.join(", ")}
        </p>
        <h1
          className={cn("text-primary-linear", "font-bold", "text-[1.75rem]")}
        >
          {title}
        </h1>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default RepresentPost;
