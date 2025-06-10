import { type Post } from "@blog/types";

export const metadata: Omit<Post, "slug"> = {
  title: "신입 개발자의 포트폴리오 작성법",
  description:
    "60개 회사에 지원해서 8개의 회사(오후두시랩, 신한은행, 토스뱅크, 미리디, 데이원컴퍼니, 베이글코드, 클래스팅, 팀스파르타)에 서류 합격한 방법",
  publishDate: new Date("2023-12-21"),
  posterImage:
    "https://velog.velcdn.com/images/yoosion030/post/cc68d194-ed3a-41f5-9c77-83efda460c06/image.png",
  categories: ["신입 개발자의 취업 회고"],
  recommended: true,
};
