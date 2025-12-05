
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const BuyersAgentsSEO = () => {
  const industry = industries['buyers-agents'];
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
      metaTitle="SEO for Buyers Agents | Buyers Agent SEO Agency Australia"
      metaDescription="Expert SEO services for buyers agents. Rank higher for property buyer searches and attract qualified leads."
      keywords="buyers agent seo, property buyer seo, real estate seo"
      heroTitle="SEO for Buyers Agents"
      heroSubtitle="Rank Higher for Property Buyer Searches"
      heroDescription="Build organic visibility that attracts property buyers. Our SEO strategies help you rank for first home buyers, investors, and commercial property searches."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Targeted SEO for property buyer keywords',
        'Content strategies for first home buyers, investors, and commercial clients',
        'Local SEO for geographic targeting',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Buyer Type Content', description: 'Dedicated content for first home buyers, investors, and commercial buyers.' },
        { title: 'Local SEO', description: 'Optimize for local searches and service areas.' },
        { title: 'Authority Content', description: 'Educational content that builds trust and expertise.' },
        { title: 'Conversion Optimization', description: 'Landing pages and calls-to-action designed to convert visitors to leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is buyers agent SEO?', answer: 'Moderately competitive in metro areas. We focus on local targeting, buyer type content, and long-tail keywords.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default BuyersAgentsSEO;
