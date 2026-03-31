import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import {
  getSiteUrl,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_KEYWORDS,
  SEO_LINKEDIN_URL,
  SEO_PERSON_NAME
} from "@/lib/seo";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const siteUrl = getSiteUrl();
const profileImagePath = "/images/profile/enolla-cv-profile.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: `${SEO_PERSON_NAME} Portfolio`,
  title: {
    default: SEO_DEFAULT_TITLE,
    template: `%s | ${SEO_PERSON_NAME}`
  },
  description: SEO_DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: {
    canonical: "/"
  },
  authors: [
    {
      name: SEO_PERSON_NAME,
      url: SEO_LINKEDIN_URL
    }
  ],
  creator: SEO_PERSON_NAME,
  publisher: SEO_PERSON_NAME,
  category: "marketing",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${SEO_PERSON_NAME} Portfolio`,
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    locale: "fr_FR",
    images: [
      {
        url: profileImagePath,
        width: 828,
        height: 1035,
        alt: `${SEO_PERSON_NAME} - Portfolio Executif`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    images: [profileImagePath]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SEO_PERSON_NAME,
  url: siteUrl,
  image: `${siteUrl}${profileImagePath}`,
  sameAs: [SEO_LINKEDIN_URL],
  jobTitle: "Responsable Marketing & Commercial | Nemalia",
  knowsAbout: [
    "Marketing B2B",
    "Strategie commerciale",
    "Communication corporate",
    "Growth marketing",
    "Business development",
    "Trade marketing"
  ]
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SEO_PERSON_NAME} Portfolio`,
  url: siteUrl,
  inLanguage: ["fr-FR", "en-US"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-canvas font-body text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData)
          }}
        />
        <div className="fixed inset-0 -z-10 bg-hero-radial" />
        <div className="fixed inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,160,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,160,184,0.04)_1px,transparent_1px)] [background-size:80px_80px]" />
        {children}
      </body>
    </html>
  );
}
