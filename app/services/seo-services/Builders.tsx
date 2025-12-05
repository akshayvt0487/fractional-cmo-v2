import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEOBuilders = () => {
  const industry = industries['builders'];
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
      metaTitle="SEO for Builders | Construction Company SEO Agency Australia"
      metaDescription="Expert SEO services for builders and construction companies. Rank higher for home building and renovation searches in your local area."
      keywords="builder seo, construction seo, home builder seo, renovation builder seo"
      heroTitle="SEO for Builders"
      heroSubtitle="Dominate Local Building Searches"
      heroDescription="Get found by homeowners searching for builders in your area. Our SEO strategies build long-term organic visibility for your construction business."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project Portfolio Optimization', description: 'Your completed projects become SEO assets with optimized case studies and image galleries.' },
        { title: 'Local Area Domination', description: 'Target specific suburbs and regions with location-specific content and local SEO tactics.' },
        { title: 'Service Page Strategy', description: 'Dedicated pages for new homes, renovations, extensions, and other services you offer.' },
        { title: 'Review & Reputation SEO', description: 'Leverage customer reviews for SEO benefit while building online credibility.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How important is local SEO for builders?', answer: 'Critical. Most building clients search locally. We optimize your Google Business Profile, create local content, and build local citations for your service areas.' },
        { question: 'Should we have pages for each suburb?', answer: 'For builders, we typically create region-based pages rather than individual suburbs. This provides better user experience while still capturing local search intent.' },
        { question: 'How do project galleries help SEO?', answer: 'Optimized project galleries attract traffic for visual searches, demonstrate expertise, and provide content for location and project-type keywords.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOBuilders;
