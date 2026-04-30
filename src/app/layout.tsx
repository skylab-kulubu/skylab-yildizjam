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
  title: {
    default: "YıldızJam 2026 | Oyun Geliştirme Zirvesi & Game Jam",
    template: "%s | YıldızJam 2026",
  },
  description:
    "YTU SKY LAB tarafından düzenlenen YıldızJam 2026; 8-10 Mayıs tarihlerinde YTÜ Davutpaşa Tarihi Hamam'da gerçekleşiyor. 48 saatlik maraton, 30.000 TL ödül havuzu ve sektör devleri seni bekliyor!",
  keywords: [
    "Game Jam",
    "Oyun Geliştirme",
    "Yıldız Teknik Üniversitesi",
    "SKY LAB",
    "YıldızJam",
    "Oyun Yarışması",
    "Indie Game Development",
  ],
  metadataBase: new URL("https://yildizjam.yildizskylab.com"),
  alternates: {
    canonical: "https://yildizjam.yildizskylab.com",
  },
  openGraph: {
    title: "YıldızJam 2026 – Sınırlarını Zorlamaya Hazır Mısın?",
    description:
      "8-9-10 Mayıs | YTÜ Davutpaşa Tarihi Hamam | 30.000 TL Ödül Havuzu ve Network Fırsatı!",
    url: "https://yildizjam.yildizskylab.com",
    siteName: "YıldızJam 2026",
    images: [
      {
        url: "https://yildizjam.yildizskylab.com/img/yildizjamthumb.png",
        width: 1200,
        height: 630,
        alt: "YıldızJam 2026 Etkinlik Afişi",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YıldızJam 2026 – Oyun Geliştirme Maratonu",
    description:
      "48 saat kesintisiz oyun geliştirme heyecanı! 30.000 TL ödül için hemen başvur.",
    images: ["https://yildizjam.yildizskylab.com/img/yildizjamthumb.png"],
    creator: "@skylabkulubu",
  },
  icons: {
    icon: [
      { url: "/img/yildizjam.png" },
      { url: "/img/yildizjam.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/img/yildizjam.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
