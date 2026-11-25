import { educationEntries, promotionTracks } from "./home-content";
import { socialLinks } from "./links";

export const siteUrl = "https://skate.dev";
export const siteName = "Christopher Hernandez";
export const siteTitle = "Christopher Hernandez | Senior Software Engineer II";
export const siteDescription =
  "Christopher Hernandez is a Senior Software Engineer II at Tempus AI solving hard systems problems through architecture, platform design, and execution.";
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Christopher Hernandez — Senior Software Engineer II",
};

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const webpageId = `${siteUrl}/#webpage`;
const imageId = `${siteUrl}/#primaryimage`;

const currentTrack = promotionTracks[0];
const currentRole = currentTrack.stages[0].role;

const knowsAbout = Array.from(
  new Set([
    "Software Architecture",
    "Platform Engineering",
    "Distributed Systems",
    "Full-Stack Development",
    ...(currentTrack.skills ?? []),
  ]),
);

export function buildStructuredData(dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteName,
        givenName: "Christopher",
        familyName: "Hernandez",
        url: `${siteUrl}/`,
        image: { "@id": imageId },
        sameAs: socialLinks.map((link) => link.href),
        jobTitle: currentRole,
        worksFor: {
          "@type": "Organization",
          name: currentTrack.company,
          url: "https://www.tempus.com/",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: currentRole,
          occupationalCategory: "15-1252.00 Software Developers",
          skills: knowsAbout.join(", "),
        },
        alumniOf: educationEntries.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.school,
        })),
        description:
          "Senior Software Engineer II focused on hard systems problems, platform architecture, and resilient product delivery.",
        knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: siteName,
        description: siteDescription,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        url: `${siteUrl}${ogImage.url}`,
        contentUrl: `${siteUrl}${ogImage.url}`,
        width: ogImage.width,
        height: ogImage.height,
        caption: ogImage.alt,
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": webpageId,
        url: `${siteUrl}/`,
        name: siteTitle,
        description: siteDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@id": imageId },
        image: { "@id": imageId },
        dateModified,
        inLanguage: "en-US",
      },
    ],
  };
}
