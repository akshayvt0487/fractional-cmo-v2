
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const BricklayersDigitalMarketing = () => {
  const industry = industries['bricklayers'];
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
      metaTitle="Digital Marketing for Bricklayers | Masonry Services Australia"
      metaDescription="Expert digital marketing for bricklayers. Grow your masonry business with targeted online strategies."
      keywords="bricklayers digital marketing, masonry business marketing, bricklayer lead generation"
      heroTitle="Digital Marketing for Bricklayers"
      heroSubtitle="Grow Your Masonry Business Online"
      heroDescription="Grow your bricklaying business with digital marketing strategies that deliver project enquiries for residential, commercial, and specialty masonry work."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'SEO for residential, commercial, and specialty masonry keywords',
        'Content strategies for project types and seasonal demand',
        'Local SEO for geographic targeting',
        'Authority-building content for trust',
        'Transparent reporting and conversion tracking',
        'Conversion tracking and reporting'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Type Content', description: 'Dedicated content for residential, commercial, and specialty masonry projects.' },
        { title: 'Local SEO', description: 'Optimize for local searches and service areas.' },
        { title: 'Authority Content', description: 'Educational content that builds trust and expertise.' },
        { title: 'Conversion Optimization', description: 'Landing pages and calls-to-action designed to convert visitors to leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default BricklayersDigitalMarketing;
