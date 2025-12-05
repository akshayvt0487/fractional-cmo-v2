import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenElectricians = () => {
  const industry = industries['electricians'];
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
      metaTitle="Lead Generation for Electricians | Electrical Leads Australia"
      metaDescription="Expert lead generation for electricians. Generate quality leads for residential, commercial, and specialty electrical services."
      keywords="electrician lead generation, electrical leads, electrician leads"
      heroTitle="Lead Generation for Electricians"
      heroSubtitle="Quality Electrical Leads On Demand"
      heroDescription="Fill your job sheet with quality electrical work. Our lead generation delivers enquiries for residential, commercial, and specialty electrical services."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Emergency and planned lead capture',
        'Specialty service targeting (solar, EV, smart home)',
        'Commercial lead generation for contracts',
        'Instant lead alerts and notifications',
        'Transparent lead quality and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency & Planned Leads', description: 'Capture both urgent emergency calls and planned electrical project enquiries.' },
        { title: 'Specialty Service Targeting', description: 'Generate leads specifically for solar, EV chargers, and smart home services.' },
        { title: 'Commercial Lead Generation', description: 'Strategies to attract commercial and industrial electrical contracts.' },
        { title: 'Instant Lead Alerts', description: 'Real-time notifications ensure you can respond to leads immediately.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Can you generate leads for specialty electrical services?', answer: 'Yes, we create targeted campaigns for solar installation, EV charger installation, smart home, and other specialty services you offer.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenElectricians;
