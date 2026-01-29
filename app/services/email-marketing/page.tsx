import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

const data = getMainServicePageData('email-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/email-marketing`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/email-marketing',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/email-marketing-hero.jpg',
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

export default function EmailMarketingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/email-marketing#service",
    "name": "Email Marketing Services",
    "serviceType": "Email Marketing",
    "url": "https://fractional-cmo.com.au/services/email-marketing",
    "description": "Strategic email marketing services for Australian businesses focused on lead nurturing, customer retention, and predictable revenue growth through targeted campaigns and intelligent automation.",
    "inLanguage": "en-AU",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://fractional-cmo.com.au/services/email-marketing"
    },
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
      "audienceType": "Businesses looking to increase revenue, retention, and engagement through email marketing"
    },
    "category": "Marketing Services > Email Marketing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Email Marketing Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Email Strategy & Planning",
            "description": "Email marketing strategies aligned with customer journeys, business goals, and audience segmentation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Email Template Design",
            "description": "Professional, mobile-responsive email template design that reflects brand identity and improves engagement."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automation & Sequences",
            "description": "Automated email workflows for lead nurturing, onboarding, abandoned carts, and customer retention."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "List Management & Segmentation",
            "description": "Strategic list growth, hygiene, and segmentation to ensure relevant messaging and high deliverability."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Campaign Management",
            "description": "End-to-end campaign execution including copywriting, scheduling, A/B testing, and optimisation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Analytics & Optimisation",
            "description": "Performance tracking and optimisation to improve open rates, click-through rates, and conversions."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/email-marketing",
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
      <ServiceLayout data={data} serviceSlug="email-marketing" />
    </>
  );
}
