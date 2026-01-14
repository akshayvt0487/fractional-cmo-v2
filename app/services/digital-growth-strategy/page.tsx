import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/data/serviceData';
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
  const serviceSchema = generateServiceSchema(
    data.heroTitle,
    'digital-growth-strategy',
    data.heroDescription
  );
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(data.heroTitle, 'digital-growth-strategy');

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
      <ServiceLayout data={data} serviceSlug="digital-growth-strategy" />
    </>
  );
}
