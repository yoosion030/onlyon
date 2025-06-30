import { render, screen } from "@testing-library/react";
import CategoryBadge from "./CategoryBadge";

describe("CategoryBadge", () => {
  it("카테고리 정보를 전달하면, 카테고리 정보가 노출되어야 한다.", () => {
    const categoryName = "example";
    render(
      <CategoryBadge category={categoryName} isActive={false} count={0} />
    );

    expect(screen.getByRole("link")).toHaveTextContent(categoryName);
  });

  it("카테고리 이름이 '전체'라면, 링크에 category 파라미터가 없어야 한다.", () => {
    render(<CategoryBadge category="전체" isActive={false} count={0} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("카테고리 이름이 '전체'가 아니라면, 링크에 category 파라미터가 있어야 한다.", () => {
    const categoryName = "example";
    render(
      <CategoryBadge category={categoryName} isActive={false} count={0} />
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `?category=${encodeURIComponent(categoryName)}`
    );
  });

  it("현재 선택된 카테고리라면, 배경색이 설정되어야 한다.", () => {
    const categoryName = "example";
    render(<CategoryBadge category={categoryName} isActive={true} count={0} />);
    expect(screen.getByRole("link")).toHaveClass("bg-primary");
  });

  it("카테고리 개수가 0이면, 개수가 노출되지 않아야 한다.", () => {
    const categoryName = "example";
    render(
      <CategoryBadge category={categoryName} isActive={false} count={0} />
    );
    expect(screen.getByRole("link")).not.toHaveTextContent("(0)");
  });
});
