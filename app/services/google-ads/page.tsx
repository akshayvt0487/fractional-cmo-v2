import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

const data = getMainServicePageData('google-ads')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/google-ads`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/google-ads',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/google-ads-hero.jpg',
      width: 1200,
      height: 630,
      alt: data.metaTitle,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function GoogleAdsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/google-ads#service",
    "name": "Google Ads Management",
    "serviceType": "Pay-Per-Click Advertising",
    "url": "https://fractional-cmo.com.au/services/google-ads",
    "description": "Data-driven Google Ads management services for Australian businesses, designed to deliver predictable and scalable revenue through precision targeting, continuous optimisation, and measurable return on ad spend.",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://fractional-cmo.com.au/#localbusiness"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Businesses seeking scalable pay-per-click advertising and measurable ROI from Google Ads"
    },
    "category": "Marketing Services > Google Ads Management",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Google Ads Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Search Campaigns",
            "description": "High-intent search campaigns using precision keyword targeting and compelling ad copy to capture ready-to-buy customers."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Display Advertising",
            "description": "Visually engaging display ads to build brand awareness and retarget visitors across Google's display network."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Shopping Campaigns",
            "description": "Optimised product feed management and smart bidding strategies to showcase products directly in search results."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Advertising",
            "description": "YouTube video advertising campaigns designed to increase brand awareness and drive conversions."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Max Campaigns",
            "description": "AI-powered campaigns optimised across all Google channels to maximise reach and return on ad spend."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Remarketing",
            "description": "Tailored remarketing campaigns to re-engage past visitors and move them toward conversion."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/google-ads",
      "areaServed": "AU"
    }
  };
  const faqSchema = generateFAQSchema(data.faqs);
  // Breadcrumb schema is handled by BreadcrumbNavigation component to avoid duplication

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceLayout data={data} serviceSlug="google-ads" />
    </>
  );
}
