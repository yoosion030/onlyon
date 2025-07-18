import type { Metadata } from "next";
import "./global.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer, Header, pretendard } from "@repo/ui";
import favicon from "@repo/ui/assets/favicon.ico";
import ogImage from "@repo/ui/assets/og-image.png";
import { cn } from "@repo/utils";

const title = "유시온 포트폴리오";
const description =
  "저의 이름(Sion)과 오직 하나뿐인(Only One)의미를 담아 오직 하나뿐인 글을 작성하는 서비스 Only On의 포트폴리오 페이지입니다.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    images: {
      url: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/${ogImage.src}`,
      width: ogImage.width,
      height: ogImage.height,
      alt: "유시온 포트폴리오",
    },
  },
  twitter: {
    title,
    description,
    images: {
      url: `${process.env.NEXT_PUBLIC_PORTFOLIO_URL}/${ogImage.src}`,
      width: ogImage.width,
      height: ogImage.height,
      alt: "유시온 포트폴리오",
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
    <html lang="en" className={`${pretendard.variable}`}>
      <body suppressHydrationWarning className={pretendard.className}>
        <Header workspace="portfolio" className={cn("max-w-[75rem]", "px-8")} />
        <section
          className={cn("max-w-[75rem]", "mx-auto", "px-8", "mb-[5rem]")}
        >
          {children}
        </section>
        <Footer className={cn("max-w-[75rem]", "px-8")} />
      </body>
      <GoogleAnalytics gaId={"G-NH85R0L62G"} />
    </html>
  );
}
