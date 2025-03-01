import { readdir } from "fs/promises";
import path from "path";

export async function getPosts() {
  const postPath = path.resolve(process.cwd(), "src", "app", "(posts)");

  const slugs = (await readdir(postPath, { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory()
  );

  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./(posts)/${name}/metadata.ts`);
      return { slug: name, ...metadata };
    })
  );

  return posts;
}
