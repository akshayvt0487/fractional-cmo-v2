// Enhanced SEO utility functions for comprehensive optimization

import type { StaticImageData } from 'next/image';

export interface ArticleData {
  headline: string;
  description: string;
  author?: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  imageUrl?: string | StaticImageData;
  category?: string;
  readTime?: string;
  tags?: string[];
}

export const generateArticleSchema = (article: ArticleData) => {
  const baseUrl = "https://fractional-cmo.com.au";
  
 // Convert image URL to absolute path for schema
  const getAbsoluteImageUrl = (imgUrl?: string) => {
    
    // FIX: Check if imgUrl is *actually* a string and not empty.
    // This now catches undefined, null, empty strings, numbers, and objects.
    if (typeof imgUrl !== 'string' || !imgUrl) {
      return `${baseUrl}/lovable-uploads/5016915a-7345-483c-9d8f-50938a28715f.png`;
    }

    // By this point, we know imgUrl is a valid, non-empty string.
    if (imgUrl.startsWith('http')) return imgUrl;
    return imgUrl.startsWith('/') ? `${baseUrl}${imgUrl}` : `${baseUrl}/${imgUrl}`;
  };
  
  // Normalize imageUrl (handle StaticImageData)
  const imageUrlStr = typeof article.imageUrl === 'string' ? article.imageUrl : (article.imageUrl as any)?.src;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author || "Basheer Padanna",
      "jobTitle": "Fractional CMO",
      "url": `${baseUrl}/about`,
      "sameAs": [
        "https://www.linkedin.com/in/basheerpadanna"
      ],
      "knowsAbout": [
        "Digital Marketing",
        "Growth Strategy", 
        "Lead Generation",
        "Fractional CMO Services"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Basheer Padanna",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/lovable-uploads/5016915a-7345-483c-9d8f-50938a28715f.png`
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate || article.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}${article.url}`
    },
    "image": {
      "@type": "ImageObject",
      "url": getAbsoluteImageUrl(imageUrlStr),
      "width": 1200,
      "height": 630
    },
    "keywords": article.tags?.join(", ") || "",
    "articleSection": article.category || "Business Growth",
    "wordCount": "2000",
    "timeRequired": article.readTime || "10 min read",
    "inLanguage": "en-AU",
    "about": {
      "@type": "Thing",
      "name": article.category || "Digital Marketing"
    }
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  const baseUrl = "https://fractional-cmo.com.au";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  };
};

export const generatePersonSchema = () => {
  const baseUrl = "https://fractional-cmo.com.au";
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Basheer Padanna",
    "jobTitle": "Fractional CMO",
    "description": "Fractional CMO specializing in digital marketing strategy, lead generation, and growth optimization for service businesses across Australia and globally.",
    "url": baseUrl,
    "image": `${baseUrl}/assets/basheer-padanna-professional.png`,
    "sameAs": [
      "https://www.linkedin.com/in/basheerpadanna"
    ],
    "knowsAbout": [
      "Digital Marketing Strategy",
      "Growth Marketing", 
      "Lead Generation",
      "Google Ads",
      "SEO",
      "Conversion Optimization",
      "Marketing Automation",
      "B2B Marketing",
      "Service Business Growth"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Digital Marketing Certification"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Fractional Chief Marketing Officer",
      "occupationalCategory": "Marketing and Sales Managers",
      "responsibilities": [
        "Digital marketing strategy development",
        "Lead generation optimization", 
        "Growth marketing implementation",
        "Marketing team leadership"
      ]
    }
  };
};

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Dynamic related articles generator
import { blogPosts, type BlogPost } from '@/data/blogPosts';

export const getRelatedArticles = (currentSlug: string, count: number = 3) => {
  const currentPost = blogPosts.find(post => post.slug === currentSlug);
  if (!currentPost) return [];

  // Extract keywords from current post including excerpt
  const extractKeywords = (text: string): string[] => {
    const words = text.toLowerCase().split(/\s+/);
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'how', 'what', 'when', 'where', 'why', 'complete', 'guide', '2025', '2024', '2023', 'strategy', 'strategies', 'best', 'top', 'new', 'your', 'our', 'their', 'this', 'that', 'these', 'those'];
    return words.filter(word => word.length > 4 && !commonWords.includes(word));
  };

  const currentTitleKeywords = extractKeywords(currentPost.title);
  const currentExcerptKeywords = extractKeywords(currentPost.excerpt);
  const currentAllKeywords = [...new Set([...currentTitleKeywords, ...currentExcerptKeywords])];
  const currentCategory = currentPost.category.split(' - ')[0]; // Get main category
  const currentSubCategory = currentPost.category.includes(' - ') ? currentPost.category.split(' - ')[1] : '';

  // Score each post based on relevance
  const scoredPosts = blogPosts
    .filter(post => post.slug !== currentSlug) // Exclude current post
    .map(post => {
      let score = 0;
      const postTitleKeywords = extractKeywords(post.title);
      const postExcerptKeywords = extractKeywords(post.excerpt);
      const postAllKeywords = [...new Set([...postTitleKeywords, ...postExcerptKeywords])];
      const postMainCategory = post.category.split(' - ')[0];
      const postSubCategory = post.category.includes(' - ') ? post.category.split(' - ')[1] : '';

      // Same subcategory: +20 points (most specific match)
      if (currentSubCategory && postSubCategory && currentSubCategory === postSubCategory) {
        score += 20;
      }

      // Same main category: +10 points
      if (postMainCategory === currentCategory) {
        score += 10;
      }

      // Shared title keywords: +5 points each (title is more important)
      const sharedTitleKeywords = currentTitleKeywords.filter(kw => 
        postTitleKeywords.some(pk => pk.includes(kw) || kw.includes(pk) || kw === pk)
      );
      score += sharedTitleKeywords.length * 5;

      // Shared keywords (title + excerpt): +3 points each
      const sharedKeywords = currentAllKeywords.filter(kw => 
        postAllKeywords.some(pk => pk.includes(kw) || kw.includes(pk) || kw === pk)
      );
      score += sharedKeywords.length * 3;

      // Same author: +2 points
      if (post.author === currentPost.author) {
        score += 2;
      }

      // Add some randomness to avoid always showing same posts (±3 points)
      score += Math.floor(Math.random() * 7) - 3;

      return { post, score, sharedKeywords: sharedKeywords.length };
    })
    .filter(({ score }) => score > 5) // Only include posts with meaningful relevance
    .sort((a, b) => {
      // Sort by score first
      if (b.score !== a.score) return b.score - a.score;
      // If scores are equal, prefer newer posts
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, count * 2) // Take top 2N candidates
    .sort(() => Math.random() - 0.5) // Shuffle for variety
    .slice(0, count); // Take final N

  return scoredPosts.map(({ post }) => ({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    category: post.category,
    readTime: post.readTime
  }));
};

// Enhanced related articles with better categorization and SEO focus
export const relatedArticles = {
  fractionalCMO: [
    {
      title: "What is a Fractional CMO? Complete Guide for Business Owners",
      description: "Comprehensive guide to understanding fractional CMO services, benefits, costs, and when to hire one for your business growth.",
      url: "/blog/what-is-fractional-cmo",
      category: "Fractional CMO",
      readTime: "8 min read"
    },
    {
      title: "Fractional CMO vs Full-Time CMO: Which is Right for Your Business?",
      description: "Compare fractional vs full-time CMO options with cost analysis, benefits, and decision framework for growing businesses.",
      url: "/blog/fractional-cmo-vs-full-time-cmo", 
      category: "Fractional CMO",
      readTime: "12 min read"
    },
    {
      title: "When to Hire a Fractional CMO: Signs Your Business Needs Strategic Marketing Leadership",
      description: "Identify key indicators and timing for hiring a fractional CMO to accelerate your business growth and marketing success.",
      url: "/blog/when-to-hire-fractional-cmo",
      category: "Fractional CMO", 
      readTime: "10 min read"
    }
  ],
  ndis: [
    {
      title: "NDIS Digital Marketing Excellence: Advanced Strategies for Providers",
      description: "Master advanced digital marketing tactics with cutting-edge strategies and compliance-focused approaches for NDIS providers.",
      url: "/blog/ndis-digital-marketing-excellence",
      category: "NDIS Marketing",
      readTime: "15 min read"
    },
    {
      title: "NDIS Business Growth Strategy: Scale Your Disability Services",
      description: "Comprehensive growth strategies for NDIS providers including operations, compliance, and sustainable scaling frameworks.",
      url: "/blog/ndis-business-growth-strategy",
      category: "NDIS Growth",
      readTime: "18 min read"
    },
    {
      title: "Advanced NDIS Lead Generation: Multi-Channel Strategy Guide",
      description: "Master advanced lead generation with proven multi-channel strategies, automation systems, and compliance-focused approaches.",
      url: "/blog/advanced-ndis-lead-generation",
      category: "NDIS Lead Gen",
      readTime: "20 min read"
    }
  ],
  digitalMarketing: [
    {
      title: "Digital Marketing ROI: How Service Businesses Measure Success",
      description: "Complete guide to measuring and optimizing digital marketing ROI with key metrics, tools, and frameworks for service businesses.",
      url: "/blog/digital-marketing-roi-service-businesses",
      category: "Analytics",
      readTime: "13 min read"
    },
    {
      title: "Google Ads for Service Businesses: Complete Setup Guide",
      description: "Master Google Ads for service-based businesses with proven campaign setup, optimization techniques, and budget strategies.",
      url: "/blog/google-ads-service-businesses",
      category: "Google Ads",
      readTime: "16 min read"
    },
    {
      title: "Local SEO for Trade Businesses: Complete Ranking Guide",
      description: "Dominate local search results with proven SEO strategies specifically designed for trade and service businesses.",
      url: "/blog/local-seo-trade-businesses", 
      category: "SEO",
      readTime: "14 min read"
    }
  ],
  construction: [
    {
      title: "Construction Lead Generation: Proven Strategies for Builders",
      description: "Generate high-quality construction leads with proven digital marketing strategies, lead magnets, and conversion optimization.",
      url: "/blog/construction-lead-generation-strategies",
      category: "Construction Marketing",
      readTime: "17 min read"
    },
    {
      title: "Home Builders Lead Generation: Digital Marketing Guide",
      description: "Comprehensive lead generation strategies for home builders including digital marketing, referral systems, and conversion optimization.",
      url: "/blog/home-builders-lead-generation",
      category: "Home Building",
      readTime: "19 min read"
    }
  ],
  legal: [
    {
      title: "Conveyancing Digital Marketing ROI: Measuring Success",
      description: "Track and optimize your conveyancing firm's digital marketing ROI with proven metrics, tools, and measurement frameworks.",
      url: "/blog/conveyancing-digital-marketing-roi",
      category: "Legal Marketing",
      readTime: "12 min read"
    },
    {
      title: "Family Lawyers Digital Marketing: Client Acquisition Guide",
      description: "Comprehensive digital marketing strategies for family law firms including lead generation, content marketing, and client retention.",
      url: "/blog/family-lawyers-digital-marketing",
      category: "Legal Marketing", 
      readTime: "15 min read"
    }
  ],
  tradies: [
    {
      title: "Trade Business Growth: Marketing Strategies That Work",
      description: "Proven marketing strategies to grow your trade business, attract quality customers, and increase profitability sustainably.",
      url: "/blog/trade-business-growth-strategies",
      category: "Trade Marketing",
      readTime: "21 min read"
    },
    {
      title: "Local SEO for Trade Businesses: Complete Ranking Guide", 
      description: "Master local SEO for trades with proven strategies to dominate search results and attract local customers consistently.",
      url: "/blog/local-seo-trade-businesses",
      category: "Trade SEO",
      readTime: "14 min read"
    }
  ]
};

// SEO best practices checklist
export const seoChecklist = {
  title: {
    maxLength: 60,
    includeKeyword: true,
    includeBrand: true,
    format: "Primary Keyword | Basheer Padanna"
  },
  description: {
    maxLength: 160,
    includeKeyword: true,
    includeCallToAction: true,
    format: "Compelling description with primary keyword and clear value proposition."
  },
  content: {
    minWords: 2000,
    headingStructure: "H1 > H2 > H3",
    keywordDensity: "1-2%",
    includeImages: true,
    includeInternalLinks: 3,
    includeExternalLinks: 2
  }
};

export default {
  generateArticleSchema,
  generateBreadcrumbSchema, 
  generatePersonSchema,
  generateFAQSchema,
  getRelatedArticles,
  relatedArticles,
  seoChecklist
};