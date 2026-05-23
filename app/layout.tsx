import Script from "next/script";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";

import "../styles/globals.css";

const serif = Cormorant_Garamond({
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
  title: "Christopher Hernandez",
  description:
    "A dark static site shaped by code, ritual, sacred geometry, and signal.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Christopher Hernandez",
    description:
      "A dark static site shaped by code, ritual, sacred geometry, and signal.",
    url: "/",
    siteName: "Christopher Hernandez",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Hernandez",
    description:
      "A dark static site shaped by code, ritual, sacred geometry, and signal.",
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
