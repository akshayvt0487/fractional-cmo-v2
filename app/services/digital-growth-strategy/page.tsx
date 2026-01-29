import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

const data = getMainServicePageData('digital-growth-strategy')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/digital-growth-strategy`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/digital-growth-strategy',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/digital-growth-strategy-hero.jpg',
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

export default function DigitalGrowthStrategyPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/digital-growth-strategy#service",
    "name": "Digital Growth Strategy Consulting",
    "serviceType": "Growth Strategy Consulting",
    "url": "https://fractional-cmo.com.au/services/digital-growth-strategy",
    "description": "Strategic growth planning for ambitious Australian businesses to move beyond random marketing tactics and implement systematic, data-driven digital growth strategies that scale acquisition, optimise conversion funnels, and drive sustainable revenue growth.",
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
      "audienceType": "Ambitious, growth-focused and service-based businesses"
    },
    "category": "Marketing Services > Digital Growth Strategy",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Growth Strategy Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Audit & Assessment",
            "description": "Deep analysis of digital presence, market position, and growth opportunities to identify high-impact strategic initiatives."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Customer Journey Mapping",
            "description": "Detailed mapping of the customer journey from awareness to purchase to identify optimisation opportunities at every stage."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Channel Strategy",
            "description": "Data-driven recommendations on the most effective marketing channels to maximise return on investment."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Experimentation",
            "description": "Systematic experimentation and testing framework to validate growth hypotheses and scale successful initiatives."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technology Stack Optimisation",
            "description": "Assessment and optimisation of marketing technology, CRM, and analytics tools to support scalable growth."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "KPI Framework & Dashboards",
            "description": "Custom KPI frameworks and real-time dashboards to measure progress and track growth performance."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/digital-growth-strategy",
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
      <ServiceLayout data={data} serviceSlug="digital-growth-strategy" />
    </>
  );
}
