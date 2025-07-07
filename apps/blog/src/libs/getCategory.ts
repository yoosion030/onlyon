import { type Category } from "@blog/types";

export const getCategory = async (): Promise<Category[]> => {
  const categories: Category[] = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/posts/category",
    {
      cache: "force-cache",
    }
  ).then((res) => res.json());

  return categories;
};
