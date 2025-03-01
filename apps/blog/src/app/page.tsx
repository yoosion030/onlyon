import { cn } from "@repo/utils";
import { getPosts } from "./getPosts";
import Post from "../components/Post";
import RepresentPost from "../components/RepresentPost";
import { Header, Footer } from "@repo/ui";

export default async function Home() {
  const posts = await getPosts();

  const representPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className={cn("max-w-[75rem]", "mx-auto", "px-8")}>
      <Header workspace="blog" />

      <main className={cn("mx-auto", "flex", "flex-col", "gap-[3.125rem]")}>
        {representPost && <RepresentPost post={representPost} />}
        <div className={cn("grid", "grid-cols-3", "gap-y-5")}>
          {otherPosts.map((post, index) => (
            <Post key={`${post.title}-${index}`} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
