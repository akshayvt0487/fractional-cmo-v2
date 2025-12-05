
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const BricklayersLeadGeneration = () => {
  const industry = industries['bricklayers'];
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
      metaTitle="Lead Generation for Bricklayers | Bricklaying Leads Australia"
      metaDescription="Expert lead generation for bricklayers. Generate quality leads for residential, commercial, and specialty masonry projects."
      keywords="bricklayer lead generation, bricklaying leads, masonry leads"
      heroTitle="Lead Generation for Bricklayers"
      heroSubtitle="Quality Masonry Leads Delivered to You"
      heroDescription="Grow your bricklaying business with qualified project enquiries. Our lead generation strategies deliver leads for new builds, renovations, and specialty masonry work."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Type Targeting', description: 'Separate lead streams for residential, commercial, and specialty masonry projects.' },
        { title: 'Seasonal Demand Management', description: 'Strategies to maintain lead flow during off-peak seasons.' },
        { title: 'Lead Qualification', description: 'Pre-qualification ensures leads have genuine project intent and budget.' },
        { title: 'Follow-Up Systems', description: 'Automated follow-up keeps you top-of-mind for long decision cycles.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify bricklaying leads?', answer: 'We ask about project type, timeline, budget, and any special requirements to filter serious enquiries.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default BricklayersLeadGeneration;
