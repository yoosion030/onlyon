import { type Post } from "../../../types";

export const metadata: Omit<Post, "slug"> = {
  title: "프론트엔드 개발자도 CI/CD를 배워야 할까?",
  publishDate: new Date("2024-07-28"),
  posterImage:
    "https://velog.velcdn.com/images/yoosion030/post/e7868136-92c8-4796-bbd0-5cf5183b76ae/image.avif",
  categories: ["CI/CD"],
};
