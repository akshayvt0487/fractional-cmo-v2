
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const FinanceBrokersSEO = () => {
  const industry = industries['finance-brokers'];
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
      metaTitle="SEO for Finance Brokers | Finance Broker SEO Agency Australia"
      metaDescription="Expert SEO services for finance brokers. Rank higher for home loan, business finance, and asset finance searches."
      keywords="finance broker seo, home loan seo, business finance seo"
      heroTitle="SEO for Finance Brokers"
      heroSubtitle="Rank Higher for Finance Searches"
      heroDescription="Build organic visibility that attracts finance leads. Our SEO strategies help you rank for home loans, business finance, and asset finance searches."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'SEO for home loan, business finance, and asset finance keywords',
        'Content strategies for loan types and compliance',
        'Local SEO for geographic targeting',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Loan Type Content', description: 'Dedicated content for home loans, business finance, and asset finance.' },
        { title: 'Local SEO', description: 'Optimize for local searches and service areas.' },
        { title: 'Authority Content', description: 'Educational content that builds trust and expertise.' },
        { title: 'Conversion Optimization', description: 'Landing pages and calls-to-action designed to convert visitors to leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is finance broker SEO?', answer: 'Moderately competitive in metro areas. We focus on local targeting, loan type content, and long-tail keywords.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default FinanceBrokersSEO;
