import { cn } from "@repo/utils";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
  };
}
