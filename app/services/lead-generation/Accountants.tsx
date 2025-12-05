import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenAccountants = () => {
  const industry = industries['accountants'];
  const service = services['lead-generation'];
  const relatedBlogs = industry.relatedBlogSlugs.leadGeneration.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Lead Generation for Accountants | Accounting Leads Australia"
      metaDescription="Expert lead generation for accountants. Generate quality leads for tax, bookkeeping, and business advisory services year-round."
      keywords="accountant lead generation, accounting leads, tax client leads"
      heroTitle="Lead Generation for Accountants"
      heroSubtitle="Quality Accounting Leads Year-Round"
      heroDescription="Grow your client base with qualified accounting leads. Our lead generation delivers enquiries for tax, bookkeeping, and advisory services."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Year-round lead flow for tax, bookkeeping, and advisory',
        'Business type targeting for specialised services',
        'Service-specific leads for tax, BAS, and advisory',
        'Long-term nurturing for prospects',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Year-Round Lead Flow', description: 'Strategies that generate leads during tax season and throughout the year.' },
        { title: 'Business Type Targeting', description: 'Target specific business types and industries you specialise in.' },
        { title: 'Service-Specific Leads', description: 'Separate leads for tax, BAS, bookkeeping, and business advisory services.' },
        { title: 'Lead Nurturing', description: 'Long-term nurturing for prospects not ready to switch accountants immediately.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you generate leads outside tax season?', answer: 'We focus on business advisory, new business formation, bookkeeping, and industry-specific services that businesses need year-round.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenAccountants;
