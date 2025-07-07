import { NextRequest, NextResponse } from "next/server";
import { type Post } from "@blog/types";
import { getAllPosts } from "@blog/libs";

type PaginatedResponse = {
  posts: Post[];
  totalPages: number;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse | { error: unknown }>> {
  try {
    let posts = await getAllPosts();


    const { searchParams } = new URL(request.url);
    const category = decodeURIComponent(searchParams.get("category") || "전체");
    const currentPage = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "10") || 10;

    if (category && category !== "전체") {
      posts = posts.filter((post) =>
        post.categories?.some((cat) => cat === category)
      );
    }

    const sortedPosts = posts?.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    const totalPosts = sortedPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

    const response: PaginatedResponse = {
      posts: paginatedPosts,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
