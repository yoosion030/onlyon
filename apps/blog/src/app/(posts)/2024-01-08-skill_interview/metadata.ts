import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "신입 개발자의 면접 준비 방법(기술)",
  description:
    "나만의 면접 준비 방법, 10번의 면접 중 4번의 최종 탈락에도 극복하는 방법",
  publishDate: new Date("2024-01-08"),
  categories: ["신입 개발자의 취업 회고"],
};
