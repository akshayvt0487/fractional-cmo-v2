import { redirect } from 'next/navigation';

export default async function OnlineMarketingIndustryRedirect({ params }: { params: Promise<{ industry: string }> }) {

export const metadata = {
  canonical: 'https://fractional-cmo.com.au/services/online-marketing/[industry]',
  robots: { index: true, follow: true, nocache: false },
};

  const { industry } = await params;
  // Redirect legacy `/services/online-marketing/[industry]` to `/services/digital-marketing/[industry]`
  redirect(`/services/digital-marketing/${industry}`);
}
