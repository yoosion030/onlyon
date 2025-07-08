import {
  CategoryFilter,
  PostItem,
  PostPagination,
  RecommendPost,
  RepresentPost,
} from "@blog/components";
import { getCategory, getPosts, getRecommendPosts } from "@blog/libs";
import { Footer, Header } from "@repo/ui";
import { cn } from "@repo/utils";

type HomeProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function Home(props: HomeProps) {
  const { searchParams } = props;
  const params = await searchParams;
  const selectedCategory = params.category;
  const currentPage = parseInt(params.page || "1");

  const [postsData, categories, recommendPosts] = await Promise.all([
    getPosts({ category: selectedCategory, page: currentPage, limit: 10 }),
    getCategory(),
    getRecommendPosts(),
  ]);

  const { posts, totalPages } = postsData;
  const representPost = posts?.[0];
  const otherPosts = posts?.slice(1);

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
            "my-[3.125rem]",
          )}
        >
          <div className={cn("flex", "flex-col", "gap-6")}>
            <div className={cn("flex", "gap-[4.375rem]")}>
              <div className={cn("max-w-[43.75rem]", "space-y-6")}>
                <CategoryFilter categories={categories} />
                {representPost && <RepresentPost post={representPost} />}
              </div>
              {recommendPosts?.length > 0 && (
                <div
                  className={cn(
                    "max-lg:hidden",
                    "flex-1",
                    "space-y-6",
                    "block",
                  )}
                >
                  <h2
                    className={cn(
                      "text-primary-linear",
                      "font-bold",
                      "text-[1.75rem]",
                      "pl-2",
                      "w-full",
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
            {otherPosts?.length > 0 && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                {otherPosts.map((post, index) => (
                  <PostItem key={index} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <PostPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </main>
      </div>
      <Footer className={cn("max-w-[75rem]", "px-8")} />
    </>
  );
}
