import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "Git, 왜 쓰는거야?",
  description: "비유 하면서 git 배우기",
  publishDate: new Date("2023-03-24"),
  categories: ["Git"],
  recommended: true,
};
