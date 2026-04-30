import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-tech",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "YıldızJam 2026 – Oyun Geliştirme Zirvesi & Yarışması",
  description:
    "YTU SKY LAB tarafından düzenlenen YıldızJam 2026; 8-9-10 Mayıs'ta YTÜ Davutpaşa Tarihi Hamam'da gerçekleşecek oyun geliştirme zirvesi ve yarışmasıdır. 60.000 TL ödül havuzu.",
  metadataBase: new URL("https://yildizskylab.com"),
  openGraph: {
    title: "YıldızJam 2026 – Oyun Geliştirme Zirvesi & Yarışması",
    description: "8-9-10 Mayıs | YTÜ Davutpaşa | 60.000 TL Ödül Havuzu",
    url: "https://yildizskylab.com",
    siteName: "YıldızJam 2026",
    images: [
      {
        url: "/img/yildizthumb.png",
        width: 1200,
        height: 630,
        alt: "YıldızJam 2026",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YıldızJam 2026",
    description: "8-9-10 Mayıs | YTÜ Davutpaşa | 60.000 TL Ödül Havuzu",
    images: ["/img/yildizthumb.png"],
  },
  icons: {
    icon: "/img/yildizjam.png",
    apple: "/img/yildizjam.png",
  },
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
      <body className="font-tech text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
