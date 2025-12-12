import { redirect } from 'next/navigation';
import { getIndustryServicePageData, rawServiceData } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

export default function LeadGenIndustryPage({ params }: { params: { industry: string } }) {
  const { industry } = params;
  const data = getIndustryServicePageData(industry, 'lead-generation');

  if (!data) {
    // If we don't have industry-specific data, redirect to main lead-generation page
    redirect('/services/lead-generation');
  }

  return (
    <IndustryServiceLayout data={data} industrySlug={industry} serviceSlug="lead-generation" allServiceData={rawServiceData} />
  );
}
