import { readdir } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { type Post } from "@blog/types";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Post[] | { error: unknown }>> {
  try {
    const postPath = path.resolve(process.cwd(), "src", "app", "(posts)");

    const slugs = (await readdir(postPath, { withFileTypes: true })).filter(
      (dirent) => dirent.isDirectory()
    );

    const posts: (Post | null)[] = await Promise.all(
      slugs.map(async ({ name }) => {
        try {
          const { metadata } = await import(
            `../../../app/(posts)/${name}/page.mdx`
          );
          return { slug: name, ...metadata };
        } catch {
          return null;
        }
      })
    );

    const { searchParams } = new URL(request.url);
    const category = decodeURIComponent(searchParams.get("category") || "전체");

    let filteredPosts = posts?.filter((post): post is Post => post !== null);

    if (category && category !== "전체") {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories?.some((cat) => cat === category)
      );
    }

    const sortedPosts = filteredPosts?.sort(
      (a, b) => b.publishDate.getTime() - a.publishDate.getTime()
    );

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
