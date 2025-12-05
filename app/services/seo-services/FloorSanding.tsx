
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const FloorSandingSEO = () => {
  const industry = industries['floor-sanding'];
  const service = services['seo'];
  const relatedBlogs = industry.relatedBlogSlugs.seo?.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="SEO for Floor Sanding | Floor Sanding SEO Agency Australia"
      metaDescription="Expert SEO services for floor sanding professionals. Rank higher for residential and commercial floor sanding project searches."
      keywords="floor sanding seo, floor sanding leads, floor finishing seo"
      heroTitle="SEO for Floor Sanding"
      heroSubtitle="Rank Higher for Floor Sanding Project Searches"
      heroDescription="Build organic visibility that attracts floor sanding project leads. Our SEO strategies help you rank for residential, commercial, and specialty floor sanding searches."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'SEO for residential, commercial, and specialty floor sanding keywords',
        'Content strategies for project types and seasonal demand',
        'Local SEO for geographic targeting',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking',
        'Conversion tracking and reporting'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Type Content', description: 'Dedicated content for residential, commercial, and specialty floor sanding projects.' },
        { title: 'Local SEO', description: 'Optimize for local searches and service areas.' },
        { title: 'Authority Content', description: 'Educational content that builds trust and expertise.' },
        { title: 'Conversion Optimization', description: 'Landing pages and calls-to-action designed to convert visitors to leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default FloorSandingSEO;
