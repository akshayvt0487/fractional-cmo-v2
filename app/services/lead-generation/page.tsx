import { Metadata } from 'next';
import { getMainServicePageData, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, rawServiceData } from '@/data/serviceData';
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
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/lead-generation',
    siteName: 'Fractional CMO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function LeadGenerationPage() {
  const serviceSchema = generateServiceSchema(
    data.heroTitle,
    'lead-generation',
    data.heroDescription
  );
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(data.heroTitle, 'lead-generation');

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceLayout data={data} />
    </>
  );
}
