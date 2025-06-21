import { type Post } from "@blog/types";

export const getRecommendPosts = async (): Promise<Post[]> => {
  const posts: Post[] = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/posts/recommend",
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());

  return posts;
};
