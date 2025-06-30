import { type Post } from "@blog/types";
import { cn } from "@repo/utils";
import Image from "next/image";
import { CategoryBadge, PostHeadingLink } from "@blog/components";

type PostHeaderProps = {
  post: Post;
};

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <div className={cn("flex", "flex-col", "gap-2")}>
      <PostHeadingLink
        className={cn("text-[2.5rem]", "text-primary-linear", "font-bold")}
        as="h1"
      >
        {post?.title}
      </PostHeadingLink>
      <div className={cn("flex", "items-center", "gap-2")}>
        <time className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          {new Date(post.publishDate).toLocaleDateString()}
        </time>
        <span className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          |
        </span>
        {post.categories.map((category) => (
          <CategoryBadge key={category} category={category} isActive={false} />
        ))}
      </div>
      {post.posterImage && (
        <Image
          src={post.posterImage}
          alt={post.title}
          width={350}
          height={180}
          className={cn("aspect-video", "rounded-2xl", "w-full")}
        />
      )}
    </div>
  );
};

export default PostHeader;
