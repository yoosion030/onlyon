import { GeneratedPosterImage } from "@blog/components";
import type { Post as PostType } from "@blog/types";
import { cn } from "@repo/utils";
import Image from "next/image";
import Link from "next/link";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const { title, description, publishDate, posterImage, categories, slug } =
    post;

  return (
    <Link
      href={slug}
      className={cn(
        "hover:bg-blue-50",
        "rounded-2xl",
        "p-2",
        "transition",
        "duration-300",
        "ease-in-out",
        "inline-block",
      )}
      prefetch={true}
    >
      {posterImage ? (
        <Image
          src={posterImage}
          alt={title}
          width={350}
          height={180}
          className={cn("aspect-video", "rounded-2xl", "w-full")}
        />
      ) : (
        <GeneratedPosterImage
          title={title}
          width={350}
          height={180}
          alt={title}
          className={cn("aspect-video", "rounded-2xl", "w-full")}
        />
      )}

      <div className={cn("flex", "flex-col", "gap-1", "py-3")}>
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
        <h1 className={cn("text-primary-linear", "font-bold")}>{title}</h1>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Post;
