type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  keywords?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleTags?: string[];
  structuredData?: any;
};

export default function SEO(_props: SEOProps) {
  // Legacy placeholder for pages that still render <SEO /> in JSX.
  // Metadata is handled via the Next.js metadata API, so this component
  // intentionally renders nothing. Keeping it prevents build errors
  // where pages still reference <SEO /> without importing a real component.
  return null;
}
