import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEORemovalists = () => {
  const industry = industries['removalists'];
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
      metaTitle="SEO for Removalists | Moving Company SEO Agency Australia"
      metaDescription="Expert SEO services for removalist companies. Rank higher for local and interstate moving searches to generate more quote requests."
      keywords="removalist seo, moving company seo, furniture removals seo"
      heroTitle="SEO for Removalists"
      heroSubtitle="Rank Higher for Moving Searches"
      heroDescription="Get found by people planning their move. Our SEO strategies build organic visibility for local, interstate, and commercial removals."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Route-Based Optimization', description: 'Target specific moving routes (Sydney to Melbourne, Brisbane to Gold Coast) with dedicated content.' },
        { title: 'Suburb Origin Targeting', description: 'Capture searches from people moving out of specific suburbs in your service areas.' },
        { title: 'Service Type Pages', description: 'Dedicated pages for house moves, office relocations, interstate moves, and specialty services.' },
        { title: 'Trust & Review Optimization', description: 'Showcase reviews and build trust signals that overcome moving anxiety.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you target interstate moves?', answer: 'We create dedicated route pages targeting searches like "Sydney to Melbourne removalists" and optimize for high-value interstate moving keywords.' },
        { question: 'Should I target both origin and destination suburbs?', answer: 'Yes, we optimize for origin suburbs (where people are moving from) as this is how most people search when planning a move.' },
        { question: 'How important are reviews for removalist SEO?', answer: 'Extremely important. Moving involves trust with belongings, and reviews heavily influence both rankings and customer decisions.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEORemovalists;
