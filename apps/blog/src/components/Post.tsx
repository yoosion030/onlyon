import { cn } from "@repo/utils";
import { type Post as PostType } from "@blog/types";
import { GeneratedPosterImage } from "@blog/components";
import Link from "next/link";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const { title, description, publishDate, posterImage, categories, slug } =
    post;

  return (
    <Link href={slug} className={cn("max-w-[21.875rem]")}>
      {posterImage ? (
        <img
          src={posterImage}
          alt={title}
          width="350"
          height="180"
          className={cn("aspect-video", "rounded-2xl")}
        />
      ) : (
        <GeneratedPosterImage
          title={title}
          width={350}
          height={180}
          alt={title}
        />
      )}

      <div className={cn("flex", "flex-col", "gap-1", "py-3")}>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {publishDate.toLocaleDateString()} | {categories.join(", ")}
        </p>
        <h1 className={cn("text-primary-linear", "font-bold")}>{title}</h1>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Post;
