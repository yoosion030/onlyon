"use client";

import { usePostToc } from "@blog/components/Post/PostToc";
import { cn } from "@repo/utils";
import Link from "next/link";
import type { MouseEvent } from "react";

const STYLES = {
  MARGIN_PER_LEVEL: 16,
  BASE_FONT_SIZE: 16,
  LEVEL_OFFSET: 1,
} as const;

const getMarginLeft = (level: number): number => {
  return (level - STYLES.LEVEL_OFFSET) * STYLES.MARGIN_PER_LEVEL;
};

const getFontSize = (level: number): number => {
  return STYLES.BASE_FONT_SIZE - level;
};

const PostToc = () => {
  const { headingList, activeHeadingId, handleHeadingClickToScroll } =
    usePostToc();

  const handlePostTocClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    handleHeadingClickToScroll(id);
  };

  if (headingList.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute",
        "top-0",
        "h-full",
        "right-30",
        "max-3xl:hidden",
        "block",
        "max-w-[21.875rem]",
      )}
    >
      <div className={cn("sticky", "top-13", "p-4")}>
        <nav aria-label="Table of contents">
          <ul className={cn("space-y-2")}>
            {headingList.map(({ id, level, text }) => {
              const isActive = activeHeadingId === id;

              return (
                <li key={id}>
                  <Link
                    href={id}
                    onClick={(e) => handlePostTocClick(e, id)}
                    className={cn(
                      "block",
                      "text-sm",
                      "leading-tight",
                      "transition-colors",
                      "duration-200",
                      "p-2",
                      "rounded-sm",
                      "w-full",
                      "hover:bg-blue-50",
                      "hover:text-primary-200",
                      "overflow-hidden",
                      "whitespace-nowrap",
                      "text-ellipsis",
                      isActive
                        ? ["text-primary-200", "font-semibold", "bg-blue-50"]
                        : ["text-primary-400"],
                    )}
                    style={{
                      marginLeft: `${getMarginLeft(level)}px`,
                      fontSize: `${getFontSize(level)}px`,
                    }}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PostToc;
