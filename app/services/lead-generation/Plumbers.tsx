import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenPlumbers = () => {
  const industry = industries['plumbers'];
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
      metaTitle="Lead Generation for Plumbers | Plumbing Leads Australia"
      metaDescription="Expert lead generation for plumbers. Generate quality leads for emergency, residential, and commercial plumbing services."
      keywords="plumber lead generation, plumbing leads, plumber leads"
      heroTitle="Lead Generation for Plumbers"
      heroSubtitle="Consistent Plumbing Leads Delivered Daily"
      heroDescription="Keep your plumbing business busy with quality leads. Our lead generation delivers emergency calls and planned plumbing project enquiries."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Emergency lead capture for urgent jobs',
        'Service category targeting for all plumbing needs',
        'After-hours lead routing for 24/7 operations',
        'Quality guarantees and lead replacement',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency Lead Capture', description: 'Instant delivery of emergency plumbing leads when response time matters most.' },
        { title: 'Service Category Targeting', description: 'Separate lead streams for hot water, blocked drains, gas fitting, and renovations.' },
        { title: 'After-Hours Lead Routing', description: 'Leads route correctly even outside business hours for 24/7 operations.' },
        { title: 'Quality Guarantees', description: 'Lead quality standards with replacement for any leads that do not meet criteria.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you handle emergency plumbing leads?', answer: 'Emergency leads are delivered instantly via SMS with click-to-call. You can respond within seconds to capture urgent jobs.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenPlumbers;
