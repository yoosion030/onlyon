import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "신입 개발자의 질문 방법(커피챗)",
  description: "잘 질문하는 방법과 커피챗하는 방법",
  publishDate: new Date("2024-01-17"),
  categories: ["신입 개발자의 취업 회고"],
};
