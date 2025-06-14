import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { type Post } from "@blog/types";

/**
 * 게시글의 카테고리 목록과 각 카테고리별 게시글 수를 반환합니다.
 */
export async function GET(): Promise<
  NextResponse<{ category: string; count: number }[] | { error: unknown }>
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

    const validPosts = posts.filter((post): post is Post => post !== null);
    const categoryCountMap = new Map<string, number>();

    validPosts.forEach((post) => {
      post.categories?.forEach((category) => {
        categoryCountMap.set(
          category,
          (categoryCountMap.get(category) ?? 0) + 1
        );
      });
    });

    const result = [
      { category: "전체", count: validPosts.length },
      ...Array.from(categoryCountMap.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => a.category.localeCompare(b.category)),
    ];

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
