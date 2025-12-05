import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsBuilders = () => {
  const industry = industries['builders'];
  const service = services['google-ads'];
  
  const relatedBlogs = industry.relatedBlogSlugs.googleAds.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Google Ads for Builders | Construction PPC Advertising Agency Australia"
      metaDescription="Expert Google Ads management for builders and construction companies. Generate quality leads for home builds, renovations, and commercial projects."
      keywords="google ads builders, construction ppc, builder advertising, home builder google ads, renovation google ads"
      heroTitle="Google Ads for Builders"
      heroSubtitle="Generate Quality Building Leads with Targeted PPC"
      heroDescription="Connect with homeowners and businesses actively searching for building services. Our Google Ads campaigns target high-intent searches to deliver qualified leads for your construction business."
      benefits={[
        'Target homeowners ready to build or renovate',
        'Separate campaigns for residential and commercial',
        'Geographic targeting for your service areas',
        'Quality lead filtering to reduce tyre-kickers',
        'Project type targeting (new builds, renovations, extensions)',
        'Competitor conquest campaigns'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Project-Specific Campaigns', description: 'Dedicated campaigns for new homes, renovations, extensions, and commercial projects ensure relevant messaging.' },
        { title: 'Quality Lead Filtering', description: 'Our campaigns target serious buyers with proper budget and timeline, not just price shoppers.' },
        { title: 'Portfolio Showcase Ads', description: 'Image extensions and display ads showcase your completed projects to build credibility.' },
        { title: 'Seasonal Campaign Management', description: 'We adjust campaigns based on seasonal demand patterns in the construction industry.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you target serious building enquiries?', answer: 'We use specific keywords, negative keywords to filter budget shoppers, and qualifying landing pages to attract homeowners with genuine building projects.' },
        { question: 'What budget do builders typically need?', answer: 'Most builders start with $2,000-$5,000/month. Building keywords can be competitive, but the high project values justify the investment.' },
        { question: 'Can you target specific project types?', answer: 'Yes, we create separate campaigns for new homes, renovations, granny flats, extensions, and commercial projects.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsBuilders;
