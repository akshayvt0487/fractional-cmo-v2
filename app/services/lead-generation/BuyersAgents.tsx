
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const BuyersAgentsLeadGeneration = () => {
  const industry = industries['buyers-agents'];
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
      metaTitle="Lead Generation for Buyers Agents | Buyers Agent Leads Australia"
      metaDescription="Expert lead generation for buyers agents. Generate quality leads for property buyers seeking professional advocacy."
      keywords="buyers agent lead generation, buyers agent leads, property buyer leads"
      heroTitle="Lead Generation for Buyers Agents"
      heroSubtitle="Quality Property Buyer Leads Delivered to You"
      heroDescription="Grow your buyers agent business with qualified property buyer enquiries. Our lead generation strategies deliver leads for residential and commercial property purchases."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Buyer Type Targeting', description: 'Separate lead streams for first home buyers, investors, and commercial buyers.' },
        { title: 'Confidence Building', description: 'Strategies to build trust and confidence with prospective buyers.' },
        { title: 'Lead Qualification', description: 'Pre-qualification ensures leads have genuine buying intent and budget.' },
        { title: 'Follow-Up Systems', description: 'Automated follow-up keeps you top-of-mind for long property decision cycles.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify buyers agent leads?', answer: 'We ask about buyer type, property goals, budget, and timeline to filter serious enquiries.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default BuyersAgentsLeadGeneration;
