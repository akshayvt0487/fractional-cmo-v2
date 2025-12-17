import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndustryServicePageData, rawServiceData, generateIndustryServiceOGData, generateIndustryServiceMeta } from '@/data/serviceData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const data = getIndustryServicePageData(industry, 'lead-generation');

  if (data) {
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      openGraph: generateIndustryServiceOGData(data, industry, 'lead-generation') as any
    } as Metadata;
  }

  const fallback = generateIndustryServiceMeta(industry, 'lead-generation');
  if (fallback) {
    return {
      title: (fallback as any).title,
      description: (fallback as any).description,
      openGraph: (fallback as any).openGraph as any
    } as Metadata;
  }

  return {
    title: 'Lead generation services',
    description: 'Lead generation services tailored for your industry.'
  } as Metadata;
}

export default async function LeadGenIndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const data = getIndustryServicePageData(industry, 'lead-generation');

  if (!data) {
    // If we don't have industry-specific data, redirect to main lead-generation page
    redirect('/services/lead-generation');
  }

  return (
    <IndustryServiceLayout data={data} industrySlug={industry} serviceSlug="lead-generation" allServiceData={rawServiceData} />
  );
}
