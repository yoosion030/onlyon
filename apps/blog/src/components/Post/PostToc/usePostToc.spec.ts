import { renderHook, act, fireEvent } from "@testing-library/react";
import { usePostToc } from "./usePostToc";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

const mockQuerySelectorAll = vi.fn();
const mockGetElementById = vi.fn();
const mockGetBoundingClientRect = vi.fn(() => ({ top: 50 }));

Object.defineProperty(window, "scrollY", {
  value: 0,
  writable: true,
});

Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "addEventListener", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "removeEventListener", {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(window, "location", {
  value: {
    hash: "",
  },
  writable: true,
});

Object.defineProperty(document, "querySelectorAll", {
  value: mockQuerySelectorAll,
  writable: true,
});

Object.defineProperty(document, "getElementById", {
  value: mockGetElementById,
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    scrollTop: 0,
  },
  writable: true,
});

describe("usePostToc", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue("/test-post");
  });

  afterEach(() => {
    vi.clearAllMocks();
    window.location.hash = "";
  });

  it("PostHeadingLink 컴포넌트에서 생성된 heading 요소들을 파싱한다.", () => {
    const mockHeadingElements = [
      {
        tagName: "H1",
        id: "heading-1",
        textContent: "첫 번째 제목",
      },
      {
        tagName: "H2",
        id: "",
        textContent: "두 번째 제목",
      },
      {
        tagName: "H3",
        id: "heading-3",
        textContent: "세 번째 제목",
      },
    ];

    mockQuerySelectorAll.mockReturnValue(mockHeadingElements);

    const { result } = renderHook(() => usePostToc());

    expect(result.current.headingList).toHaveLength(3);
    expect(result.current.headingList[0]).toEqual({
      id: "heading-1",
      text: "첫 번째 제목",
      level: 1,
      element: mockHeadingElements[0],
    });
    expect(result.current.headingList[1]).toEqual({
      id: "#2-1",
      text: "두 번째 제목",
      level: 2,
      element: mockHeadingElements[1],
    });
    expect(result.current.headingList[2]).toEqual({
      id: "heading-3",
      text: "세 번째 제목",
      level: 3,
      element: mockHeadingElements[2],
    });
  });

  it("클릭한 heading 요소로 스크롤 되어야 한다.", () => {
    const mockElement = {
      offsetTop: 100,
    };

    mockGetElementById.mockReturnValue(mockElement);
    mockQuerySelectorAll.mockReturnValue([]);

    const { result } = renderHook(() => usePostToc());

    act(() => {
      result.current.handleHeadingClickToScroll("test-heading");
    });

    expect(mockGetElementById).toHaveBeenCalledWith("test-heading");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 28, // 100 - 52 - 20
      behavior: "smooth",
    });
    expect(result.current.activeHeadingId).toBe("test-heading");
  });

  it("URL 해시가 있을 때 자동으로 해당 섹션으로 이동되어야 한다.", () => {
    window.location.hash = "#test-heading";

    const mockElement = {
      offsetTop: 200,
    };

    mockGetElementById.mockReturnValue(mockElement);
    mockQuerySelectorAll.mockReturnValue([]);

    renderHook(() => usePostToc());

    expect(mockGetElementById).toHaveBeenCalledWith("#test-heading");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 128, // 200 - 52 - 20
      behavior: "smooth",
    });
  });

  it("pathname이 변경될 때 heading 리스트가 변경되어야 한다.", () => {
    const mockHeadingElements = [
      {
        tagName: "H1",
        id: "heading-1",
        textContent: "제목",
        getBoundingClientRect: mockGetBoundingClientRect,
      },
    ];

    mockQuerySelectorAll.mockReturnValue(mockHeadingElements);
    mockGetElementById.mockReturnValue(mockHeadingElements[0]);

    const { result, rerender } = renderHook(() => usePostToc());

    expect(result.current.headingList).toHaveLength(1);

    mockUsePathname.mockReturnValue("/different-post");
    rerender();

    expect(result.current.headingList).toHaveLength(1);
  });

  it("스크롤 위치에 따라 노출되는 heading이 활성화되어야 한다.", () => {
    const mockHeadingElements = [
      {
        tagName: "H1",
        id: "heading-1",
        textContent: "첫 번째 제목",
      },
      {
        tagName: "H2",
        id: "heading-2",
        textContent: "두 번째 제목",
      },
    ];

    const mockElements = [
      {
        getBoundingClientRect: () => ({ top: 50 }),
      },
      {
        getBoundingClientRect: () => ({ top: 150 }),
      },
    ];

    mockQuerySelectorAll.mockReturnValue(mockHeadingElements);
    mockGetElementById
      .mockReturnValueOnce(mockElements[0])
      .mockReturnValueOnce(mockElements[1]);

    const { result } = renderHook(() => usePostToc());

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 150 } });
    });

    expect(result.current.activeHeadingId).toBe("heading-2");
  });

  it("heading 클릭 중에는 스크롤 이벤트가 무시되어야 한다.", () => {
    const mockHeadingElements = [
      {
        tagName: "H1",
        id: "heading-1",
        textContent: "첫 번째 제목",
      },
      {
        tagName: "H2",
        id: "heading-2",
        textContent: "두 번째 제목",
      },
    ];

    const mockElements = [
      {
        getBoundingClientRect: () => ({ top: 50 }),
      },
      {
        getBoundingClientRect: () => ({ top: 150 }),
      },
    ];

    mockQuerySelectorAll.mockReturnValue(mockHeadingElements);
    mockGetElementById
      .mockReturnValueOnce(mockElements[0])
      .mockReturnValueOnce(mockElements[1]);

    const { result } = renderHook(() => usePostToc());

    act(() => {
      result.current.handleHeadingClickToScroll("heading-1");
    });

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 150 } });
    });

    expect(result.current.activeHeadingId).toBe("heading-1");
  });
});
