import { blogPosts } from './blogPosts';

type RelatedBlogSlugs = {
  googleAds: string[];
  seo: string[];
  leadGeneration: string[];
};

type Industry = {
  name: string;
  slug: string;
  description: string;
  relatedBlogSlugs: RelatedBlogSlugs;
  challenges?: string[];
};

type Service = {
  name: string;
  slug: string;
  parentSlug: string;
  benefits?: string[];
  faqs?: { question: string; answer: string }[];
};

export const industries: Record<string, Industry> = {
  electricians: {
    name: 'Electricians',
    slug: 'electricians',
    description: 'Electrical contractors and service providers',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Seasonal demand variation', 'High competition from local traders', 'Limited online visibility'],
  },
  plumbers: {
    name: 'Plumbers',
    slug: 'plumbers',
    description: 'Plumbing service professionals',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Emergency call nature of business', 'Geographic service area limits', 'Competitive local market'],
  },
  painters: {
    name: 'Painters',
    slug: 'painters',
    description: 'Professional painting contractors',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Seasonal demand fluctuation', 'Long sales cycles', 'Word-of-mouth dependency'],
  },
  lawyers: {
    name: 'Lawyers',
    slug: 'lawyers',
    description: 'Legal professionals and law firms',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['High competition for leads', 'Long decision cycles', 'Regulatory compliance requirements'],
  },
  builders: {
    name: 'Builders',
    slug: 'builders',
    description: 'Home builders and construction companies',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Long project timelines', 'Complex buyer journey', 'Multiple decision-makers'],
  },
  accountants: {
    name: 'Accountants',
    slug: 'accountants',
    description: 'Accounting and bookkeeping professionals',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Seasonal nature (tax time peaks)', 'Building client trust', 'Standing out in crowded market'],
  },
  'ndis-providers': {
    name: 'NDIS Providers',
    slug: 'ndis-providers',
    description: 'National Disability Insurance Scheme service providers',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Compliance requirements', 'Complex participant needs', 'Funding variations'],
  },
  removalists: {
    name: 'Removalists',
    slug: 'removalists',
    description: 'Moving and relocation service companies',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Price-sensitive market', 'Seasonal peak periods', 'Low repeat purchase rate'],
  },
  bricklayers: {
    name: 'Bricklayers',
    slug: 'bricklayers',
    description: 'Bricklaying and masonry professionals',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Seasonal weather dependency', 'Finding consistent work', 'High competition in local market'],
  },
  'buyers-agents': {
    name: 'Buyers Agents',
    slug: 'buyers-agents',
    description: 'Property buyers agents and advocates',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Building buyer confidence', 'Complex property market', 'Competitive agent landscape'],
  },
  'finance-brokers': {
    name: 'Finance Brokers',
    slug: 'finance-brokers',
    description: 'Financial services brokers',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Regulatory compliance', 'Client trust and credibility', 'High competition in finance sector'],
  },
  'floor-sanding': {
    name: 'Floor Sanding',
    slug: 'floor-sanding',
    description: 'Floor sanding and finishing services',
    relatedBlogSlugs: { googleAds: [], seo: [], leadGeneration: [] },
    challenges: ['Project-based business model', 'Geographic service limitations', 'Seasonal demand variations'],
  }
};

export const services: Record<string, Service> = {
  'google-ads': { name: 'Google Ads', slug: 'google-ads', parentSlug: 'google-ads', faqs: [], benefits: [] },
  seo: { name: 'SEO', slug: 'seo', parentSlug: 'seo', faqs: [], benefits: [] },
  'lead-generation': { name: 'Lead Generation', slug: 'lead-generation', parentSlug: 'lead-generation', faqs: [], benefits: [] },
  'digital-growth-strategy': { name: 'Digital Growth Strategy', slug: 'digital-growth-strategy', parentSlug: 'digital-growth-strategy', faqs: [], benefits: [] },
  'email-marketing': { name: 'Email Marketing', slug: 'email-marketing', parentSlug: 'email-marketing', faqs: [], benefits: [] },
  'social-media-marketing': { name: 'Social Media Marketing', slug: 'social-media-marketing', parentSlug: 'social-media-marketing', faqs: [], benefits: [] },
  'online-marketing': { name: 'Online Marketing', slug: 'online-marketing', parentSlug: 'online-marketing', faqs: [], benefits: [] },
  'digital-marketing': { name: 'Digital Marketing', slug: 'digital-marketing', parentSlug: 'digital-marketing', faqs: [], benefits: [] },
  'seo-services': { name: 'SEO Services', slug: 'seo-services', parentSlug: 'seo-services', faqs: [], benefits: [] },
};

export function getRelatedBlogs(industrySlug: string, serviceSlug: string) {
  const industry = industries[industrySlug];
  if (!industry) return [];
  
  // Map service slug to the correct property in relatedBlogSlugs
  const slugProperty = serviceSlug === 'google-ads' ? 'googleAds' : 
                       serviceSlug === 'seo' ? 'seo' : 
                       serviceSlug === 'lead-generation' ? 'leadGeneration' : null;
  
  if (!slugProperty || !industry.relatedBlogSlugs[slugProperty as keyof RelatedBlogSlugs]) {
    return [];
  }
  
  const blogSlugs = industry.relatedBlogSlugs[slugProperty as keyof RelatedBlogSlugs];
  return blogSlugs
    .map((slug) => blogPosts.find((b) => b.slug === slug))
    .filter(Boolean) as { title: string; slug: string; excerpt?: string }[];
}

const exportedData = { industries, services, getRelatedBlogs };
export default exportedData;
