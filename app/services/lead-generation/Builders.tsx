import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenBuilders = () => {
  const industry = industries['builders'];
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
      metaTitle="Lead Generation for Builders | Construction Leads Australia"
      metaDescription="Expert lead generation for builders. Generate quality leads for home builds, renovations, and commercial construction projects."
      keywords="builder lead generation, construction leads, home builder leads, renovation leads"
      heroTitle="Lead Generation for Builders"
      heroSubtitle="Quality Building Leads Delivered to You"
      heroDescription="Connect with homeowners ready to build. Our lead generation strategies deliver qualified enquiries for new builds, renovations, and commercial projects."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Qualified lead filtering for genuine building intent',
        'Project type targeting for new homes, renovations, commercial',
        'Geographic targeting for preferred service areas',
        'Lead nurturing for long decision cycles',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Qualified Lead Filtering', description: 'Pre-qualification ensures leads have budget, timeline, and genuine building intent.' },
        { title: 'Project Type Targeting', description: 'Separate lead streams for new homes, renovations, extensions, and commercial work.' },
        { title: 'Geographic Targeting', description: 'Focus lead generation on your preferred service areas and project locations.' },
        { title: 'Lead Nurturing', description: 'Follow-up sequences keep you top-of-mind during long building decision cycles.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify building leads?', answer: 'We use qualifying questions about budget range, timeline, project type, and land ownership to filter serious enquiries from browsers.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenBuilders;
