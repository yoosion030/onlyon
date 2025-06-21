import { cn } from "@repo/utils";
import type { MDXComponents } from "mdx/types";
import { PostHeader, RelationPostList } from "@blog/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PostHeader,
    RelationPostList,
    h1: ({ children }) => (
      <h1
        className={cn(
          "text-primary-linear",
          "font-bold",
          "text-[1.75rem]",
          "mt-8",
          "mb-4"
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={cn(
          "text-primary-linear",
          "font-bold",
          "text-[1.5rem]",
          "mt-6",
          "mb-3"
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={cn(
          "text-primary-400",
          "font-bold",
          "text-[1.25rem]",
          "mt-5",
          "mb-2"
        )}
      >
        {children}
      </h3>
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
          "ease-in-out"
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
          "border-primary-300",
          "pl-4",
          "py-1",
          "my-4",
          "bg-primary-50/10",
          "italic",
          "text-gray-700",
          "[&>p:first-child]:mt-0",
          "[&>p:last-child]:mb-0"
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
          "mx-auto"
        )}
      />
    ),
    code: ({ children }) => (
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
          "border-gray-200"
        )}
      >
        {children}
      </code>
    ),
    ...components,
  };
}
