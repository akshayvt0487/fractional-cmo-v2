// Dynamic blog meta extractor for social media and SEO tags
import { blogPosts } from '@/data/blogPosts';

export interface BlogMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  readTime: string;
  author: string;
  publishedDate: string;
}

export const extractBlogMetadata = (slug: string): BlogMetadata | null => {
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return null;
  }

  return {
    title: post.title,
    description: post.excerpt,
    image: post.image,
    url: `/blog/${post.slug}`,
    category: post.category,
    readTime: post.readTime,
    author: post.author,
    publishedDate: post.date
  };
};

export const generateDynamicMetaTags = (slug: string): string => {
  const metadata = extractBlogMetadata(slug);
  
  if (!metadata) {
    return '';
  }

  const siteUrl = 'https://fractional-cmo.com.au';
  const fullImageUrl = metadata.image.startsWith('http') 
    ? metadata.image 
    : `${siteUrl}${metadata.image}`;

  return `
    <!-- Dynamic Blog Post Meta Tags -->
    <meta property="og:title" content="${metadata.title} | Basheer Padanna" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta property="og:url" content="${siteUrl}${metadata.url}" />
    <meta property="og:type" content="article" />
    <meta property="article:author" content="${metadata.author}" />
    <meta property="article:section" content="${metadata.category}" />
    <meta property="article:published_time" content="${new Date(metadata.publishedDate).toISOString()}" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metadata.title} | Basheer Padanna" />
    <meta name="twitter:description" content="${metadata.description}" />
    <meta name="twitter:image" content="${fullImageUrl}" />
    
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.category}, ${metadata.author}, Digital Marketing" />
    
    <title>${metadata.title} | Basheer Padanna</title>
  `;
};

export const injectBlogMetaTags = (): void => {
  // Only run on client side
  if (typeof window === 'undefined') return;
  
  const currentPath = window.location.pathname;
  const blogPathMatch = currentPath.match(/^\/blog\/(.+)$/);
  
  if (!blogPathMatch) return;
  
  const slug = blogPathMatch[1];
  const metaTags = generateDynamicMetaTags(slug);
  
  if (!metaTags) return;
  
  // Remove existing dynamic meta tags
  const existingTags = document.querySelectorAll('meta[data-dynamic-blog="true"]');
  existingTags.forEach(tag => tag.remove());
  
  // Create temporary container to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = metaTags;
  
  // Extract and inject each meta tag
  const metaElements = tempDiv.querySelectorAll('meta, title');
  metaElements.forEach(element => {
    if (element.tagName === 'TITLE') {
      document.title = element.textContent || '';
    } else {
      const newMeta = document.createElement('meta');
      Array.from(element.attributes).forEach(attr => {
        newMeta.setAttribute(attr.name, attr.value);
      });
      newMeta.setAttribute('data-dynamic-blog', 'true');
      document.head.appendChild(newMeta);
    }
  });
};

export default {
  extractBlogMetadata,
  generateDynamicMetaTags,
  injectBlogMetaTags
};