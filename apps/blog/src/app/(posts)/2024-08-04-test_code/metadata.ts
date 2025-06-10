import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "테스트 코드가 어렵게 느껴지는 이유",
  publishDate: new Date("2024-08-04"),
  posterImage:
    "https://velog.velcdn.com/images/yoosion030/post/276c2895-da29-46cc-8f88-6c88b967a2f7/image.png",
  categories: ["테스트 코드"],
  recommended: true,
};
