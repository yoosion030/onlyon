import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "velog.velcdn.com",
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
