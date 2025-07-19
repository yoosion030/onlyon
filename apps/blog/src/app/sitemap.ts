import { promises as fs } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_BLOG_URL;

async function getPostSlugsWithLastModified(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name === "page.mdx")
      .map(async (entry) => {
        const fullPath = path.join(entry.parentPath, entry.name);
        const stats = await fs.stat(fullPath);
        const relativePath = path.relative(dir, fullPath);
        const slug = path.dirname(relativePath).replace(/\\/g, "/");

        return {
          slug,
          lastModified: stats.mtime,
        };
      }),
  );

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.NEXT_PUBLIC_STAGE !== "prod") return [];

  const postsDirectory = path.join(process.cwd(), "src", "app", "(posts)");

  try {
    const posts = await getPostSlugsWithLastModified(postsDirectory);

    const postUrls = posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: post.lastModified.toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const staticRoutes = [
      {
        url: SITE_URL ?? "",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
    ];

    return [...staticRoutes, ...postUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: SITE_URL ?? "",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
    ];
  }
}
