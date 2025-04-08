import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import PageTransition from "./pageTransition";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: { default: "周哲緯 - 個人作品集", template: "%s | 周哲緯" },
  description:
    "周哲緯的個人網站，展示簡歷、相簿和專案，使用 Next.js 和 Tailwind CSS 打造。",
  keywords: [
    "周哲緯",
    "個人作品集",
    "簡歷",
    "相冊",
    "Next.js",
    "Tailwind CSS",
    "前端開發",
  ],
  authors: [{ name: "周哲緯" }],
  openGraph: {
    title: "周哲緯 - 個人作品集",
    description: "探索周哲緯的簡歷、相簿和專案。",
    url: "https://myblog-nextjs-eight.vercel.app/",
    siteName: "周哲緯的個人網站",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="icon" href="/favicon.ico/camera.png"></link>
      </head>
      <body
        className={`flex cursor-default flex-col overscroll-none antialiased`}
      >
        {/* <NextTopLoader color="#ff6144" showSpinner={false} /> */}
        <PageTransition>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
