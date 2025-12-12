import { Metadata } from 'next';
import { getIndustryServicePageData, generateIndustryServiceSchema, generateIndustryFAQSchema, generateIndustryBreadcrumbSchema } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { rawServiceData } from '@/data/serviceData';

const data = getIndustryServicePageData('accountants', 'digital-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/digital-marketing/accountants',
    siteName: 'Fractional CMO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

export default function AccountantsDigitalMarketingPage() {
  const serviceSchema = generateIndustryServiceSchema(
    'accountants',
    'digital-marketing',
    'accountants',
    'digital-marketing',
    data.heroDescription
  );
  const faqSchema = generateIndustryFAQSchema(data.faqs);
  const breadcrumbSchema = generateIndustryBreadcrumbSchema(
    'digital-marketing',
    'accountants',
    'digital-marketing',
    'accountants'
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

