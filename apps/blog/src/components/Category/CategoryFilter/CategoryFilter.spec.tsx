import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryFilter from "./CategoryFilter";
import { type CategoryBadgeProps } from "../CategoryBadge";

const mockUseSearchParams = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

vi.mock("@blog/components", () => ({
  ...vi.importActual("@blog/components"),
  CategoryBadge: ({ category, isActive, count = 0 }: CategoryBadgeProps) => (
    <div
      data-testid={`category-badge-${category}`}
      data-active={isActive}
      data-count={count}
    >
      {category} {count && count > 0 && `(${count})`}
    </div>
  ),
}));

const mockCategories = [
  { category: "전체", count: 10 },
  { category: "React", count: 5 },
  { category: "TypeScript", count: 3 },
  { category: "JavaScript", count: 2 },
];

describe("CategoryFilter", () => {
  it("모든 카테고리가 노출되어야 한다.", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<CategoryFilter categories={mockCategories} />);

    expect(screen.getByTestId("category-badge-전체")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-React")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-TypeScript")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-JavaScript")).toBeInTheDocument();
  });

  it("선택된 카테고리가 없을 때 기본적으로 '전체'가 활성화되어야 한다.", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<CategoryFilter categories={mockCategories} />);

    const 전체Badge = screen.getByTestId("category-badge-전체");
    expect(전체Badge).toHaveAttribute("data-active", "true");
  });

  it("URL 파라미터에 따라 올바른 카테고리가 활성화되어야 한다.", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("category=React"));

    render(<CategoryFilter categories={mockCategories} />);

    const reactBadge = screen.getByTestId("category-badge-React");
    expect(reactBadge).toHaveAttribute("data-active", "true");

    const 전체Badge = screen.getByTestId("category-badge-전체");
    expect(전체Badge).toHaveAttribute("data-active", "false");
  });

  it("각 카테고리에 개수가 노출되어야 한다.", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<CategoryFilter categories={mockCategories} />);

    expect(screen.getByTestId("category-badge-전체")).toHaveAttribute(
      "data-count",
      "10"
    );
    expect(screen.getByTestId("category-badge-React")).toHaveAttribute(
      "data-count",
      "5"
    );
    expect(screen.getByTestId("category-badge-TypeScript")).toHaveAttribute(
      "data-count",
      "3"
    );
    expect(screen.getByTestId("category-badge-JavaScript")).toHaveAttribute(
      "data-count",
      "2"
    );
  });

  it("카테고리 데이터가 없을 때 모든 카테고리가 노출되지 않아야 한다.", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<CategoryFilter categories={[]} />);

    expect(screen.queryByTestId(/category-badge-/)).not.toBeInTheDocument();
  });
});
