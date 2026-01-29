import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

const data = getMainServicePageData('digital-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/digital-marketing`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/digital-marketing',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/digital-marketing-hero.jpg',
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

export default function DigitalMarketingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/digital-marketing#service",
    "name": "Full-Service Digital Marketing",
    "serviceType": "Digital Marketing Services",
    "url": "https://fractional-cmo.com.au/services/digital-marketing",
    "description": "Integrated digital marketing services for Australian businesses, combining strategy, execution, and optimisation across SEO, paid media, social, automation, and analytics to drive measurable and scalable business growth.",
    "inLanguage": "en-AU",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://fractional-cmo.com.au/services/digital-marketing"
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
      "audienceType": "Growth-focused and service-based businesses seeking integrated digital marketing"
    },
    "category": "Marketing Services > Digital Marketing",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integrated Marketing Strategy",
            "description": "Cohesive digital marketing strategies aligning SEO, paid media, social, and email toward unified business objectives."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-Channel Campaign Management",
            "description": "End-to-end campaign management across Google Ads, Meta, LinkedIn, and other digital platforms to maximise reach and ROI."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conversion Rate Optimisation",
            "description": "Data-driven optimisation of landing pages, user journeys, and conversion funnels to improve lead quality and volume."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Automated lead nurturing and customer engagement through email sequences, workflows, and CRM integration."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Analytics & Attribution",
            "description": "Advanced tracking, attribution, and reporting to understand channel performance and optimise marketing spend."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Development",
            "description": "Consistent brand messaging and visual identity across all digital touchpoints to build trust and recognition."
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://fractional-cmo.com.au/services/digital-marketing",
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
      <ServiceLayout data={data} serviceSlug="digital-marketing" />
    </>
  );
}
