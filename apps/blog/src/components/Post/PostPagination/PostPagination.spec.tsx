import { render, screen } from "@testing-library/react";
import PostPagination from "./PostPagination";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("PostPagination", () => {
  afterEach(() => {
    vi.clearAllMocks();
    mockSearchParams.delete("category");
    mockSearchParams.delete("page");
  });

  it("totalPages가 1 이하일 때는 페이지네이션 버튼이 노출되지 않아야 한다.", () => {
    const { container } = render(
      <PostPagination currentPage={1} totalPages={1} />
    );
    expect(container.firstChild).toBeNull();

    const { container: container2 } = render(
      <PostPagination currentPage={1} totalPages={0} />
    );
    expect(container2.firstChild).toBeNull();
  });

  it("현재 페이지가 1일 때 이전 버튼이 비활성화되어야 한다.", () => {
    render(<PostPagination currentPage={1} totalPages={5} />);

    const previousButton = screen.getByRole("button", {
      name: "이전 페이지로 이동",
    });
    expect(previousButton).toHaveAttribute("disabled");
  });

  it("현재 페이지가 마지막 페이지일 때 다음 버튼이 비활성화되어야 한다.", () => {
    render(<PostPagination currentPage={5} totalPages={5} />);

    const nextButton = screen.getByRole("button", {
      name: "다음 페이지로 이동",
    });
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("Previous 버튼 클릭 시 이전 페이지로 이동해야 한다.", async () => {
    render(<PostPagination currentPage={3} totalPages={5} />);

    const previousButton = screen.getByRole("button", {
      name: "이전 페이지로 이동",
    });
    await userEvent.click(previousButton);

    expect(mockPush).toHaveBeenCalledWith("?page=2");
  });

  it("Next 버튼 클릭 시 다음 페이지로 이동해야 한다.", async () => {
    render(<PostPagination currentPage={3} totalPages={5} />);

    const nextButton = screen.getByRole("button", {
      name: "다음 페이지로 이동",
    });
    await userEvent.click(nextButton);

    expect(mockPush).toHaveBeenCalledWith("?page=4");
  });

  it("첫 번째 페이지에서 Previous 버튼 클릭 시 페이지 이동하지 않아야 한다.", async () => {
    render(<PostPagination currentPage={1} totalPages={5} />);

    const previousButton = screen.getByRole("button", {
      name: "이전 페이지로 이동",
    });
    await userEvent.click(previousButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("마지막 페이지에서 Next 버튼 클릭 시 페이지 이동하지 않아야 한다.", async () => {
    render(<PostPagination currentPage={5} totalPages={5} />);

    const nextButton = screen.getByRole("button", {
      name: "다음 페이지로 이동",
    });
    await userEvent.click(nextButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("현재 페이지는 활성 상태로 표시되어야 한다.", () => {
    render(<PostPagination currentPage={3} totalPages={5} />);

    const currentPageLink = screen.getByRole("link", {
      name: "3",
    });
    expect(currentPageLink).toHaveAttribute("data-active", "true");
  });

  it("페이지가 많을 때 ellipsis가 표시되어야 한다.", () => {
    const { container } = render(
      <PostPagination currentPage={10} totalPages={20} />
    );

    const ellipsis = container.querySelectorAll(
      "span[data-slot='pagination-ellipsis']"
    );
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  describe("URL 생성", () => {
    it("카테고리가 없다면 페이지만 포함된 URL이 생성되어야 한다.", () => {
      render(<PostPagination currentPage={1} totalPages={3} />);

      const pageLink = screen.getByRole("link", {
        name: "2",
      });
      expect(pageLink).toHaveAttribute("href", "?page=2");
    });

    it("선택된 카테고리가 있다면 카테고리가 포함된 페이지 URL이 생성되어야 한다.", () => {
      mockSearchParams.set("category", "JavaScript");

      render(<PostPagination currentPage={1} totalPages={3} />);

      const pageLink = screen.getByRole("link", {
        name: "2",
      });
      expect(pageLink).toHaveAttribute("href", "?category=JavaScript&page=2");
    });
  });
});
