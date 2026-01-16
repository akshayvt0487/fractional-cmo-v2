import type { Metadata } from "next";

export const SITE_NAME = "Fractional CMO";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fractional-cmo.com.au";

export const SOCIAL_MEDIA = {
  twitter: "@FractionalCMO",
  facebook: "FractionalCMO",
  linkedin: "fractional-cmo",
};

const DEFAULT_TITLE = "Fractional CMO — Growth marketing for service businesses";
const DEFAULT_DESCRIPTION =
  "Fractional CMO provides growth marketing strategy, lead generation and Google Ads expertise for service businesses.";
const DEFAULT_IMAGE = "/images/blog/fractional-cmo-hero.jpg";

export const defaultMetadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "fractional cmo",
    "growth marketing",
    "lead generation",
    "google ads",
    "digital marketing",
  ],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export interface PageMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: string;
  };
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  schema?: Record<string, any>; // optional JSON-LD schema
}

export function createMetadata(input: PageMetadataInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = input.description || DEFAULT_DESCRIPTION;

  const url = input.path
    ? `${SITE_URL.replace(/\/$/, "")}${input.path}`
    : SITE_URL;

  const image = input.image || DEFAULT_IMAGE;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // ✅ Works once `publishedTime`, `modifiedTime`, and `authors` are added via your .d.ts file
  // Safely extract Open Graph article fields with loose typing
const og = input.openGraph as Record<string, any> | undefined;

const hasArticleFields =
  og?.publishedTime || og?.modifiedTime || og?.authors;


  const robotsConfig = {
    index: input.robots?.index ?? true,
    follow: input.robots?.follow ?? true,
    nocache: input.robots?.nocache ?? false,
    googleBot: input.robots?.googleBot,
    "max-snippet": -1, // Allow unlimited snippet length in search results
    "max-image-preview": "large", // Allow large image previews
    "max-video-preview": -1, // Allow unlimited video preview duration
  };

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    keywords: input.keywords || defaultMetadata.keywords,
    alternates: {
      canonical: input.canonical || url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: hasArticleFields ? "article" : "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...input.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: SOCIAL_MEDIA.twitter,
      creator: SOCIAL_MEDIA.twitter,
      ...input.twitter,
    },
    robots: robotsConfig,
  };
}
