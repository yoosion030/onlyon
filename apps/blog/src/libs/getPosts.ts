import { readdir } from "fs/promises";
import path from "path";
import { type Post } from "@blog/types";

export async function getPosts(): Promise<Post[]> {
  const postPath = path.resolve(process.cwd(), "src", "app", "(posts)");

  const slugs = (await readdir(postPath, { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory()
  );

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`../app/(posts)/${name}/metadata.ts`);
      return { slug: name, ...metadata };
    })
  );

  posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  return posts;
}
