
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const AccountantsDigitalMarketing = () => {
  const industry = industries['accountants'];
  const service = services['digital-marketing'];
  const relatedBlogs = industry.relatedBlogSlugs.googleAds?.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Digital Marketing for Accountants | Accounting Firms Australia"
      metaDescription="Expert digital marketing for accountants. Grow your accounting business with targeted online strategies."
      keywords="accountants digital marketing, accounting firm marketing, accountant lead generation"
      heroTitle="Digital Marketing for Accountants"
      heroSubtitle="Grow Your Accounting Business Online"
      heroDescription="Build organic visibility and attract new clients with digital marketing strategies for accountants. We target tax, advisory, and specialist services."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Year-round digital marketing for tax, advisory, and specialist services',
        'Industry niche campaigns for targeted visibility',
        'Comprehensive service page optimization',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking',
        'Conversion tracking and reporting'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Year-Round Campaigns', description: 'Marketing calendar that captures seasonal tax searches while building advisory service visibility year-round.' },
        { title: 'Industry Niche Campaigns', description: 'Target specific industries you specialise in (medical, trades, hospitality) with dedicated campaigns.' },
        { title: 'Service Page Optimization', description: 'Comprehensive pages for tax returns, BAS, bookkeeping, business advisory, and other services.' },
        { title: 'Authority Content', description: 'Educational content that establishes expertise and builds trust before first contact.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default AccountantsDigitalMarketing;
