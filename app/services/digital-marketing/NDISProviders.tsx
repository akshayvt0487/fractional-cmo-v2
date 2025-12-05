
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const NDISProvidersDigitalMarketing = () => {
  const industry = industries['ndis-providers'];
  const service = services['digital-marketing'];
  const relatedBlogs = industry.relatedBlogSlugs.googleAds?.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Digital Marketing for NDIS Providers | Disability Services Australia"
      metaDescription="Expert digital marketing for NDIS providers. Grow your disability support business with compliant, ethical, and effective online strategies."
      keywords="ndis digital marketing, disability services marketing, ndis provider marketing"
      heroTitle="Digital Marketing for NDIS Providers"
      heroSubtitle="Grow Your Disability Support Business Online"
      heroDescription="Reach more participants and build your brand with NDIS-compliant digital marketing. Our strategies attract genuine enquiries and build trust."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'NDIS-compliant marketing strategies',
        'Multi-channel campaigns (search, social, referral)',
        'Qualified leads from genuine participants',
        'Referral network building with plan managers',
        'Customised lead forms and qualification',
        'Transparent reporting and conversion tracking'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Multi-Channel Campaigns', description: 'Capture leads from search, social, referral networks, and support coordinator relationships.' },
        { title: 'NDIS-Compliant Strategies', description: 'All marketing activities comply with NDIS guidelines and ethical standards.' },
        { title: 'Qualification & Scoring', description: 'Lead qualification ensures you receive enquiries from genuine participants needing your services.' },
        { title: 'Referral Network Building', description: 'Strategies to build relationships with plan managers and support coordinators.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default NDISProvidersDigitalMarketing;
