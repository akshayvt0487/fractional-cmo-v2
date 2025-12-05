import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEOAccountants = () => {
  const industry = industries['accountants'];
  const service = services['seo'];
  
  const relatedBlogs = industry.relatedBlogSlugs.seo.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="SEO for Accountants | Accounting Firm SEO Agency Australia"
      metaDescription="Expert SEO services for accountants and accounting firms. Rank higher for tax, bookkeeping, and business advisory searches year-round."
      keywords="accountant seo, accounting firm seo, tax accountant seo, cpa seo"
      heroTitle="SEO for Accountants"
      heroSubtitle="Rank Higher for Accounting Searches"
      heroDescription="Build organic visibility that generates accounting leads throughout the year. Our SEO strategies help you rank for tax, advisory, and specialist accounting services."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Year-round SEO for tax, advisory, and specialist services',
        'Industry niche pages for targeted visibility',
        'Comprehensive service page optimization',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Year-Round Content Strategy', description: 'Content calendar that captures seasonal tax searches while building advisory service visibility year-round.' },
        { title: 'Industry Niche Pages', description: 'Target specific industries you specialise in (medical, trades, hospitality) with dedicated content.' },
        { title: 'Service Page Optimization', description: 'Comprehensive pages for tax returns, BAS, bookkeeping, business advisory, and other services.' },
        { title: 'Authority Content', description: 'Educational content that establishes expertise and builds trust before first contact.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is accountant SEO?', answer: 'Moderately competitive in metro areas. Our strategy focuses on local targeting, industry niches, and long-tail keywords where competition is lower.' },
        { question: 'What content should accountants publish?', answer: 'Tax tips, compliance updates, industry-specific advice, and business growth content. We focus on content that attracts potential clients, not DIY tax filers.' },
        { question: 'How do you handle seasonal traffic patterns?', answer: 'We optimize for tax season while building content for year-round services like business advisory. This smooths traffic and leads throughout the year.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOAccountants;
