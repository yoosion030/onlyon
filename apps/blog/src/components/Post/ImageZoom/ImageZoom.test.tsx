import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import ImageZoom from "./ImageZoom";

describe("ImageZoom", () => {
  const defaultProps = {
    src: "/test-image.jpg",
    alt: "테스트 이미지",
    width: 800,
    height: 400,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("이미지가 정상적으로 노출되어야 한다.", () => {
    render(<ImageZoom {...defaultProps} />);

    screen.debug();

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "테스트 이미지");
  });

  it("이미지 클릭 시 이미지 확대 팝업이 노출되어야 한다.", async () => {
    render(<ImageZoom {...defaultProps} />);

    const imageZoomTrigger = screen.getByRole("img");
    await userEvent.click(imageZoomTrigger);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("이미지 확대 팝업", () => {
    it("DialogTitle에 접근성을 위한 숨김 텍스트가 있어야 한다.", async () => {
      render(<ImageZoom {...defaultProps} />);

      const imageZoomTrigger = screen.getByRole("img");
      await userEvent.click(imageZoomTrigger);

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const dialogTitle = dialog.querySelector("h2");
        expect(dialogTitle).toHaveTextContent("이미지 확대보기");
        expect(dialogTitle).toHaveClass("sr-only");
      });
    });

    it("alt 텍스트가 있을 때 하단에 표시되어야 한다.", async () => {
      render(<ImageZoom {...defaultProps} />);

      const imageZoomTrigger = screen.getByRole("img");
      await userEvent.click(imageZoomTrigger);

      await waitFor(() => {
        expect(screen.getByText("테스트 이미지")).toBeInTheDocument();
      });
    });

    it("alt 텍스트가 없을 때 alt 텍스트가 노출되지 않아야 한다.", async () => {
      render(<ImageZoom src="/test.jpg" />);

      const imageZoomTrigger = screen.getByRole("img");
      await userEvent.click(imageZoomTrigger);

      await waitFor(() => {
        const dialogContent = screen.getByRole("dialog");
        const textArea = dialogContent.querySelector("p");

        expect(textArea).not.toBeInTheDocument();
      });
    });

    it("팝업이 열린 채 이미지를 클릭하면 팝업이 닫혀야 한다.", async () => {
      render(<ImageZoom {...defaultProps} />);

      const imageZoomTrigger = screen.getByRole("img");
      await userEvent.click(imageZoomTrigger);

      await waitFor(async () => {
        const dialog = screen.getByRole("dialog");
        const zoomImage = screen.getByRole("img");
        await userEvent.click(zoomImage);

        expect(dialog).not.toBeInTheDocument();
      });
    });
  });
});
