import type { Metadata } from "next";
import "./global.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { pretendard } from "@repo/ui";
import favicon from "@repo/ui/assets/favicon.ico";
import ogImage from "@repo/ui/assets/og-image.png";

import { cn } from "@repo/utils";

const title = "유시온 블로그";
const description =
  "저의 이름(Sion)과 오직 하나뿐인(Only One)의미를 담아 오직 하나뿐인 글을 작성하는 서비스 Only On의 블로그 페이지입니다.";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: process.env.NODE_ENV === "production",
    follow: process.env.NODE_ENV === "production",
  },
  openGraph: {
    title,
    description,
    siteName: title,
    images: {
      url: `${process.env.NEXT_PUBLIC_BLOG_URL}/${ogImage.src}`,
      width: ogImage.width,
      height: ogImage.height,
      alt: title,
    },
  },
  twitter: {
    title,
    description,
    images: {
      url: `${process.env.NEXT_PUBLIC_BLOG_URL}/${ogImage.src}`,
      width: ogImage.width,
      height: ogImage.height,
      alt: title,
    },
  },
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body
        className={cn("relative", pretendard.className)}
        suppressHydrationWarning
      >
        {children}
      </body>
      <GoogleAnalytics gaId={"G-R5Q71YVCLP"} />
    </html>
  );
}
