import type { Metadata } from 'next';

const SITE_NAME = 'Fractional CMO';
const DEFAULT_TITLE = 'Fractional CMO — Growth marketing for service businesses';
const DEFAULT_DESCRIPTION =
  'Fractional CMO provides growth marketing strategy, lead generation and Google Ads expertise for service businesses.';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-fractional-cmo.jpg`;

export const defaultMetadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  keywords: [
    'fractional cmo',
    'growth marketing',
    'lead generation',
    'google ads',
    'digital marketing',
  ],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export function createMetadata(input: PageMetadataInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = input.description || DEFAULT_DESCRIPTION;
  const url = input.path ? `${BASE_URL.replace(/\/$/, '')}${input.path}` : BASE_URL;
  const image = input.image || DEFAULT_IMAGE;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    keywords: input.keywords || defaultMetadata.keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/*
Usage:
- For site-wide defaults, import and export `defaultMetadata` from `app/layout.tsx`:
    export const metadata = defaultMetadata;

- For per-page metadata, export `generateMetadata` or `metadata` in the page file and call `createMetadata({ title, description, path })`.
*/
