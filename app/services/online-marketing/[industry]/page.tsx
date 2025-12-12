import { redirect } from 'next/navigation';

export default async function OnlineMarketingIndustryRedirect({ params }: { params: { industry: string } }) {
  const { industry } = await params;
  // Redirect legacy `/services/online-marketing/[industry]` to `/services/digital-marketing/[industry]`
  redirect(`/services/digital-marketing/${industry}`);
}
