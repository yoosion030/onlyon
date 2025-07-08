import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostToc from "./PostToc";

const mockUsePostToc = vi.fn();

vi.mock("@blog/components/Post/PostToc", () => ({
  usePostToc: () => mockUsePostToc(),
}));

describe("PostToc", () => {
  it("headingList가 비어있을 때 목차가 노출되지 않아야 한다.", () => {
    mockUsePostToc.mockReturnValue({
      headingList: [],
      activeHeadingId: null,
      handleHeadingClickToScroll: vi.fn(),
    });

    const { container } = render(<PostToc />);
    expect(container.firstChild).toBeNull();
  });

  it("headingList가 있을 경우 목차가 노출되어야 한다.", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "첫 번째 제목" },
      { id: "heading-2", level: 2, text: "두 번째 제목" },
      { id: "heading-3", level: 3, text: "세 번째 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: null,
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    expect(screen.getByText("첫 번째 제목")).toBeInTheDocument();
    expect(screen.getByText("두 번째 제목")).toBeInTheDocument();
    expect(screen.getByText("세 번째 제목")).toBeInTheDocument();
  });

  it("활성화된 heading에 active 스타일이 적용되어야 한다.", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "첫 번째 제목" },
      { id: "heading-2", level: 2, text: "두 번째 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: "heading-2",
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    const activeLink = screen.getByText("두 번째 제목").closest("a");
    expect(activeLink).toHaveClass(
      "text-primary-200",
      "font-semibold",
      "bg-blue-50",
    );
  });

  it("활성화된 heading에 aria-current 속성이 추가되어야 한다.", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "첫 번째 제목" },
      { id: "heading-2", level: 2, text: "두 번째 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: "heading-2",
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    const activeLink = screen.getByText("두 번째 제목").closest("a");
    expect(activeLink).toHaveAttribute("aria-current", "location");
  });

  it("heading 클릭 시 handleHeadingClickToScroll을 호출한다", async () => {
    const mockHandleHeadingClickToScroll = vi.fn();
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "첫 번째 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: null,
      handleHeadingClickToScroll: mockHandleHeadingClickToScroll,
    });

    render(<PostToc />);

    const link = screen.getByText("첫 번째 제목");
    await userEvent.click(link);

    expect(mockHandleHeadingClickToScroll).toHaveBeenCalledWith("heading-1");
  });

  it("heading 레벨에 따라 올바른 margin과 font-size를 적용한다", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "H1 제목" },
      { id: "heading-2", level: 2, text: "H2 제목" },
      { id: "heading-3", level: 3, text: "H3 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: null,
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    const h1Link = screen.getByText("H1 제목").closest("a");
    const h2Link = screen.getByText("H2 제목").closest("a");
    const h3Link = screen.getByText("H3 제목").closest("a");

    // H1: marginLeft = (1-1) * 16 = 0px, fontSize = 16-1 = 15px
    expect(h1Link).toHaveStyle({ marginLeft: "0px", fontSize: "15px" });

    // H2: marginLeft = (2-1) * 16 = 16px, fontSize = 16-2 = 14px
    expect(h2Link).toHaveStyle({ marginLeft: "16px", fontSize: "14px" });

    // H3: marginLeft = (3-1) * 16 = 32px, fontSize = 16-3 = 13px
    expect(h3Link).toHaveStyle({ marginLeft: "32px", fontSize: "13px" });
  });

  it("링크에 올바른 href를 설정한다", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "첫 번째 제목" },
      { id: "heading-2", level: 2, text: "두 번째 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: null,
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    const link1 = screen.getByText("첫 번째 제목").closest("a");
    const link2 = screen.getByText("두 번째 제목").closest("a");

    expect(link1).toHaveAttribute("href", "heading-1");
    expect(link2).toHaveAttribute("href", "heading-2");
  });

  it("여러 heading을 올바르게 렌더링한다", () => {
    const mockHeadingList = [
      { id: "heading-1", level: 1, text: "메인 제목" },
      { id: "heading-2", level: 2, text: "서브 제목 1" },
      { id: "heading-3", level: 3, text: "서브 서브 제목" },
      { id: "heading-4", level: 2, text: "서브 제목 2" },
      { id: "heading-5", level: 1, text: "다른 메인 제목" },
    ];

    mockUsePostToc.mockReturnValue({
      headingList: mockHeadingList,
      activeHeadingId: "heading-3",
      handleHeadingClickToScroll: vi.fn(),
    });

    render(<PostToc />);

    expect(screen.getByText("메인 제목")).toBeInTheDocument();
    expect(screen.getByText("서브 제목 1")).toBeInTheDocument();
    expect(screen.getByText("서브 서브 제목")).toBeInTheDocument();
    expect(screen.getByText("서브 제목 2")).toBeInTheDocument();
    expect(screen.getByText("다른 메인 제목")).toBeInTheDocument();

    // 활성 heading 확인
    const activeLink = screen.getByText("서브 서브 제목").closest("a");
    expect(activeLink).toHaveAttribute("aria-current", "location");
  });
});
