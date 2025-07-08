import { getAllPosts } from "@blog/libs";
import type { Category } from "@blog/types";
import { NextResponse } from "next/server";

/**
 * 게시글의 카테고리 목록과 각 카테고리별 게시글 수를 반환합니다.
 */
export async function GET(): Promise<
  NextResponse<Category[] | { error: unknown }>
> {
  try {
    const posts = await getAllPosts();
    const categoryCountMap = new Map<string, number>();

    posts.forEach((post) => {
      post.categories?.forEach((category) => {
        categoryCountMap.set(
          category,
          (categoryCountMap.get(category) ?? 0) + 1,
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
