export type Post = {
  slug: string;
  title: string;
  description?: string;
  publishDate: Date;
  posterImage?: string;
  categories: string[];
};
