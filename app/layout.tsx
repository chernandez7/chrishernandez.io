import Script from "next/script";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cinzel, IBM_Plex_Mono } from "next/font/google";

import {
  buildStructuredData,
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "../lib/structured-data";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Christopher Hernandez",
  },
  description: siteDescription,
  applicationName: siteName,
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
  authors: [{ name: siteName, url: siteUrl }],
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
    title: siteTitle,
    description:
      "Systems-minded engineering portfolio shaped by architecture, execution, and ritual aesthetics.",
    url: "/",
    siteName,
    locale: "en_US",
    type: "profile",
    firstName: "Christopher",
    lastName: "Hernandez",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Systems-minded engineering portfolio shaped by architecture, execution, and ritual aesthetics.",
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const structuredDataJson = JSON.stringify(
  buildStructuredData(new Date().toISOString()),
).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </body>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "62aa3d6c37cc4ebf8fba8de21d31f37e"}'
        strategy="afterInteractive"
      />
    </html>
  );
}
