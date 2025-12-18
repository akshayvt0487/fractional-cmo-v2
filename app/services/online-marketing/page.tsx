import { redirect } from 'next/navigation';

export default function OnlineMarketingRedirect() {

export const metadata = {
  canonical: 'https://fractional-cmo.com.au/services/online-marketing',
  robots: { index: true, follow: true, nocache: false },
};

  // Redirect legacy `/services/online-marketing` to canonical `/services/digital-marketing`
  redirect('/services/digital-marketing');
}
