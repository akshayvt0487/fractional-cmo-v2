import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const GoogleAdsPainters = () => {
  const industry = industries['painters'];
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
      metaTitle="Google Ads for Painters | Painting Contractor PPC Agency Australia"
      metaDescription="Expert Google Ads management for painting contractors. Generate more painting leads with targeted PPC campaigns for residential and commercial painters."
      keywords="google ads painters, painting ppc, painter advertising, painting contractor google ads"
      heroTitle="Google Ads for Painters"
      heroSubtitle="More Painting Jobs with Targeted Google Ads"
      heroDescription="Get in front of homeowners and businesses searching for painters right now. Our Google Ads campaigns deliver qualified leads for interior, exterior, residential, and commercial painting jobs."
      benefits={[
        'Immediate visibility when people search for painters',
        'Target residential and commercial separately',
        'Local targeting for your service areas',
        'Call tracking for phone enquiries',
        'Before/after image ads to showcase work',
        'Seasonal campaign adjustments'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Service-Specific Campaigns', description: 'Separate campaigns for interior, exterior, residential, and commercial painting ensure relevant ads.' },
        { title: 'Visual Ad Extensions', description: 'Image extensions showcase your best before/after transformations directly in search results.' },
        { title: 'Seasonal Optimization', description: 'We adjust bids and budgets based on seasonal painting demand patterns.' },
        { title: 'Review Integration', description: 'Seller ratings and review extensions build trust directly in your ads.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'What budget do painters typically need?', answer: 'Most painters start with $1,000-$2,500/month. Local painting keywords are generally more affordable than other trades.' },
        { question: 'Can you help with commercial painting leads?', answer: 'Yes, we run separate campaigns for commercial clients targeting property managers, businesses, and commercial property owners.' },
        { question: 'How do you handle seasonal slowdowns?', answer: 'We reduce spend during slow periods and ramp up before peak seasons. We also focus on interior painting during winter months.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default GoogleAdsPainters;
