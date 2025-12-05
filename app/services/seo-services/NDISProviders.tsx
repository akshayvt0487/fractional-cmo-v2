import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEONDISProviders = () => {
  const industry = industries['ndis-providers'];
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
      metaTitle="SEO for NDIS Providers | NDIS Search Optimization Agency Australia"
      metaDescription="Expert SEO services for NDIS providers. Rank higher for disability support searches and attract more participants organically with NDIS-compliant content."
      keywords="ndis seo, ndis provider seo, disability services seo, ndis search optimization"
      heroTitle="SEO for NDIS Providers"
      heroSubtitle="Rank Higher for Disability Support Searches"
      heroDescription="Build sustainable organic visibility for your NDIS services. Our SEO strategies help participants and families find you when searching for disability support in your area."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'NDIS Service Page Optimization', description: 'Dedicated pages for each NDIS service you offer, optimized for how participants search.' },
        { title: 'Local SEO Excellence', description: 'Dominate local searches in your service areas with optimized Google Business Profile and local citations.' },
        { title: 'Content Authority Building', description: 'Educational content that positions you as a trusted NDIS expert while improving rankings.' },
        { title: 'Technical SEO Foundation', description: 'Fast, mobile-friendly website structure that search engines love and participants can navigate easily.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How long does NDIS SEO take to work?', answer: 'Initial improvements typically appear in 3-4 months. Significant ranking improvements for competitive NDIS keywords usually take 6-12 months of consistent effort.' },
        { question: 'What NDIS keywords should we target?', answer: 'We target service-specific keywords (SIL, respite, therapy), location-based searches, and long-tail queries that participants and families actually use.' },
        { question: 'Do you handle Google Business Profile?', answer: 'Yes, local SEO including Google Business Profile optimization is crucial for NDIS providers and is included in our services.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEONDISProviders;
