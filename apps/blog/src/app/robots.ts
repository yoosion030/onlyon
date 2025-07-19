import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_STAGE !== "prod")
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_BLOG_URL}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_BLOG_URL,
  };
}
