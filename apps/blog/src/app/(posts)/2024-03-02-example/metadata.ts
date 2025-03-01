import { type Post } from "../../../types";

export const metadata: Omit<Post, "slug"> = {
  title: "개발자 회고 블로그",
  description: "Hello World Page",
  publishDate: new Date("2024-03-02"),
  posterImage: null,
  categories: ["개발"],
};
