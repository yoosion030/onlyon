import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { type Post } from "@blog/types";

export async function GET(): Promise<
  NextResponse<Post[] | { error: unknown }>
> {
  try {
    const postPath = path.resolve(process.cwd(), "src", "app", "(posts)");

    const slugs = (await readdir(postPath, { withFileTypes: true })).filter(
      (dirent) => dirent.isDirectory()
    );

    const posts: (Post | null)[] = await Promise.all(
      slugs.map(async ({ name }) => {
        try {
          const { metadata } = await import(
            `../../../../app/(posts)/${name}/page.mdx`
          );
          return { slug: name, ...metadata };
        } catch {
          return null;
        }
      })
    );

    const recommendedPosts = posts?.filter(
      (post): post is Post => post !== null && post.recommended === true
    );

    const sortedPosts = recommendedPosts
      ?.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
      .slice(0, 5);

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
