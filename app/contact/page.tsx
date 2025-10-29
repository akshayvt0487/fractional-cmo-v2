// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactClient from './ContactClient'; // Make sure this path is correct

export const metadata: Metadata = {
  title: "Contact Basheer Padanna - Fractional CMO Consultation & Growth Strategy",
  description: "Book a free consultation with Basheer Padanna, experienced Fractional CMO. Get strategic marketing guidance and scalable growth solutions for your business.",
  alternates: {
    canonical: "/contact",
  },
};

// 1. Accept 'searchParams' as a prop here
export default function ContactPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // 2. Safely get the 'service' param
  const serviceParam = typeof searchParams.service === 'string' 
    ? searchParams.service 
    : undefined;

  // 3. Pass it as a prop to your client component
  return <ContactClient initialService={serviceParam} />;
}