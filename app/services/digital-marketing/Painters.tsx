
import IndustryServiceLayout from '@/components/IndustryServiceLayout';
import { industries, services } from '@/data/industryServiceData';
import { blogPosts } from '@/data/blogPosts';

const PaintersDigitalMarketing = () => {
  const industry = industries['painters'];
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
      metaTitle="Digital Marketing for Painters | Painting Contractors Australia"
      metaDescription="Expert digital marketing for painting contractors. Grow your painting business with targeted online strategies."
      keywords="painters digital marketing, painting contractor marketing, painter lead generation"
      heroTitle="Digital Marketing for Painters"
      heroSubtitle="Grow Your Painting Business Online"
      heroDescription="Get more painting jobs with digital marketing strategies that fill your quote pipeline. We target profitable suburbs and deliver instant leads."
      benefits={service.benefits && service.benefits.length > 0 ? service.benefits : [
        'Local lead targeting for profitable suburbs',
        'Instant lead delivery via SMS and email',
        'Job type filtering for residential and commercial painting',
        'Seasonal optimization for peak periods',
        'Transparent lead quality and replacement guarantees',
        'Conversion tracking and reporting'
      ]}
      challenges={industry.challenges}
      solutions={[
        { title: 'Local Lead Targeting', description: 'Focus marketing on profitable suburbs within your service area.' },
        { title: 'Job Type Filtering', description: 'Separate campaigns for interior, exterior, residential, and commercial painting.' },
        { title: 'Instant Lead Delivery', description: 'Leads delivered instantly via SMS and email so you can respond fast.' },
        { title: 'Seasonal Optimization', description: 'Ramp up marketing before peak seasons and adjust during slow periods.' }
      ]}
      relatedBlogs={relatedBlogs}
      faqs={service.faqs || []}
    />
  );
};

export default PaintersDigitalMarketing;
