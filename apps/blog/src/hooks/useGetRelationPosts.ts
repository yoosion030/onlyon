import { useEffect, useState } from "react";

import { getRelationPosts } from "@blog/libs";
import { Post as PostType } from "@blog/types";

type GetRelationPostsProps = {
  post: PostType;
};

type GetRelationPostsReturnValue = {
  loading: boolean;
  error: boolean;
  relationPosts: PostType[];
};

export const useGetRelationPosts = ({
  post,
}: GetRelationPostsProps): GetRelationPostsReturnValue => {
  const [relationPosts, setRelationPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRelationPosts = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getRelationPosts({ post });

        setRelationPosts(data || []);
      } catch {
        setError(true);
        setRelationPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelationPosts();
  }, [post]);

  return {
    loading,
    error,
    relationPosts,
  };
};
