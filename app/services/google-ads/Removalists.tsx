import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsRemovalists = () => {
  const industry = industries['removalists'];
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
      metaTitle="Google Ads for Removalists | Moving Company PPC Agency Australia"
      metaDescription="Expert Google Ads management for removalist companies. Generate quality moving leads for local, interstate, and commercial relocations."
      keywords="google ads removalists, moving company ppc, removalist advertising, furniture removals google ads"
      heroTitle="Google Ads for Removalists"
      heroSubtitle="Generate Quality Moving Leads with Google Ads"
      heroDescription="Reach people actively planning their move. Our Google Ads campaigns connect you with customers searching for removalists, delivering qualified quote requests for local and interstate moves."
      benefits={[
        'Target people actively planning moves',
        'Separate campaigns for local and interstate',
        'Geographic targeting for origin suburbs',
        'Quote request focused landing pages',
        'Remarketing to engaged visitors',
        'Competitive conquest campaigns'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Move Type Targeting', description: 'Separate campaigns for house moves, office relocations, and interstate moves ensure relevant messaging for each customer type.' },
        { title: 'Origin-Destination Targeting', description: 'Geographic targeting captures searches from both origin suburbs and interstate route searches.' },
        { title: 'Trust-Building Ads', description: 'Review extensions and trust signals in ads overcome common concerns about removalist services.' },
        { title: 'Quote Funnel Optimization', description: 'Landing pages optimized for quote requests rather than just information seekers.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you target people who are actually moving?', answer: 'We target search intent signals like "removalist quotes", "moving company", and location-specific searches. Negative keywords filter out job seekers and DIY movers.' },
        { question: 'Can you target interstate moves?', answer: 'Yes, we create specific campaigns for interstate routes like Sydney-Melbourne or Brisbane-Sydney, targeting people searching for these specific moves.' },
        { question: 'How do you handle the quote comparison behaviour?', answer: 'We optimize landing pages for quick quote submission and use remarketing to stay top-of-mind while customers compare quotes from multiple removalists.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsRemovalists;
