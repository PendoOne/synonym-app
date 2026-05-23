import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "考研英语 AI 同义词辨析",
  description: "AI 驱动的考研英语高频易混词辨析学习平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white text-zinc-900 antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
