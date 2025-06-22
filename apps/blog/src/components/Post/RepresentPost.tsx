import { cn } from "@repo/utils";
import { type Post } from "@blog/types";
import { GeneratedPosterImage } from "@blog/components";
import Link from "next/link";
import Image from "next/image";

const RepresentPost = ({ post }: { post: Post }) => {
  const { title, description, publishDate, posterImage, categories, slug } =
    post;

  return (
    <Link
      href={slug}
      className={cn(
        "max-w-[43.75rem]",
        "hover:bg-blue-50",
        "block",
        "rounded-2xl",
        "p-2",
        "transition",
        "duration-300",
        "ease-in-out"
      )}
    >
      {posterImage ? (
        <Image
          src={posterImage}
          alt={title}
          width="700"
          height="360"
          className={cn("aspect-video", "rounded-2xl")}
        />
      ) : (
        <GeneratedPosterImage
          title={title}
          width={700}
          height={360}
          alt={title}
        />
      )}

      <div className={cn("flex", "flex-col", "gap-1", "py-3")}>
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {new Date(publishDate)?.toLocaleDateString()} |{" "}
          {categories.join(", ")}
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
