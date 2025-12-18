/**
 * Universal Metadata Generator for All Pages
 * Applies canonical URLs and robots tags automatically to every page
 */

import type { Metadata } from "next";
import { createMetadata } from "./seo";

/**
 * Config for pages that should NOT be indexed
 * These pages will have robots: { index: false, follow: false }
 */
export const PAGES_TO_NOINDEX = [
  "/admin",
  "/admin-auth",
  "/api",
  "/test",
  "/not-ready",
  "/thank-you",
  "/analytics",
  "/_next",
];

/**
 * Check if a page should be excluded from indexing
 */
export function shouldNoindexPage(pathname: string): boolean {
  return PAGES_TO_NOINDEX.some((excluded) => pathname.startsWith(excluded));
}

/**
 * Universal function to generate metadata for ANY page
 * Handles canonical URLs, robots tags, and all SEO requirements
 * 
 * @param pageData - Page-specific data (title, description, path, etc)
 * @returns Complete metadata object ready for export
 * 
 * @example
 * // For a blog post
 * export const metadata = generatePageMetadata({
 *   title: "Blog Post Title",
 *   description: "Blog description",
 *   path: "/blog/my-post",
 *   image: "/images/blog/my-post.jpg",
 *   type: "article",
 * });
 * 
 * @example
 * // For a service page
 * export const metadata = generatePageMetadata({
 *   title: "SEO Services",
 *   description: "Professional SEO services",
 *   path: "/services/seo",
 *   type: "service",
 * });
 * 
 * @example
 * // For pages to exclude from indexing
 * export const metadata = generatePageMetadata({
 *   title: "Thank You",
 *   path: "/thank-you",
 *   noindex: true,
 * });
 */
export interface GeneratePageMetadataInput {
  title?: string;
  description?: string;
  path: string; // REQUIRED - used for canonical URL
  image?: string;
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: string;
  };
  noindex?: boolean; // Override to force noindex regardless of path
  type?: "website" | "article" | "service" | "profile";
  openGraph?: any;
  twitter?: any;
}

export function generatePageMetadata(
  input: GeneratePageMetadataInput
): Metadata {
  // Determine if page should be noindexed
  const shouldNoindex =
    input.noindex === true || shouldNoindexPage(input.path);

  // Build robots config
  const robotsConfig = {
    index: !shouldNoindex && (input.robots?.index ?? true),
    follow: !shouldNoindex && (input.robots?.follow ?? true),
    nocache: input.robots?.nocache ?? false,
    googleBot: input.robots?.googleBot,
  };

  // Use createMetadata with the enhanced config
  return createMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    image: input.image,
    keywords: input.keywords,
    // Canonical URL is auto-generated from path
    canonical: undefined, // Let createMetadata handle it from path
    robots: robotsConfig,
    openGraph: input.openGraph && {
      ...input.openGraph,
      type: input.type || "website",
    },
    twitter: input.twitter,
  });
}

/**
 * Helper to generate metadata for dynamic blog posts
 * Handles /blog/[slug] routes
 */
export function generateBlogMetadata(input: {
  slug: string;
  title: string;
  description: string;
  publishedDate?: string;
  updatedDate?: string;
  image?: string;
  author?: string;
  keywords?: string[];
}): Metadata {
  return generatePageMetadata({
    title: input.title,
    description: input.description,
    path: `/blog/${input.slug}`,
    image: input.image,
    keywords: input.keywords,
    type: "article",
    openGraph: {
      publishedTime: input.publishedDate,
      modifiedTime: input.updatedDate,
      authors: input.author ? [input.author] : undefined,
    },
  });
}

/**
 * Helper to generate metadata for dynamic service pages
 * Handles /services/[service] and /services/[service]/[industry] routes
 */
export function generateServiceMetadata(input: {
  serviceName: string;
  description: string;
  path: string; // e.g., "/services/seo" or "/services/seo/builders"
  image?: string;
  keywords?: string[];
}): Metadata {
  return generatePageMetadata({
    title: input.serviceName,
    description: input.description,
    path: input.path,
    image: input.image,
    keywords: input.keywords,
    type: "service",
  });
}

/**
 * Helper to exclude pages from indexing
 * Useful for intermediate/temporary pages
 */
export function generateNoindexMetadata(input: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  return generatePageMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    noindex: true,
  });
}
