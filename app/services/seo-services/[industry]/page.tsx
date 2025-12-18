import { redirect } from 'next/navigation';

export default async function SeoServicesIndustryRedirect({ params }: { params: Promise<{ industry: string }> }) {

export const metadata = {
  canonical: 'https://fractional-cmo.com.au/services/seo-services/[industry]',
  robots: { index: true, follow: true, nocache: false },
};

  const { industry } = await params;
  // Redirect legacy `/services/seo-services/[industry]` to `/services/seo/[industry]`
  redirect(`/services/seo/${industry}`);
}
