import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "onlyon.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
