import { cn } from "@repo/utils";
import {
  Post,
  RepresentPost,
  CategoryFilter,
  RecommendPost,
} from "@blog/components";
import { Header, Footer } from "@repo/ui";
import { type Post as PostType } from "@blog/types";

type HomeProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const selectedCategory = (await searchParams).category;

  const buildApiUrl = (endpoint: string) => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint);
    if (selectedCategory) {
      url.searchParams.set("category", selectedCategory);
    }
    return url.toString();
  };

  const [posts, categories, recommendPosts] = await Promise.all([
    fetch(buildApiUrl("/api/posts"), {
      cache: "force-cache",
    }).then((res) => res.json()) as Promise<PostType[]>,

    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/posts/category", {
      cache: "force-cache",
    }).then((res) => res.json()) as Promise<
      { category: string; count: number }[]
    >,

    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/posts/recommend", {
      cache: "force-cache",
    }).then((res) => res.json()) as Promise<PostType[]>,
  ]);

  const representPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <Header workspace="blog" className={cn("max-w-[75rem]", "px-8")} />
      <div className={cn("max-w-[75rem]", "mx-auto", "px-8")}>
        <main
          className={cn(
            "mx-auto",
            "flex",
            "flex-col",
            "gap-[3.125rem]",
            "my-[3.125rem]"
          )}
        >
          <div className={cn("flex", "flex-col", "gap-6")}>
            <div className={cn("flex", "gap-[4.375rem]")}>
              <div className={cn("max-w-[43.75rem]", "space-y-6")}>
                <CategoryFilter categories={categories} />
                {representPost && <RepresentPost post={representPost} />}
              </div>
              {recommendPosts.length > 0 && (
                <div
                  className={cn("lg:block", "hidden", "flex-1", "space-y-6")}
                >
                  <h2
                    className={cn(
                      "text-primary-linear",
                      "font-bold",
                      "text-[1.75rem]",
                      "pl-2",
                      "w-full"
                    )}
                  >
                    추천 포스팅
                  </h2>
                  <div className={cn("flex", "flex-col", "gap-4")}>
                    {recommendPosts.map((post, index) => (
                      <RecommendPost key={index} {...post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={cn("flex", "flex-col", "gap-[3.125rem]")}>
            {otherPosts.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
                {otherPosts.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer className={cn("max-w-[75rem]", "px-8")} />
    </>
  );
}
