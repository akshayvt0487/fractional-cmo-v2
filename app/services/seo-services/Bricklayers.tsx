
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const BricklayersSEO = () => {
  const industry = industries['bricklayers'];
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
      metaTitle="SEO for Bricklayers | Bricklaying SEO Agency Australia"
      metaDescription="Expert SEO services for bricklayers. Rank higher for masonry, residential, and commercial project searches."
      keywords="bricklayer seo, bricklaying seo, masonry seo"
      heroTitle="SEO for Bricklayers"
      heroSubtitle="Rank Higher for Masonry Project Searches"
      heroDescription="Build organic visibility that attracts masonry project leads. Our SEO strategies help you rank for residential, commercial, and specialty masonry searches."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'SEO for residential, commercial, and specialty masonry keywords',
        'Content strategies for project types and seasonal demand',
        'Local SEO for geographic targeting',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Type Content', description: 'Dedicated content for residential, commercial, and specialty masonry projects.' },
        { title: 'Local SEO', description: 'Optimize for local searches and service areas.' },
        { title: 'Authority Content', description: 'Educational content that builds trust and expertise.' },
        { title: 'Conversion Optimization', description: 'Landing pages and calls-to-action designed to convert visitors to leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is bricklayer SEO?', answer: 'Moderately competitive in metro areas. We focus on local targeting, project type content, and long-tail keywords.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default BricklayersSEO;
