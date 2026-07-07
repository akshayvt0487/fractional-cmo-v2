// app/contact/page.tsx
import type { Metadata } from 'next';
import { createMetadata, SITE_URL } from "@/lib/seo";
import ContactClient from './ContactClient'; // Make sure this path is correct

export const metadata: Metadata = createMetadata({
  title: "Contact Basheer Padanna - Fractional CMO Consultation & Growth Strategy",
  description: "Book a free consultation with Basheer Padanna, experienced Fractional CMO. Get strategic marketing guidance and scalable growth solutions for your business.",
  path: "/contact",
  canonical: `${SITE_URL}/contact`,
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    'fractional cmo consultation',
    'marketing strategy consultation',
    'digital marketing consultation',
    'growth strategy consultation',
    'marketing leadership consultation'
  ],
  openGraph: {
    title: "Contact Basheer Padanna - Fractional CMO Consultation",
    description: "Book a free consultation with Basheer Padanna, experienced Fractional CMO. Get strategic marketing guidance for your business.",
    url: "https://fractional-cmo.com.au/contact",
    siteName: "Fractional CMO",
    type: "website",
    images: [{
      url: "/images/contact/consultation-hero.jpg",
      width: 1200,
      height: 630,
      alt: "Book a Consultation with Fractional CMO"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Basheer Padanna - Fractional CMO Consultation",
    description: "Book a free consultation with Basheer Padanna, experienced Fractional CMO. Get strategic marketing guidance for your business.",
    images: ["/images/contact/consultation-hero.jpg"]
  }
});

// 1. Accept 'searchParams' as a prop here
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  // 2. Safely get the 'service' param
  const serviceParam = typeof resolvedSearchParams.service === 'string' 
    ? resolvedSearchParams.service 
    : undefined;

  // 3. Pass it as a prop to your client component
  return <ContactClient initialService={serviceParam} />;
}