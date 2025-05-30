import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "신입 개발자의 회사 적응기",
  description: "2개월차 주니어 개발자의 회사 적응 회고",
  publishDate: new Date("2024-03-31"),
  posterImage:
    "https://velog.velcdn.com/images/yoosion030/post/bf348857-da49-42a2-9f28-ac45802fcf15/image.png",
  categories: ["신입 개발자의 취업 회고"],
};
