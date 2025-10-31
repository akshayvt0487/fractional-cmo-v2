import { createMetadata } from "@/lib/seo";
import Index from "@/app/pages/Index";

export const metadata = createMetadata({
  title: 'Growth Marketing for Service Businesses',
  description: 'Expert fractional CMO services to help service businesses build scalable growth systems through strategic marketing and hands-on execution.',
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
