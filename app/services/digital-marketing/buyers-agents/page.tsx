import { Metadata } from 'next';
import { getIndustryServicePageData, generateIndustryServiceSchema, generateIndustryFAQSchema, generateIndustryBreadcrumbSchema } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { rawServiceData } from '@/data/serviceData';

const data = getIndustryServicePageData('buyers-agents', 'digital-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `https://fractional-cmo.com.au/services/digital-marketing/buyers-agents`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/digital-marketing/buyers-agents',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/buyers-agents-digital-marketing-hero.jpg',
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

export default function BuyersAgentsDigitalMarketingPage() {
  const serviceSchema = generateIndustryServiceSchema(
    'buyers-agents',
    'digital-marketing',
    'buyers-agents',
    'digital-marketing',
    data.heroDescription
  );
  const faqSchema = generateIndustryFAQSchema(data.faqs);
  const breadcrumbSchema = generateIndustryBreadcrumbSchema(
    'digital-marketing',
    'buyers-agents',
    'digital-marketing',
    'buyers-agents'
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

