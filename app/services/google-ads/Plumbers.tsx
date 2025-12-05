import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsPlumbers = () => {
  const industry = industries['plumbers'];
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
      metaTitle="Google Ads for Plumbers | Plumbing PPC Advertising Agency Australia"
      metaDescription="Expert Google Ads management for plumbers. Capture emergency plumbing calls and generate leads for residential and commercial plumbing services."
      keywords="google ads plumbers, plumbing ppc, plumber advertising, plumbing contractor google ads"
      heroTitle="Google Ads for Plumbers"
      heroSubtitle="Capture Emergency Calls & Grow Your Plumbing Business"
      heroDescription="Be the first plumber customers find in an emergency. Our Google Ads campaigns capture urgent searches and generate consistent leads for all your plumbing services."
      benefits={[
        'Capture urgent emergency plumbing searches',
        '24/7 ad visibility for after-hours emergencies',
        'Click-to-call ads for immediate phone leads',
        'Local targeting for your service areas',
        'Separate campaigns for different services',
        'Google Local Service Ads management'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency-First Strategy', description: 'Priority bidding on emergency keywords like "emergency plumber" and "burst pipe" captures urgent high-value calls.' },
        { title: '24/7 Availability Messaging', description: 'Ad copy and extensions highlight your after-hours availability when customers need it most.' },
        { title: 'Service Category Campaigns', description: 'Separate campaigns for hot water, blocked drains, gas fitting, and renovations ensure relevant messaging.' },
        { title: 'Trust Building', description: 'Review extensions and licensing credentials in ads overcome customer trust concerns.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you capture emergency plumbing leads?', answer: 'We target emergency keywords with aggressive bidding and ad scheduling. Click-to-call ads and call extensions make it easy for panicked customers to reach you instantly.' },
        { question: 'What about Local Service Ads for plumbers?', answer: 'Local Service Ads are highly effective for plumbers. The Google Guarantee badge builds trust, and pay-per-lead pricing reduces risk. We recommend running both.' },
        { question: 'How do you handle after-hours advertising?', answer: 'We schedule ads to run 24/7 with messaging highlighting your after-hours service. Call tracking ensures leads route correctly even outside business hours.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsPlumbers;
