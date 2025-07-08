"use client";

import { cn } from "@repo/utils";
import { type MouseEvent, type ReactNode, useRef } from "react";

function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  return "";
}

export type PostHeadingLinkProps = {
  as: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function PostHeadingLink({
  as: Component,
  children,
  className,
  ...props
}: PostHeadingLinkProps) {
  const headingLinkRef = useRef<HTMLHeadingElement | null>(null);
  const textContent = extractTextFromChildren(children);

  const handlePostHeadingLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState(null, "", headingLinkRef.current?.id);

    dispatchEvent(new Event("headingClick"));
  };

  return (
    <Component
      className={cn(className, "group", "flex", "items-center", "gap-1")}
      data-heading="true"
      ref={headingLinkRef}
      {...props}
    >
      <span>{children}</span>
      <a
        href={`#${headingLinkRef.current?.id}`}
        aria-label={`${textContent} 섹션으로 이동`}
        className={cn(
          "text-gray-400",
          "opacity-0",
          "group-hover:opacity-100",
          "hover:text-inherit",
          "transition-opacity",
          "duration-200",
          "no-underline",
          "inline-block",
        )}
        onClick={handlePostHeadingLinkClick}
      >
        <span>#</span>
      </a>
    </Component>
  );
}

export default PostHeadingLink;
