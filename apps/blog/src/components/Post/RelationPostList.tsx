"use client";

import { type Post as PostType } from "@blog/types";
import { cn } from "@repo/utils";
import { useGetRelationPosts } from "@blog/hooks";
import { PostHeadingLink, SkeletonPost, PostItem } from "@blog/components";

const RelationPostList = ({ post }: { post: PostType }) => {
  const { relationPosts, loading, error } = useGetRelationPosts({ post });

  return (
    <div className={cn("mb-[1rem]", "mt-[8rem]")}>
      <PostHeadingLink
        as="h2"
        className={cn(
          "text-primary-linear",
          "font-bold",
          "text-[1.75rem]",
          "w-full",
          "mb-2"
        )}
      >
        연관 포스트 {!loading && `(${relationPosts.length})`}
      </PostHeadingLink>

      <p
        className={cn(
          "text-primary-400",
          "font-thin",
          "text-[0.75rem]",
          "mb-4"
        )}
      >
        Gemini AI Prompt 기반으로 생성한 연관 포스트입니다.
      </p>

      {loading ? (
        <div
          className={cn(
            "flex",
            "gap-4",
            "w-full",
            "overflow-x-scroll",
            "overflow-y-hidden"
          )}
        >
          <div className={cn("flex", "gap-4", "w-full")}>
            {[...Array(3)].map((_, i) => {
              return (
                <div className={cn("w-[18.75rem]", "shrink-0")} key={i}>
                  <SkeletonPost />
                </div>
              );
            })}
          </div>
        </div>
      ) : error ? (
        <p className={cn("text-red-400", "font-thin", "text-[0.75rem]")}>
          연관 포스트를 불러오는데 실패했습니다.
        </p>
      ) : relationPosts.length > 0 ? (
        <div
          className={cn(
            "flex",
            "gap-4",
            "w-full",
            "overflow-x-scroll",
            "overflow-y-hidden"
          )}
        >
          {relationPosts.map((post: PostType) => (
            <div className={cn("w-[18.75rem]", "shrink-0")} key={post.slug}>
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p className={cn("text-primary-400", "font-thin", "text-[0.75rem]")}>
          연관 포스트가 없습니다.
        </p>
      )}
    </div>
  );
};

export default RelationPostList;
