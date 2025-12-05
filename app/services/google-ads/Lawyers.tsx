import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsLawyers = () => {
  const industry = industries['lawyers'];
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
      metaTitle="Google Ads for Lawyers | Law Firm PPC Advertising Agency Australia"
      metaDescription="Expert Google Ads management for lawyers and law firms. Generate quality leads for family law, criminal defence, conveyancing, and commercial legal services."
      keywords="google ads lawyers, law firm ppc, lawyer advertising, legal google ads, solicitor marketing"
      heroTitle="Google Ads for Lawyers"
      heroSubtitle="Generate Quality Legal Leads with Compliant PPC"
      heroDescription="Reach clients searching for legal services when they need help most. Our Google Ads campaigns comply with legal advertising rules while delivering qualified leads for your practice areas."
      benefits={[
        'Compliant with legal advertising regulations',
        'Practice area specific campaigns',
        'High-intent keyword targeting',
        'Confidential lead capture processes',
        'Geographic targeting for your jurisdiction',
        'Competitor positioning strategies'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Compliant Ad Copy', description: 'All ad copy complies with legal advertising regulations and law society guidelines.' },
        { title: 'Practice Area Focus', description: 'Separate campaigns for each practice area ensure relevant messaging and landing pages.' },
        { title: 'Trust-Building Strategy', description: 'Ads emphasize experience, credentials, and outcomes (where permitted) to build confidence.' },
        { title: 'Sensitive Lead Handling', description: 'Landing pages and lead capture processes respect client confidentiality from first touch.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'Are law firm Google Ads compliant?', answer: 'Yes, when done correctly. We ensure all ads comply with legal advertising regulations, avoid prohibited claims, and meet law society guidelines.' },
        { question: 'How competitive are legal keywords?', answer: 'Legal keywords are among the most competitive. We focus on long-tail keywords, specific practice areas, and local targeting to maximize value from your budget.' },
        { question: 'Can you target specific practice areas?', answer: 'Absolutely. We create separate campaigns for family law, criminal defence, conveyancing, commercial law, and other practice areas you serve.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsLawyers;
