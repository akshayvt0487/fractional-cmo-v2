import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

const data = getMainServicePageData('social-media-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/social-media-marketing`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/social-media-marketing',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/social-media-marketing-hero.jpg',
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

export default function SocialMediaMarketingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/social-media-marketing#service",
    "name": "Social Media Marketing Services",
    "serviceType": "Social Media Marketing",
    "url": "https://fractional-cmo.com.au/services/social-media-marketing",
    "description": "Strategic social media marketing services for Australian businesses focused on building engaged communities, generating leads, and strengthening brand loyalty through organic and paid social channels.",
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
      "audienceType": "Businesses seeking brand growth, engagement, and lead generation through social media"
    },
    "category": "Marketing Services > Social Media Marketing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Media Marketing Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Strategy",
            "description": "Comprehensive social media strategies aligned with business goals, target audiences, and brand voice."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Creation",
            "description": "Platform-optimized content creation including graphics, videos, and copy designed to drive engagement."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Community Management",
            "description": "Active audience engagement through comments, messages, and community-building initiatives."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paid Social Advertising",
            "description": "Targeted advertising campaigns across Facebook, Instagram, LinkedIn, and other social platforms."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Influencer Partnerships",
            "description": "Strategic influencer collaborations to expand reach and build credibility with target audiences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Analytics & Reporting",
            "description": "Performance tracking and reporting to optimise engagement, conversions, and ROI."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/social-media-marketing",
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
      <ServiceLayout data={data} serviceSlug="social-media-marketing" />
    </>
  );
}
