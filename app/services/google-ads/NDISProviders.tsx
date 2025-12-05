import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services, getRelatedBlogs } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsNDISProviders = () => {
  const industry = industries['ndis-providers'];
  const service = services['google-ads'];
  
  // Get actual blog data
  const relatedBlogs = industry.relatedBlogSlugs.googleAds.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt
    } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Google Ads for NDIS Providers | NDIS PPC Advertising Agency Australia"
      metaDescription="Expert Google Ads management for NDIS providers. Generate more participant enquiries with targeted PPC campaigns. NDIS-compliant advertising specialists."
      keywords="google ads ndis, ndis ppc, ndis advertising, ndis provider google ads, ndis marketing agency"
      heroTitle="Google Ads for NDIS Providers"
      heroSubtitle="Generate More Participant Enquiries with Targeted PPC"
      heroDescription="Reach participants and families actively searching for disability support services. Our NDIS-compliant Google Ads campaigns connect you with people who need your services, when they need them most."
      benefits={[
        'NDIS-compliant ad copy and landing pages',
        'Targeted campaigns for specific NDIS services (SIL, respite, therapy)',
        'Geographic targeting for your service areas',
        'Conversion tracking for enquiries and phone calls',
        'Plan manager and support coordinator targeting',
        'Remarketing to engaged website visitors'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'NDIS-Compliant Campaigns', description: 'We create Google Ads campaigns that comply with NDIS marketing guidelines while still being compelling and effective.' },
        { title: 'Service-Specific Targeting', description: 'Separate campaigns for SIL, respite, community access, and other services ensure relevant ads for each search.' },
        { title: 'Family & Carer Focus', description: 'Targeting strategies that reach family members and carers who often make initial enquiries on behalf of participants.' },
        { title: 'Local Area Targeting', description: 'Precise geographic targeting ensures your ads show only to people in your service areas.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Are Google Ads NDIS compliant?', answer: 'Yes, when done correctly. We ensure all ad copy and landing pages follow NDIS marketing guidelines, avoiding prohibited claims while still being compelling.' },
        { question: 'What NDIS services work best with Google Ads?', answer: 'High-intent services like SIL accommodation, respite care, and allied health therapies typically perform well. We also run campaigns for support coordination and plan management.' },
        { question: 'How do you target NDIS participants?', answer: 'We target searches from participants, families, carers, and professionals. This includes service-specific keywords, location-based terms, and long-tail queries.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsNDISProviders;
