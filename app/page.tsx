import { createMetadata } from "@/lib/seo";
import Index from "@/app/pages/Index";

export const metadata = createMetadata({
  title: 'Basheer Padanna — Fractional CMO & Digital Marketing Leader',
  description: 'Fractional CMO and Digital Marketing Strategist for end‑to‑end growth systems across strategy, UX/UI, SEO, Google Ads, and Meta lead generation.',
  path: '/',
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
      url: '/images/homepage/hero-banner.jpg',
      width: 1200,
      height: 630,
      alt: 'Basheer Padanna - Fractional CMO'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Basheer Padanna — Fractional CMO & Digital Marketing Leader',
    description: 'Expert digital marketing leadership for service businesses. Strategic growth through SEO, Google Ads, and Meta lead generation.',
    images: ['/images/homepage/hero-banner.jpg']
  }
});

export default function Home() {
  return (
    <div>
       <Index/>

    </div>
   
  );
}
