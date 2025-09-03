import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minimal LLM | an online learning platform",
  description:
    "Minimal LLM is an online learning platform offering multiple courses where students can explore, learn, and enroll with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased light`}
      >
        <ReduxProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
