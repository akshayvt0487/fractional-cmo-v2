import { SITE_URL, SITE_NAME } from './seo';

/**
 * Article Schema - For blog posts and articles
 * Helps search engines understand article content and display rich snippets
 */
export interface ArticleSchemaInput {
  title: string;
  description: string;
  author: string;
  publishedDate: string; // ISO 8601 format: YYYY-MM-DD
  modifiedDate?: string; // ISO 8601 format: YYYY-MM-DD
  imageUrl: string;
  url: string;
  content?: string;
  keywords?: string[];
  readTime?: string;
}

export function generateArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    image: [input.imageUrl],
    datePublished: `${input.publishedDate}T00:00:00+00:00`,
    dateModified: input.modifiedDate ? `${input.modifiedDate}T00:00:00+00:00` : `${input.publishedDate}T00:00:00+00:00`,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL.replace(/\/$/, '')}/logo.png`,
      },
    },
    url: `${SITE_URL.replace(/\/$/, '')}${input.url}`,
    ...(input.keywords && {
      keywords: input.keywords.join(", "),
    }),
    ...(input.content && {
      articleBody: input.content,
    }),
  };
}

/**
 * Blog Posting Schema - More specific for blog posts with additional metadata
 */
export interface BlogPostingSchemaInput extends ArticleSchemaInput {
  category?: string;
}

export function generateBlogPostingSchema(input: BlogPostingSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    image: [input.imageUrl],
    datePublished: `${input.publishedDate}T00:00:00+00:00`,
    dateModified: input.modifiedDate ? `${input.modifiedDate}T00:00:00+00:00` : `${input.publishedDate}T00:00:00+00:00`,
    author: {
      "@type": "Person",
      name: input.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL.replace(/\/$/, '')}/logo.png`,
      },
    },
    isPartOf: {
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL.replace(/\/$/, '')}/blog`,
    },
    url: `${SITE_URL.replace(/\/$/, '')}${input.url}`,
    ...(input.keywords && {
      keywords: input.keywords.join(", "),
    }),
    ...(input.category && {
      articleSection: input.category,
    }),
    ...(input.content && {
      articleBody: input.content,
    }),
  };
}

/**
 * FAQ Schema - For frequently asked questions sections
 * Displays as expandable FAQ rich snippets in search results
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaInput {
  faqs: FAQItem[];
  url?: string;
}

export function generateFAQSchema(input: FAQSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: input.url ? `${SITE_URL.replace(/\/$/, '')}${input.url}` : SITE_URL,
    mainEntity: input.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * How-To Schema - For step-by-step guides and tutorials
 * Displays as step-by-step rich snippets in search results
 */
export interface HowToStep {
  name: string;
  description: string;
  image?: string; // Optional image for the step
}

export interface HowToSchemaInput {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  totalTime?: string; // ISO 8601 duration format: PT1H30M
  yield?: string; // Result or output of the how-to
  tools?: string[];
  supplies?: string[];
  steps: HowToStep[];
  url: string;
  keywords?: string[];
}

export function generateHowToSchema(input: HowToSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.title,
    description: input.description,
    image: [input.imageUrl],
    author: {
      "@type": "Person",
      name: input.author,
    },
    url: `${SITE_URL.replace(/\/$/, '')}${input.url}`,
    ...(input.totalTime && {
      totalTime: input.totalTime,
    }),
    ...(input.yield && {
      yield: input.yield,
    }),
    ...(input.tools && input.tools.length > 0 && {
      tool: input.tools.map((tool) => ({
        "@type": "HowToTool",
        name: tool,
      })),
    }),
    ...(input.supplies && input.supplies.length > 0 && {
      supply: input.supplies.map((supply) => ({
        "@type": "HowToSupply",
        name: supply,
      })),
    }),
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      description: step.description,
      ...(step.image && {
        image: step.image,
      }),
    })),
  };
}

/**
 * Organization Schema - For homepage and key pages
 * Establishes business identity and contact information
 */
export interface OrganizationSchemaInput {
  name?: string;
  description?: string;
  url?: string;
  logoUrl?: string;
  socialProfiles?: string[];
  contactPoint?: {
    type: string; // e.g., "Customer Service"
    telephone?: string;
    email?: string;
  };
}

export function generateOrganizationSchema(input: OrganizationSchemaInput = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name || SITE_NAME,
    description: input.description,
    url: input.url || SITE_URL,
    logo: input.logoUrl || `${SITE_URL.replace(/\/$/, '')}/logo.png`,
    ...(input.socialProfiles && input.socialProfiles.length > 0 && {
      sameAs: input.socialProfiles,
    }),
    ...(input.contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        contactType: input.contactPoint.type,
        ...(input.contactPoint.telephone && {
          telephone: input.contactPoint.telephone,
        }),
        ...(input.contactPoint.email && {
          email: input.contactPoint.email,
        }),
      },
    }),
  };
}

/**
 * BreadcrumbList Schema - For breadcrumb navigation
 * Helps search engines understand site structure and provides breadcrumb navigation in results
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListSchemaInput {
  items: BreadcrumbItem[];
}

export function generateBreadcrumbListSchema(input: BreadcrumbListSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL.replace(/\/$/, '')}${item.url}`,
    })),
  };
}

/**
 * Local Business Schema - For service pages targeting specific locations
 */
export interface LocalBusinessSchemaInput {
  name: string;
  description?: string;
  serviceType: string;
  areaServed?: string[];
  priceRange?: string;
  url: string;
  imageUrl?: string;
}

export function generateLocalBusinessSchema(input: LocalBusinessSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    ...(input.description && {
      description: input.description,
    }),
    url: `${SITE_URL.replace(/\/$/, '')}${input.url}`,
    ...(input.imageUrl && {
      image: input.imageUrl,
    }),
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    ...(input.areaServed && {
      areaServed: input.areaServed,
    }),
    ...(input.priceRange && {
      priceRange: input.priceRange,
    }),
    ...(input.serviceType && {
      knowsAbout: input.serviceType,
    }),
    sameAs: [
      "https://www.facebook.com/FractionalCMO",
      "https://www.linkedin.com/company/fractional-cmo",
    ],
  };
}

/**
 * Helper function to inject schema into head as script tag
 * Use in layout or page components
 */
export function SchemaScript({ schema }: { schema: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
