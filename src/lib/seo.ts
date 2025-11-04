import type { Metadata } from 'next';

export const SITE_NAME = 'Fractional CMO';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fractional-cmo.com.au';
export const SOCIAL_MEDIA = {
  twitter: '@FractionalCMO',
  facebook: 'FractionalCMO',
  linkedin: 'fractional-cmo',
};

const DEFAULT_TITLE = 'Fractional CMO — Growth marketing for service businesses';
const DEFAULT_DESCRIPTION =
  'Fractional CMO provides growth marketing strategy, lead generation and Google Ads expertise for service businesses.';
const DEFAULT_IMAGE = '/images/hero-fractional-cmo.jpg';

export const defaultMetadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
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

interface PageMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    type?: 'website' | 'article';
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
};

export function createMetadata(input: PageMetadataInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const description = input.description || DEFAULT_DESCRIPTION;
  const url = input.path ? `${SITE_URL.replace(/\/$/, '')}${input.path}` : SITE_URL;
  const image = input.image || DEFAULT_IMAGE;

  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    keywords: input.keywords || defaultMetadata.keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
      site: SOCIAL_MEDIA.twitter,
      creator: SOCIAL_MEDIA.twitter,
    },
  };
}

/*
Usage:
- For site-wide defaults, import and export `defaultMetadata` from `app/layout.tsx`:
    export const metadata = defaultMetadata;

- For per-page metadata, export `generateMetadata` or `metadata` in the page file and call `createMetadata({ title, description, path })`.
*/
