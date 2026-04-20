import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-tech",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "YıldızJam 2026",
  description: "metadeskripsiyon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${outfit.variable} ${jakarta.variable} ${pixelify.variable}`}
    >
      <body className="font-tech text-white antialiased">{children}</body>
    </html>
  );
}
