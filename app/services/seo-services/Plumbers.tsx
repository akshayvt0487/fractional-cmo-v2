import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const SEOPlumbers = () => {
  const industry = industries['plumbers'];
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
      metaTitle="SEO for Plumbers | Plumbing Company SEO Agency Australia"
      metaDescription="Expert SEO services for plumbers. Rank higher for local plumbing searches and build sustainable organic lead generation for your plumbing business."
      keywords="plumber seo, plumbing seo, local plumber seo, plumbing company seo"
      heroTitle="SEO for Plumbers"
      heroSubtitle="Rank Higher for Local Plumbing Searches"
      heroDescription="Build organic visibility that generates plumbing leads around the clock. Our SEO strategies help you rank for both emergency and planned plumbing searches."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Service Area Optimization', description: 'Target the specific suburbs and regions you serve with location-optimized content.' },
        { title: 'Service Type Pages', description: 'Dedicated pages for hot water, blocked drains, gas fitting, renovations, and other services.' },
        { title: 'Emergency Keyword Targeting', description: 'Capture organic traffic from emergency plumbing searches with optimized content.' },
        { title: 'Google Business Excellence', description: 'Comprehensive Google Business Profile optimization for local pack rankings.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Does SEO work for emergency plumbing searches?', answer: 'Yes. While ads dominate emergency searches, many people scroll past ads or search on their phone where organic results are prominent. Strong SEO captures this traffic.' },
        { question: 'How many location pages do I need?', answer: 'We create pages for your key service areas without creating thin content. Typically 5-15 well-crafted location pages work better than hundreds of thin pages.' },
        { question: 'What content should plumbers create?', answer: 'Educational content about common plumbing issues, service descriptions, and location pages. We focus on content that attracts potential customers, not DIYers.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOPlumbers;
