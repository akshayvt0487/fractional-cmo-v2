import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenPainters = () => {
  const industry = industries['painters'];
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
      metaTitle="Lead Generation for Painters | Painting Leads Australia"
      metaDescription="Expert lead generation for painting contractors. Generate quality leads for residential and commercial painting jobs in your area."
      keywords="painter lead generation, painting leads, house painter leads, commercial painting leads"
      heroTitle="Lead Generation for Painters"
      heroSubtitle="More Painting Jobs, Less Chasing Quotes"
      heroDescription="Get a steady stream of painting enquiries delivered to you. Our lead generation fills your quote pipeline with qualified residential and commercial opportunities."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Local lead targeting for profitable suburbs',
        'Instant lead delivery via SMS and email',
        'Job type filtering for residential and commercial painting',
        'Seasonal optimization for peak periods',
        'Transparent lead quality and replacement guarantees'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Local Lead Targeting', description: 'Focus lead generation on profitable suburbs within your service area.' },
        { title: 'Job Type Filtering', description: 'Separate leads for interior, exterior, residential, and commercial painting.' },
        { title: 'Instant Lead Delivery', description: 'Leads delivered instantly via SMS and email so you can respond fast.' },
        { title: 'Seasonal Optimization', description: 'Ramp up lead generation before peak seasons and adjust during slow periods.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How quickly are painting leads delivered?', answer: 'Leads are delivered instantly via SMS and email, allowing you to respond within minutes and increase conversion rates.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenPainters;
