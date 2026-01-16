import { createMetadata, SITE_URL } from "@/lib/seo";
import { generateOrganizationSchema, SchemaScript } from "@/lib/schemas";
import Index from "@/app/pages/Index";

export const metadata = createMetadata({
  title: 'Basheer Padanna — Fractional CMO & Digital Marketing Leader',
  description: 'Fractional CMO and Digital Marketing Strategist for end‑to‑end growth systems across strategy, UX/UI, SEO, Google Ads, and Meta lead generation.',
  path: '/',
  canonical: SITE_URL,
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    'fractional cmo',
    'growth marketing',
    'digital marketing strategy',
    'service business marketing',
    'marketing leadership',
  ],
  openGraph: {
    title: 'Basheer Padanna — Fractional CMO & Digital Marketing Leader',
    description: 'Expert digital marketing leadership for service businesses. Strategic growth through SEO, Google Ads, and Meta lead generation.',
    url: 'https://fractional-cmo.com.au',
    siteName: 'Fractional CMO',
    type: 'website',
    images: [{
      url: '/images/Basheer-Padanna.png',
      width: 1200,
      height: 630,
      alt: 'Basheer Padanna - Fractional CMO'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basheer Padanna — Fractional CMO & Digital Marketing Leader',
    description: 'Expert digital marketing leadership for service businesses. Strategic growth through SEO, Google Ads, and Meta lead generation.',
    images: ['/images/Basheer-Padanna.png']
  }
});

export default function Home() {
  const organizationSchema = generateOrganizationSchema({
    name: 'Fractional CMO',
    description: 'Fractional CMO and Digital Marketing Strategist offering end-to-end growth systems for service businesses.',
    url: SITE_URL,
    imageUrl: `${SITE_URL.replace(/\/$/, '')}/images/Basheer-Padanna.png`,
    socialProfiles: [
      'https://www.facebook.com/FractionalCMO',
      'https://www.linkedin.com/company/fractional-cmo',
    ],
    contactPoint: {
      type: 'Customer Service',
      email: 'contact@fractional-cmo.com.au',
    },
  });

  return (
    <div>
      <SchemaScript schema={organizationSchema} />
      <Index />
    </div>
  );
}
