import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

// `mainServicePages` uses the key `seo-services` (not `seo`). Use the canonical key so the
// runtime lookup returns a valid object instead of `null`.
const data = getMainServicePageData('seo-services')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/seo`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/seo',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/seo-hero.jpg',
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

export default function SeoPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/seo#service",
    "name": "SEO Services",
    "serviceType": "Search Engine Optimization",
    "url": "https://fractional-cmo.com.au/services/seo",
    "description": "Comprehensive SEO services for Australian businesses focused on sustainable organic growth. Our approach combines technical SEO, on-page optimisation, content strategy, and ethical link building to improve search visibility, user experience, and conversion performance.",
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
      "audienceType": "Businesses seeking long-term organic growth and higher-quality leads from search engines"
    },
    "category": "Marketing Services > Search Engine Optimization",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO Services Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO Audit",
            "description": "In-depth analysis of site architecture, performance, mobile usability, and crawlability to ensure optimal search engine indexing."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "On-Page Optimisation",
            "description": "Strategic optimisation of titles, meta descriptions, headings, content structure, and internal linking to improve search visibility."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Strategy",
            "description": "Data-driven content planning and optimisation targeting high-value keywords and search intent across the buyer journey."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO",
            "description": "Local search optimisation through Google Business Profile management, local citations, and geo-targeted content strategies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Link Building",
            "description": "Ethical, white-hat acquisition of authoritative backlinks to strengthen domain authority and improve rankings."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Analytics & Reporting",
            "description": "Transparent reporting with actionable insights on rankings, organic traffic, conversions, and ROI."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/seo",
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
      <ServiceLayout data={data} serviceSlug="seo" />
    </>
  );
}
