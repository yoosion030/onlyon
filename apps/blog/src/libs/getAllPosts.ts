import type { Post } from "@blog/types";

export const getAllPosts = async (): Promise<Post[]> => {
  const allPosts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/all`,
    {
      cache: "force-cache",
    },
  )
    .then((res) => res.json())
    .catch(() => []);

  return allPosts;
};
