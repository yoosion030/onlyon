import type { Post } from "@blog/types";
import type { Metadata } from "next";

type GenerateMetadataProps = {
  post: Post;
};

export async function generateMetadata({
  post,
}: GenerateMetadataProps): Promise<Metadata> {
  const { title, description, publishDate, categories, posterImage, slug } =
    post;

  return {
    title,
    description,
    authors: [{ name: "Sion" }],
    keywords: categories,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishDate.toISOString(),
      authors: ["Sion"],
      tags: categories,
      images: posterImage
        ? [
            {
              url: posterImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : `${process.env.NEXT_PUBLIC_BLOG_URL}/api/poster-image?title=${title}`,
    },
    twitter: {
      title,
      description,
      images: posterImage
        ? [
            {
              url: posterImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : `${process.env.NEXT_PUBLIC_BLOG_URL}/api/poster-image?title=${title}`,
    },
    robots: {
      index: process.env.NODE_ENV === "production",
      follow: process.env.NODE_ENV === "production",
    },
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}
