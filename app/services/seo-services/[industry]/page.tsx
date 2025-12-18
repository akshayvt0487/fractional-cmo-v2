import { redirect } from 'next/navigation';

export default async function SeoServicesIndustryRedirect({ params }: { params: Promise<{ industry: string }> }) {

  const { industry } = await params;
  // Redirect legacy `/services/seo-services/[industry]` to `/services/seo/[industry]`
  redirect(`/services/seo/${industry}`);
}
