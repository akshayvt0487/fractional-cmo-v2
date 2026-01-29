import { Metadata } from 'next';
import { getIndustryServicePageData, generateIndustryFAQSchema } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { rawServiceData } from '@/data/serviceData';

const data = getIndustryServicePageData('bricklayers', 'digital-marketing')!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {
    canonical: `https://fractional-cmo.com.au/services/digital-marketing/bricklayers`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/digital-marketing/bricklayers',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: 'https://fractional-cmo.com.au/images/services/bricklayers-digital-marketing-hero.jpg',
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

export default function BricklayersDigitalMarketingPage() {
  const faqSchema = generateIndustryFAQSchema(data.faqs);
  // Service schema is rendered by IndustryServiceLayout component to avoid duplication
  // Breadcrumb schema is handled by BreadcrumbNavigation component to avoid duplication

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      /><IndustryServiceLayout data={data} allServiceData={rawServiceData} />
    </>
  );
}

