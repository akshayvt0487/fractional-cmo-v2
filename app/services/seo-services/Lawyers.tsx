import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import exportedData from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const { industries, services } = exportedData;

const SEOLawyers = () => {
  const industry = industries['lawyers'];
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
      metaTitle="SEO for Lawyers | Law Firm SEO Agency Australia"
      metaDescription="Expert SEO services for lawyers and law firms. Rank higher for legal searches and generate more enquiries for your practice areas."
      keywords="lawyer seo, law firm seo, legal seo, solicitor seo"
      heroTitle="SEO for Lawyers"
      heroSubtitle="Rank Higher for Legal Searches"
      heroDescription="Build organic visibility that generates quality legal enquiries. Our SEO strategies help your firm rank for practice area searches in your jurisdiction."
      benefits={service.benefits}
      challenges={industry.challenges}
      solutions={[
        { title: 'Practice Area Pages', description: 'Comprehensive, authoritative pages for each practice area that rank and convert.' },
        { title: 'Local SEO Excellence', description: 'Dominate legal searches in your jurisdiction with strategic local optimization.' },
        { title: 'Authority Content', description: 'Educational content that demonstrates expertise while respecting ethical constraints.' },
        { title: 'Technical SEO Foundation', description: 'Fast, secure website structure that search engines trust for legal information.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How competitive is legal SEO?', answer: 'Legal SEO is highly competitive. We focus on practice area niches, local targeting, and long-tail keywords where smaller firms can compete effectively.' },
        { question: 'What content should law firms publish?', answer: 'Educational content about legal processes, guides for specific situations, and practice area information. All content must comply with legal advertising rules.' },
        { question: 'Do you handle multiple practice areas?', answer: 'Yes, we create content silos for each practice area with proper internal linking. This builds authority in each area while maintaining site organisation.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default SEOLawyers;
