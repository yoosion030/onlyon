import { readdir } from "node:fs/promises";
import path from "node:path";
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
      slugs.map(async ({ name: slug }) => {
        try {
          const { metadata } = await import(
            `../../../(posts)/${slug}/page.mdx`
          );
          return { slug, ...metadata };
        } catch {
          return null;
        }
      })
    );

    const sortedPosts = posts
      ?.filter((post): post is Post => post !== null)
      .sort((a, b) => b?.publishDate.getTime() - a?.publishDate.getTime());

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
