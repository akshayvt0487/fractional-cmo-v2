
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const FloorSandingLeadGeneration = () => {
  const industry = industries['floor-sanding'];
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
      metaTitle="Lead Generation for Floor Sanding | Floor Sanding Leads Australia"
      metaDescription="Expert lead generation for floor sanding professionals. Generate quality leads for residential and commercial floor sanding projects."
      keywords="floor sanding lead generation, floor sanding leads, floor finishing leads"
      heroTitle="Lead Generation for Floor Sanding"
      heroSubtitle="Quality Floor Sanding Leads Delivered to You"
      heroDescription="Grow your floor sanding business with qualified project enquiries. Our lead generation strategies deliver leads for residential and commercial floor sanding jobs."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Type Targeting', description: 'Separate lead streams for residential, commercial, and specialty floor sanding projects.' },
        { title: 'Seasonal Demand Management', description: 'Strategies to maintain lead flow during off-peak seasons.' },
        { title: 'Lead Qualification', description: 'Pre-qualification ensures leads have genuine project intent and budget.' },
        { title: 'Follow-Up Systems', description: 'Automated follow-up keeps you top-of-mind for long decision cycles.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify floor sanding leads?', answer: 'We ask about project type, timeline, budget, and any special requirements to filter serious enquiries.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default FloorSandingLeadGeneration;
