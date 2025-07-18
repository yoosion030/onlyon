import { Description, Group } from "@portfolio/components";
import { cn } from "@repo/utils";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

export const H1 = ({ children, className, ...props }: ComponentProps<"h1">) => (
  <h1
    className={cn(
      "text-primary-linear",
      "font-black",
      "text-[2rem]",
      "mt-20",
      "mb-8",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);

export const Ul = ({ children, className, ...props }: ComponentProps<"ul">) => (
  <ul className={cn("pl-6", "list-disc", className)} {...props}>
    {children}
  </ul>
);

export const Li = ({ children, className, ...props }: ComponentProps<"li">) => (
  <li className={cn("leading-[1.875rem]", "font-normal", className)} {...props}>
    {children}
  </li>
);

export const A = ({ children, className, ...props }: ComponentProps<"a">) => (
  <a
    className={cn(
      "hover:text-primary",
      "underline",
      "transition-colors",
      "duration-300",
      "ease-in-out",
      "underline-offset-3",
      className,
    )}
    {...props}
  >
    {children}
  </a>
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: ({ children, className, ...props }) => (
      <h2 className={cn("font-bold", "text-[1.5rem]", className)} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, className, ...props }) => (
      <h3 className={cn("font-bold", "text-[1.25rem]", className)} {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, className, ...props }) => (
      <h4 className={cn("font-bold", "text-[1rem]", className)} {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, className, ...props }) => (
      <h5 className={cn("font-bold", "text-[0.875rem]", className)} {...props}>
        {children}
      </h5>
    ),
    p: ({ children }) => children,
    ul: Ul,
    ol: ({ children }) => (
      <ol className={cn("pl-6", "list-decimal", "my-4")}>{children}</ol>
    ),
    li: Li,
    a: A,
    strong: ({ children }) => (
      <strong className={cn("font-bold", "text-primary-400")}>
        {children}
      </strong>
    ),
    Description,
    Group,
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

    u: ({ children }) => (
      <u className={cn("text-primary-400", "underline")}>{children}</u>
    ),

    ...components,
  };
}
