import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@repo/utils";
import { Button, buttonVariants } from "./button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

type PaginationPreviousProps = {
  disabled?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationPrevious({
  className,
  disabled = false,
  ...props
}: PaginationPreviousProps) {
  return (
    <Button
      aria-label="이전 페이지로 이동"
      size="default"
      variant="ghost"
      disabled={disabled}
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
      asChild={false}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">이전</span>
    </Button>
  );
}

type PaginationNextProps = {
  disabled?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationNext({
  className,
  disabled = false,
  ...props
}: PaginationNextProps) {
  return (
    <Button
      aria-label="다음 페이지로 이동"
      size="default"
      variant="ghost"
      disabled={disabled}
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
      asChild={false}
    >
      <span className="hidden sm:block">다음</span>
      <ChevronRightIcon />
    </Button>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
