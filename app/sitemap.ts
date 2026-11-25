import type { MetadataRoute } from "next";

import { ogImage, siteUrl } from "../lib/structured-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      images: [`${siteUrl}${ogImage.url}`],
    },
  ];
}
