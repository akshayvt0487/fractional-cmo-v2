import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsElectricians = () => {
  const industry = industries['electricians'];
  const service = services['google-ads'];
  
  const relatedBlogs = industry.relatedBlogSlugs.googleAds.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Google Ads for Electricians | Electrical Contractor PPC Agency Australia"
      metaDescription="Expert Google Ads management for electricians. Capture emergency calls and generate leads for residential, commercial, and specialised electrical services."
      keywords="google ads electricians, electrical ppc, electrician advertising, electrical contractor google ads"
      heroTitle="Google Ads for Electricians"
      heroSubtitle="Capture More Electrical Jobs with Targeted PPC"
      heroDescription="Be there when customers need an electrician urgently. Our Google Ads campaigns capture emergency searches and generate qualified leads for all your electrical services."
      benefits={[
        'Capture urgent emergency electrical searches',
        '24/7 campaign management for after-hours calls',
        'Separate campaigns for residential and commercial',
        'Click-to-call ads for immediate phone leads',
        'Target specialised services (solar, EV chargers)',
        'Local Service Ads management'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency Response Campaigns', description: 'Priority campaigns for emergency keywords ensure you capture urgent electrical calls.' },
        { title: '24/7 Call Tracking', description: 'After-hours call tracking and routing ensures you never miss an emergency lead.' },
        { title: 'Specialisation Targeting', description: 'Separate campaigns for solar, EV chargers, smart home, and commercial electrical.' },
        { title: 'Local Service Ads', description: 'We manage Google Local Service Ads for additional lead generation with pay-per-lead pricing.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you capture emergency electrical leads?', answer: 'We bid aggressively on emergency keywords and use ad scheduling to capture urgent searches 24/7. Click-to-call ads make it easy to contact you immediately.' },
        { question: 'Should I use Local Service Ads?', answer: 'Yes, Local Service Ads are excellent for electricians. You only pay for leads, and the Google Guarantee badge builds trust. We recommend using both.' },
        { question: 'Can you target specific electrical services?', answer: 'Absolutely. We create separate campaigns for solar installation, EV charger installation, commercial electrical, and residential services.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsElectricians;
