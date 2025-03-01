import { getPosts } from "./getPosts";

export default async function Home() {
  const test = await getPosts();
  console.log({ test });
  return <div>{test.map((post) => post.slug)}</div>;
}
