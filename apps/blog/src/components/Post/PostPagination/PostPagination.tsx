"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";
import { cn } from "@repo/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { getPagination } from "./pagination";

type PostPaginationProps = {
  currentPage: number;
  totalPages: number;
};

const PostPagination = ({ currentPage, totalPages }: PostPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    const category = params.get("category");
    params.set("page", page.toString());

    if (category) {
      params.set("category", category);
    }
    return `?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    const url = createPageUrl(page);
    router.push(url);
  };

  if (totalPages <= 1) return null;

  const visiblePages = getPagination(currentPage, totalPages);

  return (
    <Pagination className={cn("w-full", "flex", "justify-center")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage === 1) return;

              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page)}
                isActive={currentPage === page}
                className={cn("text-primary-400")}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage === totalPages) return;
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
            className={cn("text-primary-400")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;
