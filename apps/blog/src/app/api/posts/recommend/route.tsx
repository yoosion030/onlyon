import { NextResponse } from "next/server";
import { type Post } from "@blog/types";
import { getAllPosts } from "@blog/libs";

export async function GET(): Promise<
  NextResponse<Post[] | { error: unknown }>
> {
  try {
    const posts = await getAllPosts();

    const recommendedPosts = posts
      ?.filter((post) => {
        return post.recommended === true;
      })
      ?.sort((a, b) => {
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      })
      .slice(0, 5);

    return NextResponse.json(recommendedPosts);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
