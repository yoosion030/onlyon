import {
  CodeBlock,
  ImageZoom,
  PostHeader,
  PostHeadingLink,
  RelationPostList,
} from "@blog/components";
import { cn } from "@repo/utils";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PostHeader,
    RelationPostList,
    ImageZoom,
    h1: ({ children }) => (
      <PostHeadingLink
        as="h1"
        className={cn(
          "text-primary-linear",
          "font-bold",
          "text-[2.5rem]",
          "mt-10",
          "mb-4",
        )}
      >
        {children}
      </PostHeadingLink>
    ),
    h2: ({ children }) => (
      <PostHeadingLink
        as="h2"
        className={cn(
          "text-primary-400",
          "font-bold",
          "text-[2rem]",
          "mt-10",
          "mb-4",
        )}
      >
        {children}
      </PostHeadingLink>
    ),
    h3: ({ children }) => (
      <PostHeadingLink
        as="h3"
        className={cn(
          "text-primary-400",
          "font-bold",
          "text-[1.5rem]",
          "mt-10",
          "mb-2",
        )}
      >
        {children}
      </PostHeadingLink>
    ),
    p: ({ children }) => (
      <p className={cn("my-4", "leading-relaxed")}>{children}</p>
    ),
    ul: ({ children }) => (
      <ul className={cn("pl-6", "list-disc", "my-4")}>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className={cn("pl-6", "list-decimal", "my-4")}>{children}</ol>
    ),
    li: ({ children }) => <li className={cn("mb-2")}>{children}</li>,
    a: ({ children, href }) => (
      <a
        href={href}
        className={cn(
          "text-primary-400",
          "hover:text-primary",
          "underline",
          "transition-colors",
          "duration-300",
          "ease-in-out",
        )}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className={cn("font-bold", "text-primary-400")}>
        {children}
      </strong>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "border-l-2",
          "border-primary-400",
          "pl-4",
          "py-1",
          "my-4",
          "bg-primary-50/10",
          "text-gray-500",
          "[&>p:first-child]:mt-0",
          "[&>p:last-child]:mb-0",
          "w-full",
          "break-all",
        )}
      >
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr
        className={cn(
          "my-8",
          "border-0",
          "h-px",
          "bg-gray-300",
          "w-full",
          "mx-auto",
        )}
      />
    ),

    code: ({ children, className, ...props }) => {
      const isCodeBlock = className?.includes("language-");

      if (isCodeBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }

      return (
        <code
          className={cn(
            "bg-gray-100",
            "text-primary-700",
            "rounded",
            "px-1.5",
            "py-0.5",
            "font-mono",
            "text-sm",
            "border",
            "border-gray-200",
          )}
          {...props}
        >
          {children}
        </code>
      );
    },

    pre: ({ children, ...props }) => (
      <CodeBlock {...props}>{children}</CodeBlock>
    ),
    img: ({ src, alt, width, height, ...props }) => (
      <ImageZoom
        src={src}
        alt={alt}
        width={width ? Number(width) : undefined}
        height={height ? Number(height) : undefined}
        {...props}
      />
    ),
    ...components,
  };
}
