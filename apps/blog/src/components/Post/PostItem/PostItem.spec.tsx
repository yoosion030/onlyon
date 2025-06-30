import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostItem from "./PostItem";

vi.mock("@blog/components", () => ({
  ...vi.importActual("@blog/components"),

  GeneratedPosterImage: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="generated-poster" src={src} alt={alt} />
  ),
}));

const mockPost = {
  title: "테스트 포스트",
  description: "테스트 포스트 설명입니다.",
  publishDate: new Date("2024-01-01"),
  posterImage: "https://example.com/image.jpg",
  categories: ["React", "TypeScript"],
  slug: "/test-post",
};

const mockPostWithoutImage = {
  title: "이미지 없는 포스트",
  description: "이미지가 없는 포스트 설명입니다.",
  publishDate: new Date("2024-01-02"),
  categories: ["JavaScript"],
  slug: "/test-post-no-image",
};

describe("PostItem", () => {
  describe("기본적으로", () => {
    beforeEach(() => {
      render(<PostItem post={mockPost} />);
    });

    it("포스트 제목, 설명 정보가 노출되어야 한다.", () => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.description)).toBeInTheDocument();
    });

    it("포스트에 링크 정보가 존재해야 한다.", () => {
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test-post");
    });

    it("날짜 정보가 노출되어야 한다.", () => {
      const expectedDate = new Date("2024-01-01").toLocaleDateString();
      expect(screen.getByText(new RegExp(expectedDate))).toBeInTheDocument();
    });

    it("카테고리 정보가 노출되어야 한다.", () => {
      expect(screen.getByText("React, TypeScript")).toBeInTheDocument();
    });
  });

  describe("포스터 이미지가 있는 경우", () => {
    beforeEach(() => {
      render(<PostItem post={mockPost} />);
    });

    it("포스터 이미지가 있을 때 이미지를 표시한다", () => {
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      expect(image).toHaveAttribute("alt", "테스트 포스트");
    });
  });

  describe("포스터 이미지가 없는 경우", () => {
    beforeEach(() => {
      render(<PostItem post={mockPostWithoutImage} />);
    });

    it("생성된 포스터 이미지가 노출되어야 한다.", () => {
      expect(screen.getByTestId("generated-poster")).toBeInTheDocument();
    });
  });
});
