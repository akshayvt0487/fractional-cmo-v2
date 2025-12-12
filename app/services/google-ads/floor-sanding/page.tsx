import { Metadata } from 'next';
import { getIndustryServicePageData, generateIndustryServiceSchema, generateIndustryFAQSchema, generateIndustryBreadcrumbSchema, rawServiceData } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const data = getIndustryServicePageData('floor-sanding', 'google-ads')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/google-ads/floor-sanding',
    siteName: 'Fractional CMO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function FloorSandingGoogleAdsPage() {
  const serviceSchema = generateIndustryServiceSchema(
    'floor-sanding',
    'google-ads',
    'floor-sanding',
    'google-ads',
    data.heroDescription
  );
  const faqSchema = generateIndustryFAQSchema(data.faqs);
  const breadcrumbSchema = generateIndustryBreadcrumbSchema(
    'google-ads',
    'floor-sanding',
    'google-ads',
    'floor-sanding'
  );

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
      <IndustryServiceLayout data={data} allServiceData={rawServiceData} />
    </>
  );
}

