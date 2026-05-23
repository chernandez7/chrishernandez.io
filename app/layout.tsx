import Script from "next/script";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cinzel, IBM_Plex_Mono } from "next/font/google";

import "../styles/globals.css";

const serif = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skate.dev"),
  title: {
    default: "Christopher Hernandez | Senior Software Engineer II",
    template: "%s | Christopher Hernandez",
  },
  description:
    "Christopher Hernandez is a Senior Software Engineer II at Tempus AI solving hard systems problems through architecture, platform design, and execution.",
  applicationName: "Christopher Hernandez",
  keywords: [
    "Christopher Hernandez",
    "Senior Software Engineer",
    "Tempus AI",
    "software architecture",
    "platform engineering",
    "full stack engineering",
    "sacred geometry",
    "occult design",
    "alchemical aesthetics",
  ],
  authors: [{ name: "Christopher Hernandez", url: "https://skate.dev" }],
  creator: "Christopher Hernandez",
  publisher: "Christopher Hernandez",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Christopher Hernandez | Senior Software Engineer II",
    description:
      "Systems-minded engineering portfolio shaped by architecture, execution, and ritual aesthetics.",
    url: "/",
    siteName: "Christopher Hernandez",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christopher Hernandez — Senior Software Engineer II",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Hernandez | Senior Software Engineer II",
    description:
      "Systems-minded engineering portfolio shaped by architecture, execution, and ritual aesthetics.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "62aa3d6c37cc4ebf8fba8de21d31f37e"}'
        strategy="afterInteractive"
      />
    </html>
  );
}
