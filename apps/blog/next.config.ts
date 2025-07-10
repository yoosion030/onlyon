import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone" as const,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "onlyon.s3.ap-southeast-2.amazonaws.com",
      },
      { hostname: "localhost" },
      { hostname: "onlyon-blog.vercel.app" },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
