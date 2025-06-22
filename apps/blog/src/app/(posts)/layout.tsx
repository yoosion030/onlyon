import { PostComment, PostToc } from "@blog/components";
import { Footer, Header } from "@repo/ui";
import { cn } from "@repo/utils";

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header workspace="blog" className={cn("max-w-[52rem]", "px-8")} />

      <div className={cn("max-w-[52rem]", "mx-auto", "px-8")}>
        <article className={cn("py-2")}>{children}</article>
        <PostComment />
      </div>

      <PostToc />
      <Footer className={cn("max-w-[52rem]", "px-8")} />
    </>
  );
}
