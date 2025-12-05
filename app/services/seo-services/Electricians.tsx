import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEOElectricians = () => {
  const industry = industries['electricians'];
  const service = services['seo'];
  
  const relatedBlogs = industry.relatedBlogSlugs.seo.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="SEO for Electricians | Electrical Contractor SEO Agency Australia"
      metaDescription="Expert SEO services for electricians. Rank higher for local electrical searches and capture both emergency and planned electrical work leads."
      keywords="electrician seo, electrical contractor seo, local electrician seo"
      heroTitle="SEO for Electricians"
      heroSubtitle="Dominate Local Electrical Searches"
      heroDescription="Be the electrician customers find first. Our SEO strategies build long-term organic visibility for emergency and planned electrical services."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Emergency Service Visibility', description: 'Optimize for emergency electrical searches to capture urgent organic traffic.' },
        { title: 'Specialisation Pages', description: 'Dedicated pages for solar, EV chargers, smart home, and commercial electrical services.' },
        { title: 'Local Map Pack Dominance', description: 'Strategic Google Business Profile optimization to appear in the local 3-pack for electrical searches.' },
        { title: 'Trust Signal Optimization', description: 'Showcase licensing, insurance, and qualifications prominently for SEO and conversions.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Can SEO capture emergency electrical searches?', answer: 'Yes, we optimize for emergency keywords. While many use ads for emergencies, strong organic presence captures customers who scroll past ads.' },
        { question: 'How important are reviews for electrician SEO?', answer: 'Very important. Google uses review signals for local rankings, and reviews heavily influence which electrician customers choose.' },
        { question: 'Should I create pages for specialty services?', answer: 'Absolutely. Dedicated pages for solar, EV chargers, and other specialties capture specific search intent and position you as an expert.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOElectricians;
