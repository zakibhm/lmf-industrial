import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LMF Industrial Supply",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CursorGlow />
        <SmoothScroll />
      </body>
    </html>
  );
}
