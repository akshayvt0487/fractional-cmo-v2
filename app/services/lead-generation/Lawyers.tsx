import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenLawyers = () => {
  const industry = industries['lawyers'];
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
      metaTitle="Lead Generation for Lawyers | Legal Leads Australia"
      metaDescription="Expert lead generation for lawyers and law firms. Generate quality enquiries for family law, criminal defence, conveyancing, and commercial legal services."
      keywords="lawyer lead generation, legal leads, law firm leads"
      heroTitle="Lead Generation for Lawyers"
      heroSubtitle="Quality Legal Enquiries for Your Practice"
      heroDescription="Grow your legal practice with qualified client enquiries. Our ethical lead generation strategies connect you with people needing legal help."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Practice area focus for targeted legal leads',
        'Ethical lead generation compliant with regulations',
        'Confidential processes for client privacy',
        'Quality over quantity for better conversion',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Practice Area Focus', description: 'Targeted lead generation for your specific practice areas.' },
        { title: 'Ethical Lead Generation', description: 'All strategies comply with legal advertising regulations and ethical standards.' },
        { title: 'Confidential Processes', description: 'Lead capture and handling respects client confidentiality from first contact.' },
        { title: 'Quality Over Quantity', description: 'Focus on qualified enquiries rather than high volumes of unqualified leads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Is legal lead generation compliant?', answer: 'Yes, all our lead generation strategies comply with legal advertising regulations and law society guidelines. We focus on inbound marketing approaches.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenLawyers;
