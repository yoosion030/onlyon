import type { Post } from "@blog/types";

type GetPostsProps = {
  category?: string;
  page?: number;
  limit?: number;
};

type PostResponse = {
  posts: Post[];
  totalPages: number;
};

export const getPosts = async ({
  category,
  page = 1,
  limit = 10,
}: GetPostsProps = {}): Promise<PostResponse> => {
  const buildApiUrl = (endpoint: string) => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint);
    if (category) {
      url.searchParams.set("category", category);
    }
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());
    return url.toString();
  };

  const { posts, totalPages }: PostResponse = await fetch(
    buildApiUrl("/api/posts"),
    {
      next: {
        tags: ["posts", category || "all", `page-${page}`],
      },
    },
  ).then((res) => res.json());

  return {
    posts,
    totalPages,
  };
};
