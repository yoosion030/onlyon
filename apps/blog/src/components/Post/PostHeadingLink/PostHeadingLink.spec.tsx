import { render, screen } from "@testing-library/react";
import { PostHeadingLink } from "./PostHeadingLink";
import userEvent from "@testing-library/user-event";

// window.history.pushState 모킹
const mockPushState = vi.fn();
Object.defineProperty(window, "history", {
  value: {
    pushState: mockPushState,
  },
  writable: true,
});

const mockDispatchEvent = vi.fn();
Object.defineProperty(window, "dispatchEvent", {
  value: mockDispatchEvent,
  writable: true,
});

describe("PostHeadingLink", () => {
  it("제목이 노출되어야 한다.", () => {
    render(
      <PostHeadingLink as="h1" className="test-class">
        테스트 제목
      </PostHeadingLink>
    );

    expect(screen.getByText("테스트 제목")).toBeInTheDocument();
  });

  it("HTML 태그 정보를 전달할 수 있다.", () => {
    const { container } = render(
      <PostHeadingLink as="h2" className="test-class">
        테스트 제목
      </PostHeadingLink>
    );

    const heading = container.querySelector("h2");
    expect(heading).toBeInTheDocument();
  });

  it("링크 제목을 구분하는 data-heading 속성을 가진다.", () => {
    const { container } = render(
      <PostHeadingLink as="h1" className="test-class">
        테스트 제목
      </PostHeadingLink>
    );

    const heading = container.querySelector("[data-heading='true']");
    expect(heading).toBeInTheDocument();
  });

  it("제목을 클릭하면 해당 섹션으로 이동한다.", async () => {
    const { container } = render(
      <PostHeadingLink as="h1" className="test-class">
        테스트 제목
      </PostHeadingLink>
    );

    const link = screen.getByRole("link");
    const heading = container.querySelector("h1");

    await userEvent.click(link);

    expect(mockPushState).toHaveBeenCalledWith(null, "", heading?.id);
    expect(mockDispatchEvent).toHaveBeenCalledWith(expect.any(Event));
  });

  it("제목 뒤에 # 기호가 노출되어야 한다.", () => {
    render(
      <PostHeadingLink as="h1" className="test-class">
        테스트 제목
      </PostHeadingLink>
    );

    expect(screen.getByText("#")).toBeInTheDocument();
  });

  it("배열 형태의 자식 요소를 넘길 경우 문자열로 처리한다.", () => {
    render(
      <PostHeadingLink as="h1" className="test-class">
        {["배열", "형태", "제목"]}
      </PostHeadingLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "배열형태제목 섹션으로 이동");
  });

  it("빈 자식 요소를 넘길 경우 빈 문자열로 처리한다.", () => {
    render(
      <PostHeadingLink as="h1" className="test-class">
        {""}
      </PostHeadingLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", " 섹션으로 이동");
  });
});
