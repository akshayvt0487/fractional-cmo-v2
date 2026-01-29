import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateFAQSchema, rawServiceData } from '@/data/serviceData';
import ServiceLayout from '@/components/ServicePageLayout.fixed';

// Build a full page `data` by merging the parent main service page
// (digital-marketing) with the `services['lead-generation']` entry from the raw JSON.
// This provides meta, hero, features, benefits and FAQs so the layout renders fully.
const data = (() => {
  const parent = getMainServicePageData('digital-marketing');
  const svc = (rawServiceData as any).services?.['lead-generation'] || {};

  const parentFallback = {
    serviceName: 'Digital Marketing',
    serviceSlug: 'digital-marketing',
    metaTitle: 'Digital Marketing',
    metaDescription: '',
    keywords: '',
    heroTitle: 'Digital Marketing',
    heroSubtitle: 'Integrated Marketing Solutions',
    heroDescription: '',
    heroPoints: [],
    whyChoose: undefined,
    features: [],
    process: [],
    faqs: [],
    relatedArticles: [],
    benefits: [],
    industries: [],
    schemaType: 'Service',
    schemaDescription: ''
  } as any;

  const base = parent || parentFallback;

  return {
    ...base,
    serviceName: svc.name ? `${svc.name} — ${base.serviceName}` : base.serviceName,
    serviceSlug: 'lead-generation',
    metaTitle: svc.name ? `${svc.name} | ${base.serviceName}` : (base.metaTitle || 'Lead Generation'),
    metaDescription: svc.benefits?.[0] || base.metaDescription,
    keywords: base.keywords || '',
    heroTitle: svc.name || base.heroTitle,
    heroSubtitle: base.heroSubtitle || 'Lead Generation',
    heroDescription: base.heroDescription || svc.description || '',
    heroPoints: base.heroPoints || [],
    whyChoose: base.whyChoose,
    features: base.features || [],
    process: base.process || [],
    faqs: svc.faqs?.length ? svc.faqs : base.faqs || [],
    relatedArticles: base.relatedArticles || [],
    benefits: svc.benefits?.length ? svc.benefits : base.benefits || [],
    industries: base.industries || [],
    schemaType: base.schemaType || 'Service',
    schemaDescription: base.schemaDescription || ''
  } as any;
})();

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `${SITE_URL}/services/lead-generation`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/lead-generation',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/lead-generation-hero.jpg',
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

export default function LeadGenerationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://fractional-cmo.com.au/services/lead-generation#service",
    "name": "Lead Generation Services",
    "serviceType": "Lead Generation Digital Marketing",
    "url": "https://fractional-cmo.com.au/services/lead-generation",
    "description": "Integrated lead generation services for Australian businesses focused on delivering qualified leads through multi-channel digital marketing. Our approach combines strategy, execution, conversion optimisation, and automation to create scalable and measurable lead acquisition systems.",
    "inLanguage": "en-AU",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://fractional-cmo.com.au/services/lead-generation"
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
      "audienceType": "Businesses seeking scalable and cost-effective lead generation systems"
    },
    "category": "Marketing Services > Lead Generation",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lead Generation Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Integrated Marketing Strategy",
            "description": "Cohesive lead generation strategies aligning SEO, PPC, social media, and email marketing toward unified business goals."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-Channel Campaign Management",
            "description": "Expert management of campaigns across Google Ads, Meta, LinkedIn, and other platforms to maximise reach and lead quality."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Conversion Rate Optimisation",
            "description": "Data-driven optimisation of landing pages, funnels, and user journeys to increase lead conversion rates."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Automated lead nurturing workflows and email sequences to improve engagement and conversion efficiency."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Analytics & Attribution",
            "description": "Advanced tracking and reporting to identify high-performing channels, cost per lead, and ROI."
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
      "url": "https://fractional-cmo.com.au/services/lead-generation",
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
      <ServiceLayout data={data} serviceSlug="lead-generation" />
    </>
  );
}
