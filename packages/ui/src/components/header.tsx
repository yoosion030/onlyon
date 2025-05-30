import { cn } from "@repo/utils";

type WorkspaceType = "blog" | "portfolio";
type HeaderProps = {
  workspace: WorkspaceType;
};

export const Header = ({ workspace }: HeaderProps) => {
  return (
    <header
      className={cn("sticky", "top-0", "backdrop-blur-sm", "bg-white/10")}
    >
      <div
        className={cn(
          "w-full",
          "h-[3.25rem]",
          "mx-auto",
          "flex",
          "justify-between",
          "items-center"
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
              className={cn("text-primary", "font-semibold")}
            >
              Portfolio
            </a>
          )}
          {workspace === "portfolio" && (
            <a
              href={process.env.NEXT_PUBLIC_BLOG_URL}
              className={cn("text-primary", "font-semibold")}
            >
              Blog
            </a>
          )}

          <a
            href="https://github.com/yoosion030/onlyon"
            target="_blank"
            rel="noreferrer"
            className={cn("text-primary", "font-semibold")}
          >
            Github
          </a>
        </div>
      </div>
    </header>
  );
};
