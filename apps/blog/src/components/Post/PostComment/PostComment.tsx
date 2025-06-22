"use client";

import { cn } from "@repo/utils";
import { useRef } from "react";
import useCommentSetting from "./useCommentSetting";

const PostComment = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useCommentSetting({ containerRef });

  return <div className={cn("mb-8")} ref={containerRef}></div>;
};

export default PostComment;
