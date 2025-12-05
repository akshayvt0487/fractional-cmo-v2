import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEOPainters = () => {
  const industry = industries['painters'];
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
      metaTitle="SEO for Painters | Painting Contractor SEO Agency Australia"
      metaDescription="Expert SEO services for painting contractors. Rank higher for local painting searches and attract more residential and commercial painting leads."
      keywords="painter seo, painting contractor seo, house painter seo, commercial painter seo"
      heroTitle="SEO for Painters"
      heroSubtitle="Rank Higher for Local Painting Searches"
      heroDescription="Get found when homeowners search for painters in your area. Our SEO strategies build sustainable organic visibility for your painting business."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Before/After Galleries', description: 'Optimized transformation galleries that rank in image search and showcase your work quality.' },
        { title: 'Suburb-Specific Pages', description: 'Location pages targeting the specific suburbs you serve for local painting searches.' },
        { title: 'Service Type Targeting', description: 'Separate pages for interior, exterior, residential, and commercial painting services.' },
        { title: 'Review Generation & SEO', description: 'Systematic review collection that boosts both credibility and local SEO rankings.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is painter SEO?', answer: 'Local painter SEO is moderately competitive. With proper strategy, most painters can achieve strong local rankings within 6-12 months.' },
        { question: 'Should I create suburb pages?', answer: 'Yes, location-specific pages targeting key suburbs you serve are essential for local painter SEO. We create these strategically to avoid thin content.' },
        { question: 'How do before/after images help SEO?', answer: 'Optimized galleries attract image search traffic, increase time on site, and provide visual proof of quality that converts visitors to leads.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOPainters;
