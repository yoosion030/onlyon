import { type Post } from "@blog/types";

type GetPostsProps = {
  category?: string;
};

export const getPosts = async ({ category }: GetPostsProps = {}): Promise<
  Post[]
> => {
  const buildApiUrl = (endpoint: string) => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint);
    if (category) {
      url.searchParams.set("category", category);
    }
    return url.toString();
  };

  const posts: Post[] = await fetch(buildApiUrl("/api/posts"), {
    next: {
      tags: ["posts", category || "all"],
    },
  }).then((res) => res.json());

  return posts.filter((post): post is Post => post !== null);
};
