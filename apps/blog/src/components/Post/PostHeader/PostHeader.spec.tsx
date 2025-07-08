import type { CategoryBadgeProps } from "@blog/components/Category/CategoryBadge";
import type { PostHeadingLinkProps } from "@blog/components/Post/PostHeadingLink";
import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import PostHeader from "./PostHeader";

vi.mock("@blog/components", () => ({
  ...vi.importActual("@blog/components"),
  CategoryBadge: ({ category, isActive }: CategoryBadgeProps) => (
    <div data-testid={`category-badge-${category}`} data-active={isActive}>
      {category}
    </div>
  ),
  PostHeadingLink: ({ children, className, as }: PostHeadingLinkProps) => {
    const Component = as || "div";
    return (
      <Component data-testid="post-heading" className={className}>
        {children}
      </Component>
    );
  },
  /* eslint-disable @next/next/no-img-element */
  ImageZoom: ({
    src,
    alt,
    width,
    height,
    className,
  }: ComponentProps<"img">) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="image-zoom"
    />
  ),
}));

const mockPost = {
  title: "테스트 포스트 제목",
  description: "테스트 포스트 설명",
  publishDate: new Date("2024-01-01"),
  posterImage: "https://example.com/poster.jpg",
  categories: ["React", "TypeScript"],
  slug: "/test-post",
};

const mockPostWithoutImage = {
  title: "이미지 없는 포스트",
  description: "이미지가 없는 포스트 설명",
  publishDate: new Date("2024-01-02"),
  categories: ["JavaScript"],
  slug: "/test-post-no-image",
};

describe("PostHeader", () => {
  it("포스트 제목을 올바르게 렌더링한다", async () => {
    render(<PostHeader post={mockPost} />);

    expect(screen.getByTestId("post-heading")).toHaveTextContent(
      "테스트 포스트 제목",
    );
  });

  it("포스트 날짜를 올바른 형식으로 표시한다", async () => {
    render(<PostHeader post={mockPost} />);

    const expectedDate = new Date("2024-01-01").toLocaleDateString();
    expect(screen.getByText(new RegExp(expectedDate))).toBeInTheDocument();
  });

  it("모든 카테고리를 렌더링한다", async () => {
    render(<PostHeader post={mockPost} />);

    expect(screen.getByTestId("category-badge-React")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-TypeScript")).toBeInTheDocument();
  });

  it("카테고리 배지가 비활성 상태로 렌더링된다", async () => {
    render(<PostHeader post={mockPost} />);

    const reactBadge = screen.getByTestId("category-badge-React");
    const typescriptBadge = screen.getByTestId("category-badge-TypeScript");

    expect(reactBadge).toHaveAttribute("data-active", "false");
    expect(typescriptBadge).toHaveAttribute("data-active", "false");
  });

  it("포스터 이미지가 있을 때 이미지를 표시한다", async () => {
    render(<PostHeader post={mockPost} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/poster.jpg");
    expect(image).toHaveAttribute("alt", "테스트 포스트 제목");
  });

  it("포스터 이미지가 없을 때 이미지를 표시하지 않는다", async () => {
    render(<PostHeader post={mockPostWithoutImage} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("제목에 올바른 스타일이 적용된다", async () => {
    render(<PostHeader post={mockPost} />);

    const heading = screen.getByTestId("post-heading");
    expect(heading).toHaveClass(
      "text-[2.5rem]",
      "text-primary-linear",
      "font-bold",
    );
  });

  it("날짜와 카테고리 구분자가 올바르게 표시된다", async () => {
    render(<PostHeader post={mockPost} />);

    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("빈 카테고리 배열을 처리한다", async () => {
    const postWithNoCategories = {
      ...mockPost,
      categories: [],
    };

    render(<PostHeader post={postWithNoCategories} />);

    expect(screen.queryByTestId(/category-badge-/)).not.toBeInTheDocument();
  });

  it("여러 카테고리를 올바르게 처리한다", async () => {
    const postWithManyCategories = {
      ...mockPost,
      categories: ["React", "TypeScript", "JavaScript", "Next.js"],
    };

    render(<PostHeader post={postWithManyCategories} />);

    expect(screen.getByTestId("category-badge-React")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-TypeScript")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-JavaScript")).toBeInTheDocument();
    expect(screen.getByTestId("category-badge-Next.js")).toBeInTheDocument();
  });

  it("확대 가능한 이미지가 노출되어야 한다.", async () => {
    render(<PostHeader post={mockPost} />);

    const imageZoom = screen.getByTestId("image-zoom");
    expect(imageZoom).toBeInTheDocument();
  });
});
