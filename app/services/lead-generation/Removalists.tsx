
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const LeadGenRemovalists = () => {
  const industry = industries['removalists'];
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
      metaTitle="Lead Generation for Removalists | Moving Leads Australia"
      metaDescription="Expert lead generation for removalist companies. Generate quality quote requests for local, interstate, and commercial moves."
      keywords="removalist lead generation, moving leads, furniture removal leads"
      heroTitle="Lead Generation for Removalists"
      heroSubtitle="More Moving Quotes, More Booked Jobs"
      heroDescription="Fill your calendar with quality moving jobs. Our lead generation delivers quote requests from people actively planning their move."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Targeted lead generation for local, interstate, and commercial moves',
        'Pre-qualified leads with genuine moving needs',
        'Automated follow-up systems for higher conversion',
        'Geographic targeting for preferred service areas',
        'Transparent lead quality and replacement guarantees'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Move Type Targeting', description: 'Separate lead streams for house moves, office relocations, and interstate moves.' },
        { title: 'Geographic Focus', description: 'Target moves originating from or going to your preferred areas.' },
        { title: 'Lead Qualification', description: 'Pre-qualification filters ensure leads have genuine moving needs and realistic expectations.' },
        { title: 'Quote Follow-Up Systems', description: 'Automated follow-up keeps you top-of-mind while customers compare quotes.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify moving leads?', answer: 'We ask about move date, origin/destination, home size, and any special requirements. This filters out tyre-kickers and price-only shoppers.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenRemovalists;
