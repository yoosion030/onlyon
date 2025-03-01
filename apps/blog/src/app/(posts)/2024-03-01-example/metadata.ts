import { type Post } from "../../../types";

export const metadata: Omit<Post, "slug"> = {
  title: "example post",
  description: "Hello World Page",
  publishDate: new Date("2024-03-01"),
  posterImage:
    "https://dthezntil550i.cloudfront.net/ky/latest/ky2106081752454770020570457/1280_960/9e23a15b-ec93-49e0-9766-b4e7ce508339.png",
  categories: ["개발"],
};
