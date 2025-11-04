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
});

export default function Home() {
  return (
    <div>
       <Index/>

    </div>
   
  );
}
