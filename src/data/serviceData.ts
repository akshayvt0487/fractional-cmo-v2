// Unified service data - TypeScript wrapper for serviceData.json
import data from './serviceData.json';
import { blogPosts } from './blogPosts';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface CapabilityItem {
  iconName: string;
  title: string;
  description: string;
}

export interface SolutionsData {
  sectionTitle: string;
  sectionSubtitle: string;
  items: CapabilityItem[];
}

export interface CapabilitiesData {
  solutions: SolutionsData;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  category: string;
}

export interface OpenGraphData {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export interface WhyChoosePoint {
  title: string;
  description: string;
}

export interface WhyChooseSection {
  title: string;
  description: string;
  points: WhyChoosePoint[];
}

export interface MainServicePageData {
  serviceName: string;
  serviceSlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPoints?: string[];
  whyChoose?: WhyChooseSection;
  features: ServiceFeature[];
  // optional legacy/extended fields
  solutions?: ServiceFeature[];
  challenges?: string[];
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
  relatedArticles: RelatedArticle[];
  benefits: string[];
  industries: string[];
  schemaType: string;
  schemaDescription: string;
}

export interface IndustryData {
  name: string;
  slug: string;
  description: string;
  challenges: { title: string; description: string }[];
  relatedBlogSlugs: {
    googleAds: string[];
    seo: string[];
    leadGeneration: string[];
    digitalMarketing: string[];
  };
}

export interface ServiceData {
  name: string;
  slug: string;
  parentSlug: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface IndustryServiceSolution {
  icon?: string;
  title: string;
  description: string;
}

export interface IndustryServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedBlog {
  title: string;
  slug: string;
  excerpt: string;
}

export interface IndustryServicePageData {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroPoints?: string[];
  benefits: string[];
  // challenges in the JSON may be either simple strings or structured objects
  challenges?: Array<string | { title: string; description: string }>;
  solutions: IndustryServiceSolution[];
  faqs: IndustryServiceFAQ[];
  // some entries include related articles by object form
  relatedArticles?: RelatedArticle[];
}

// ============================================
// DATA EXPORTS
// ============================================

export const capabilitiesData: CapabilitiesData = data.capabilities as CapabilitiesData;
export const mainServicePages: Record<string, MainServicePageData> = data.mainServicePages as Record<string, MainServicePageData>;
export const industries: Record<string, IndustryData> = data.industries as Record<string, IndustryData>;
export const services: Record<string, ServiceData> = data.services as Record<string, ServiceData>;
export const siteUrl = data.siteUrl;
export const defaultImage = `${data.siteUrl}${data.defaultImage}`;

// ============================================
// HELPER FUNCTIONS
// ============================================

const industryServiceContent = (data as any).industryServiceContent as Record<string, Record<string, IndustryServicePageData>>;

// Export raw JSON and industry content so pages can load everything directly when needed
export const rawServiceData = data as any;
export const industryServiceContentMap = industryServiceContent;

export const getIndustryServicePageData = (industrySlug: string, serviceSlug: string): IndustryServicePageData | null => {
  const industryContent = industryServiceContent?.[industrySlug];
  if (!industryContent) return null;
  return industryContent[serviceSlug] || null;
};

export const getMainServicePageData = (serviceSlug: string): MainServicePageData | null => {
  return mainServicePages[serviceSlug] || null;
};

// Backwards-compatible generateServiceSchema: accepts either the new pageData object
// or legacy args: (serviceTitle, serviceSlug, description).
export const generateServiceSchema = (a: MainServicePageData | string, b?: string, c?: string) => {
  let pageData: Partial<MainServicePageData> = {};
  if (typeof a === 'object') {
    pageData = a as MainServicePageData;
  } else {
    pageData = {
      serviceName: a as string,
      serviceSlug: b || '',
      schemaDescription: c || '',
      schemaType: 'Service'
    } as Partial<MainServicePageData>;
  }

  return {
    '@context': 'https://schema.org',
    '@type': (pageData as any).schemaType || 'Service',
    name: (pageData as any).serviceName,
    description: (pageData as any).schemaDescription || (pageData as any).metaDescription || '',
    provider: {
      '@type': 'Organization',
      name: 'Basheer Padanna - Fractional CMO',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: defaultImage
      }
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia'
    },
    serviceType: (pageData as any).serviceName,
    url: `${siteUrl}/services/${(pageData as any).serviceSlug || ''}`,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteUrl}/services/${(pageData as any).serviceSlug || ''}`,
      serviceLocation: {
        '@type': 'Place',
        name: 'Australia'
      }
    }
  };
};

export const generateFAQSchema = (faqs: ServiceFAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
});

export const generateBreadcrumbSchema = (serviceName: string, serviceSlug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
    { '@type': 'ListItem', position: 3, name: serviceName, item: `${siteUrl}/services/${serviceSlug}` }
  ]
});

export const generateMainServiceOGData = (pageData: MainServicePageData): OpenGraphData => ({
  ogTitle: pageData.metaTitle,
  ogDescription: pageData.metaDescription,
  ogImage: defaultImage,
  ogUrl: `${siteUrl}/services/${pageData.serviceSlug}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: pageData.metaTitle,
  twitterDescription: pageData.metaDescription,
  twitterImage: defaultImage
});

export const getMainServicePageDataWithOG = (serviceSlug: string) => {
  const pageData = getMainServicePageData(serviceSlug);
  if (!pageData) return null;
  return { ...pageData, openGraph: generateMainServiceOGData(pageData) };
};

export const getRelatedBlogs = (industrySlug: string, serviceSlug: string, limit = 3): RelatedBlog[] => {
  const industry = industries[industrySlug];
  if (!industry) return [];
  const blogSlugKey = serviceSlug === 'seo' ? 'seo' : serviceSlug === 'google-ads' ? 'googleAds' : serviceSlug === 'lead-generation' ? 'leadGeneration' : 'digitalMarketing';
  const slugs = industry.relatedBlogSlugs[blogSlugKey as keyof typeof industry.relatedBlogSlugs] || [];
  return slugs.slice(0, limit).map(slug => {
    const blog = blogPosts.find(b => b.slug === slug);
    return blog ? { title: blog.title, slug: blog.slug, excerpt: blog.excerpt } : null;
  }).filter(Boolean) as RelatedBlog[];
};

export const generateIndustryServiceOG = (industrySlug: string, serviceSlug: string): OpenGraphData | null => {
  const industry = industries[industrySlug];
  const service = services[serviceSlug];
  if (!industry || !service) return null;
  const title = `${service.name} for ${industry.name} | Expert ${service.name} Agency Australia`;
  const description = `Professional ${service.name.toLowerCase()} services for ${industry.description}. Grow your ${industry.name.toLowerCase()} business with proven digital marketing strategies.`;
  return {
    ogTitle: title, ogDescription: description, ogImage: defaultImage,
    ogUrl: `${siteUrl}/services/${serviceSlug}/${industrySlug}`, ogType: 'website',
    twitterCard: 'summary_large_image', twitterTitle: title, twitterDescription: description, twitterImage: defaultImage
  };
};

export const generateIndustryServiceMeta = (industrySlug: string, serviceSlug: string) => {
  const industry = industries[industrySlug];
  const service = services[serviceSlug];
  if (!industry || !service) return null;
  return {
    title: `${service.name} for ${industry.name} | Expert ${service.name} Agency Australia`,
    description: `Professional ${service.name.toLowerCase()} services for ${industry.description}.`,
    keywords: `${service.name.toLowerCase()} ${industry.name.toLowerCase()}, ${industry.slug} ${service.slug}`,
    openGraph: generateIndustryServiceOG(industrySlug, serviceSlug)
  };
};

export const generateIndustryServiceSchema = (industryName: string, serviceName: string, industrySlug: string, serviceSlug: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `${serviceName} for ${industryName}`,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Basheer Padanna - Fractional CMO',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: defaultImage
    }
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia'
  },
  serviceType: serviceName,
  audience: {
    '@type': 'Audience',
    audienceType: industryName
  },
  url: `${siteUrl}/services/${serviceSlug}/${industrySlug}`,
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${siteUrl}/services/${serviceSlug}/${industrySlug}`,
    serviceLocation: {
      '@type': 'Place',
      name: 'Australia'
    }
  }
});

export const generateIndustryFAQSchema = (faqs: IndustryServiceFAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
});

export const generateIndustryBreadcrumbSchema = (serviceName: string, industryName: string, serviceSlug: string, industrySlug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
    { '@type': 'ListItem', position: 3, name: serviceName, item: `${siteUrl}/services/${serviceSlug}` },
    { '@type': 'ListItem', position: 4, name: `${serviceName} for ${industryName}`, item: `${siteUrl}/services/${serviceSlug}/${industrySlug}` }
  ]
});

export const generateIndustryServiceOGData = (pageData: IndustryServicePageData, industrySlug: string, serviceSlug: string): OpenGraphData => ({
  ogTitle: pageData.metaTitle, ogDescription: pageData.metaDescription, ogImage: defaultImage,
  ogUrl: `${siteUrl}/services/${serviceSlug}/${industrySlug}`, ogType: 'website',
  twitterCard: 'summary_large_image', twitterTitle: pageData.metaTitle, twitterDescription: pageData.metaDescription, twitterImage: defaultImage
});
