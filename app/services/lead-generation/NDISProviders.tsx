import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const LeadGenNDISProviders = () => {
  const industry = industries['ndis-providers'];
  const service = services['lead-generation'];
  
  const relatedBlogs = industry.relatedBlogSlugs.leadGeneration.slice(0, 3).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as { title: string; slug: string; excerpt: string }[];

  return (
    <IndustryServiceLayout
      serviceName={service.name}
      industryName={industry.name}
      serviceSlug={service.slug}
      industrySlug={industry.slug}
      metaTitle="Lead Generation for NDIS Providers | NDIS Participant Leads Australia"
      metaDescription="Expert lead generation for NDIS providers. Connect with participants actively seeking disability support services. NDIS-compliant lead generation strategies."
      keywords="ndis lead generation, ndis participant leads, ndis provider leads, disability services leads"
      heroTitle="Lead Generation for NDIS Providers"
      heroSubtitle="Connect with Participants Seeking Your Services"
      heroDescription="Generate qualified participant enquiries through multi-channel lead generation. Our NDIS-compliant strategies connect you with people actively seeking disability support."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'NDIS-compliant lead generation strategies',
        'Multi-channel lead capture (search, social, referral)',
        'Qualified leads from genuine participants',
        'Referral network building with plan managers',
        'Customised lead forms and qualification'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Multi-Channel Lead Generation', description: 'Capture leads from search, social, referral networks, and support coordinator relationships.' },
        { title: 'NDIS-Compliant Strategies', description: 'All lead generation activities comply with NDIS marketing guidelines and ethical standards.' },
        { title: 'Qualification & Scoring', description: 'Lead qualification ensures you receive enquiries from genuine participants needing your services.' },
        { title: 'Referral Network Building', description: 'Strategies to build relationships with plan managers and support coordinators.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={[
        { question: 'How do you generate NDIS leads ethically?', answer: 'We focus on inbound marketing - attracting participants actively searching for services rather than outbound tactics. All strategies comply with NDIS guidelines.' },
        { question: 'What information do leads include?', answer: 'Leads include contact details, services needed, location, and any qualification information you require. We customise lead forms to your needs.' },
        ...(service.faqs || [])
      ]}
    />
  );
};

export default LeadGenNDISProviders;
