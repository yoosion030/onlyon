import { render, screen, waitFor } from "@testing-library/react";
import CodeBlock from "./CodeBlock";
import userEvent from "@testing-library/user-event";

const mockWriteText = vi.fn();

Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe("CodeBlock", () => {
  const mockChildrenWithLanguage = {
    props: {
      className: "language-javascript",
      children: "const greeting = 'Hello, World!';",
    },
  };

  const mockChildrenWithoutLanguage = {
    props: {
      children: "console.log('Hello');",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("코드와 언어 정보가 노출되어야 한다.", () => {
    const { container } = render(
      <CodeBlock>{mockChildrenWithLanguage}</CodeBlock>
    );

    expect(screen.getByText("javascript")).toBeInTheDocument();
    expect(container.querySelector("pre")?.textContent).toBe(
      "const greeting = 'Hello, World!';"
    );
  });

  it("언어가 없는 경우 언어가 노출되지 않는다.", () => {
    const { container } = render(
      <CodeBlock>{mockChildrenWithoutLanguage}</CodeBlock>
    );

    expect(screen.queryByText("javascript")).not.toBeInTheDocument();
    expect(container.querySelector("pre")?.textContent).toBe(
      "console.log('Hello');"
    );
  });

  it("복사 버튼을 클릭하면 코드가 클립보드에 복사된다.", async () => {
    mockWriteText.mockResolvedValue(undefined);
    render(<CodeBlock>{mockChildrenWithLanguage}</CodeBlock>);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await userEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith(
      "const greeting = 'Hello, World!';"
    );
    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  it("복사 버튼을 클릭하면 복사 상태가 잠시 표시된다.", async () => {
    mockWriteText.mockResolvedValue(undefined);
    render(<CodeBlock>{mockChildrenWithLanguage}</CodeBlock>);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
        expect(screen.getByText("Copy")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("클립보드 쓰기 실패 시 오류를 처리한다.", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockWriteText.mockRejectedValue(new Error("Clipboard access denied"));

    render(<CodeBlock>{mockChildrenWithLanguage}</CodeBlock>);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to copy:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
