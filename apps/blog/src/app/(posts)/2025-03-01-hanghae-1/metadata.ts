import { type Post } from "../../../types";

export const metadata: Omit<Post, "slug"> = {
  title: "항해 플러스 프론트엔드 코스 1주차 후기",
  description: "항해 플러스 프론트엔드 코스 1주차 후기를 정리해보았습니다.",
  publishDate: new Date("2024-06-19"),
  posterImage:
    "https://dthezntil550i.cloudfront.net/ky/latest/ky2106081752454770020570457/1280_960/9e23a15b-ec93-49e0-9766-b4e7ce508339.png",
  categories: ["개발"],
};
