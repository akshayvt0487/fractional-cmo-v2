
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const PlumbersDigitalMarketing = () => {
  const industry = industries['plumbers'];
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
      metaTitle="Digital Marketing for Plumbers | Plumbing Services Australia"
      metaDescription="Expert digital marketing for plumbers. Grow your plumbing business with targeted online strategies."
      keywords="plumbers digital marketing, plumbing business marketing, plumber lead generation"
      heroTitle="Digital Marketing for Plumbers"
      heroSubtitle="Grow Your Plumbing Business Online"
      heroDescription="Keep your plumbing business busy with digital marketing strategies that deliver emergency calls and planned project enquiries."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Emergency lead capture for urgent jobs',
        'Service category targeting for all plumbing needs',
        'After-hours lead routing for 24/7 operations',
        'Quality guarantees and lead replacement',
        'Conversion tracking and reporting',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency Lead Capture', description: 'Instant delivery of emergency plumbing leads when response time matters most.' },
        { title: 'Service Category Targeting', description: 'Separate campaigns for hot water, blocked drains, gas fitting, and renovations.' },
        { title: 'After-Hours Lead Routing', description: 'Leads route correctly even outside business hours for 24/7 operations.' },
        { title: 'Quality Guarantees', description: 'Lead quality standards with replacement for any leads that do not meet criteria.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default PlumbersDigitalMarketing;
