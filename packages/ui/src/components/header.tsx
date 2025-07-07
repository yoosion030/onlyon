import { cn } from "@repo/utils";
import { HTMLAttributes } from "react";

type WorkspaceType = "blog" | "portfolio";
type HeaderProps = {
  workspace: WorkspaceType;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Header = ({ workspace, className, ...props }: HeaderProps) => {
  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "backdrop-blur-sm",
        "bg-white/10",
        "z-10"
      )}
    >
      <div
        {...props}
        className={cn(
          "h-[3.25rem]",
          "mx-auto",
          "flex",
          "justify-between",
          "items-center",
          className
        )}
      >
        <a
          href="/"
          className={cn("text-primary-linear", "font-extrabold", "text-xl")}
        >
          OnlyOn.
        </a>
        <div className={cn("flex", "gap-10")}>
          {workspace === "blog" && (
            <a
              href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}
              className={cn("text-primary-linear", "font-semibold")}
            >
              Portfolio
            </a>
          )}
          {workspace === "portfolio" && (
            <a
              href={process.env.NEXT_PUBLIC_BLOG_URL}
              className={cn("text-primary-linear", "font-semibold")}
            >
              Blog
            </a>
          )}

          <a
            href="https://github.com/yoosion030/onlyon"
            target="_blank"
            rel="noreferrer"
            className={cn("text-primary-linear", "font-semibold")}
          >
            Github
          </a>
        </div>
      </div>
    </header>
  );
};
