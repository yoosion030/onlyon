import { render, screen } from "@testing-library/react";

describe("description", () => {
  it("should render", () => {
    render(<div>Hello</div>);
    screen.debug();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
