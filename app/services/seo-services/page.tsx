import { redirect } from 'next/navigation';

export default function SeoServicesRedirect() {
  // Redirect legacy `/services/seo-services` to canonical `/services/seo`
  redirect('/services/seo');
}
