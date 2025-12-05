import IndustryServiceLayout from '@/components/IndustryServiceLayout';

import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const FinanceBrokersLeadGeneration = () => {
  const industry = industries['finance-brokers'];
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
      metaTitle="Lead Generation for Finance Brokers | Finance Leads Australia"
      metaDescription="Expert lead generation for finance brokers. Generate quality leads for home loans, business finance, and asset finance."
      keywords="finance broker lead generation, finance leads, home loan leads, business finance leads"
      heroTitle="Lead Generation for Finance Brokers"
      heroSubtitle="Quality Finance Leads Delivered to You"
      heroDescription="Grow your finance business with qualified client enquiries. Our lead generation strategies deliver leads for home loans, business finance, and asset finance."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Qualified Lead Filtering', description: 'Pre-qualification ensures leads meet lending criteria and genuine finance intent.' },
        { title: 'Loan Type Targeting', description: 'Separate lead streams for home loans, business finance, and asset finance.' },
        { title: 'Compliance & Privacy', description: 'Lead capture and handling respects privacy and regulatory requirements.' },
        { title: 'Lead Nurturing', description: 'Follow-up sequences keep you top-of-mind during long finance decision cycles.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you qualify finance leads?', answer: 'We use qualifying questions about loan type, amount, credit history, and business needs to filter serious enquiries from browsers.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default FinanceBrokersLeadGeneration;
