import { redirect } from 'next/navigation';

export default function SeoServicesRedirect() {

export const metadata = {
  canonical: 'https://fractional-cmo.com.au/services/seo-services',
  robots: { index: true, follow: true, nocache: false },
};

  // Redirect legacy `/services/seo-services` to canonical `/services/seo`
  redirect('/services/seo');
}
