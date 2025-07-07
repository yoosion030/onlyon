import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { type Post } from "@blog/types";
import { getAllPosts } from "@blog/libs";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || ""
);

const DEFAULT_RECOMMENDATIONS = [0, 1, 2];

const getPrompt = (currentTitle: string, allPosts: Post[]) => `
현재 블로그 제목: "${currentTitle}"

다음 블로그 글들 중에서 현재 글과 가장 연관성이 높은 3개를 추천해주세요:
${allPosts.map((post, i) => `${i + 1}. ${post.title}`).join("\n")}

중요: 반드시 다음 형식으로만 응답해주세요:
[1, 3, 5]

다른 설명 없이 오직 JSON 배열만 반환해주세요.
`;

const extractIndices = (responseText: string, totalPosts: number): number[] => {
  try {
    const match = responseText.match(/\[[\d,\s]+\]/);
    if (!match) return DEFAULT_RECOMMENDATIONS;

    const parsed = JSON.parse(match[0]);
    return parsed
      .filter((i: number) => i >= 1 && i <= totalPosts)
      .map((i: number) => i - 1);
  } catch {
    return DEFAULT_RECOMMENDATIONS;
  }
};

const sortRecommendationsByDate = (
  recommendations: Post[],
  currentPost: Post
): Post[] => {
  const currentDate = new Date(currentPost.publishDate);

  const future = recommendations
    .filter((post) => new Date(post.publishDate) > currentDate)
    .sort(
      (a, b) =>
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    );

  const past = recommendations
    .filter((post) => new Date(post.publishDate) <= currentDate)
    .sort(
      (a, b) =>
        new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
    );

  return [...future, ...past];
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<Post[]>> {
  try {
    const { currentPost } = await request.json();
    const currentTitle = currentPost?.title || "";

    const allPosts = (await getAllPosts()).filter(
      (post) => post.title !== currentTitle
    );

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = getPrompt(currentTitle, allPosts);

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    const indices = extractIndices(responseText, allPosts.length);

    const recommendations = indices
      .map((i) => allPosts[i])
      .filter((post) => post !== undefined);

    const sortedRecommendations = sortRecommendationsByDate(
      recommendations,
      currentPost
    );
    return NextResponse.json(sortedRecommendations);
  } catch {
    try {
      const allPosts = await getAllPosts();
      const fallback = allPosts
        .sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        )
        .slice(0, 3);
      return NextResponse.json(fallback);
    } catch {
      return NextResponse.json([]);
    }
  }
}
