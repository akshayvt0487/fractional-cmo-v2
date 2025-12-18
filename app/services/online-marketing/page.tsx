import { redirect } from 'next/navigation';

export default function OnlineMarketingRedirect() {

  // Redirect legacy `/services/online-marketing` to canonical `/services/digital-marketing`
  redirect('/services/digital-marketing');
}
