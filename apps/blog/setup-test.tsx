import "@testing-library/jest-dom";

vi.mock("next/font/local", () => ({
  default: vi.fn(() => ({
    className: "mocked-font",
    style: { fontFamily: "mocked-font" },
    variable: "--font-mocked",
  })),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img data-testid="next-image" src={src} alt={alt} {...props} />
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});
