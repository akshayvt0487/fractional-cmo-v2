import { createMetadata, SITE_URL } from "@/lib/seo";
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

const organizationPersonSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fractional-cmo.com.au/#organization",
      "name": "Fractional CMO",
      "description": "Fractional CMO and Digital Marketing Strategist offering end-to-end growth systems for service businesses.",
      "url": "https://fractional-cmo.com.au/",
      "image": "https://fractional-cmo.com.au/images/Basheer-Padanna.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "Basheer@fractional-cmo.com.au"
      },
      "founder": { "@type": "Person", "@id": "https://fractional-cmo.com.au/#basheer-padanna" },
      "sameAs": [
        "https://www.facebook.com/fractionalCMOau/",
        "https://www.linkedin.com/company/fractional-cmo-au"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://fractional-cmo.com.au/#basheer-padanna",
      "name": "Basheer Padanna",
      "jobTitle": "Fractional CMO, Growth Strategist & Performance Marketing Leader",
      "description": "Fractional CMO and Digital Marketing Strategist with 15+ years of growth marketing and conversion optimization experience. Managed $2M+ in annual ad spend across Google Ads and Meta. Built and optimized 50+ high-converting landing page systems.",
      "image": "https://fractional-cmo.com.au/images/Basheer-Padanna.png",
      "url": "https://fractional-cmo.com.au/",
      "worksFor": { "@type": "Organization", "@id": "https://fractional-cmo.com.au/#organization" },
      "sameAs": [
        "https://www.linkedin.com/in/basheerpadanna"
      ],
      "knowsAbout": ["Growth Marketing", "Performance Marketing", "CRO", "Google Ads", "Meta Advertising", "SEO", "Landing Page Optimization", "Lead Generation"]
    }
  ]
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationPersonSchema) }}
      />
      <Index />
    </div>
  );
}
