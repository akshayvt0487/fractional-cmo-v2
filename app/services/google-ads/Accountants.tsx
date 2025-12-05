import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsAccountants = () => {
  const industry = industries['accountants'];
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
      metaTitle="Google Ads for Accountants | Accounting Firm PPC Agency Australia"
      metaDescription="Expert Google Ads management for accountants and accounting firms. Generate quality leads during tax season and year-round with targeted PPC campaigns."
      keywords="google ads accountants, accounting ppc, accountant advertising, tax accountant google ads"
      heroTitle="Google Ads for Accountants"
      heroSubtitle="Generate Accounting Leads Year-Round"
      heroDescription="Reach businesses and individuals searching for accounting services. Our Google Ads campaigns deliver qualified leads for tax, business advisory, and specialist accounting services."
      benefits={[
        'Target businesses searching for accountants',
        'Tax season campaign scaling',
        'Industry-specific targeting (medical, trades, etc)',
        'Service-specific campaigns (tax, BAS, advisory)',
        'Professional credibility messaging',
        'Geographic targeting for your catchment'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Seasonal Campaign Management', description: 'We scale campaigns during tax season and maintain presence year-round for business advisory services.' },
        { title: 'Industry Specialisation', description: 'Target specific industries you specialise in like medical, trades, or professional services.' },
        { title: 'Service-Specific Targeting', description: 'Separate campaigns for tax returns, BAS, bookkeeping, and business advisory services.' },
        { title: 'Trust & Credibility', description: 'Ad messaging emphasizes qualifications, experience, and professional standards to build trust.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you handle tax season campaigns?', answer: 'We plan campaigns months in advance, scaling budgets significantly from May-October. Keywords and messaging shift to match seasonal intent.' },
        { question: 'Can you target specific industries?', answer: 'Yes, we create campaigns targeting business owners in specific industries like medical professionals, tradies, or e-commerce. This highlights your specialisation.' },
        { question: 'What makes accounting PPC different?', answer: 'Trust is paramount in accounting. Our ads emphasize qualifications, years of experience, and professional standards. Landing pages build credibility before asking for contact details.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsAccountants;
