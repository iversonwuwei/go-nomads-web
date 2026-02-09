import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "行途",
  description: "行途平台的 Web 体验",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-base-200 text-base-content antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
