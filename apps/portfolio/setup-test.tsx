import "@testing-library/jest-dom";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="next-image" src={src} alt={alt} {...props} />
  ),
}));
