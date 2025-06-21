import { NextResponse } from "next/server";
import { getPosts } from "@blog/libs";

/**
 * 게시글의 카테고리 목록과 각 카테고리별 게시글 수를 반환합니다.
 */
export async function GET(): Promise<
  NextResponse<{ category: string; count: number }[] | { error: unknown }>
> {
  try {
    const posts = await getPosts();
    const categoryCountMap = new Map<string, number>();

    posts.forEach((post) => {
      post.categories?.forEach((category) => {
        categoryCountMap.set(
          category,
          (categoryCountMap.get(category) ?? 0) + 1
        );
      });
    });

    const result = [
      { category: "전체", count: posts.length },
      ...Array.from(categoryCountMap.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => a.category.localeCompare(b.category)),
    ];

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
