import { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getMainServicePageData, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/data/serviceData';
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
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function GoogleAdsPage() {
  const serviceSchema = generateServiceSchema(
    data.heroTitle,
    'google-ads',
    data.heroDescription
  );
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(data.heroTitle, 'google-ads');

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
      <ServiceLayout data={data} serviceSlug="google-ads" />
    </>
  );
}
