import { type Post } from "@blog/types";

type GetRelationPostsProps = {
  post: Post;
};

export const getRelationPosts = async ({
  post,
}: GetRelationPostsProps): Promise<Post[]> => {
  const relationPosts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/relation`,
    {
      body: JSON.stringify({
        currentPost: post,
      }),
      method: "POST",
      cache: "force-cache",
    }
  )
    .then((res) => res.json())
    .catch(() => []);

  return relationPosts;
};
