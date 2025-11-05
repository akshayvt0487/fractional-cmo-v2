// scripts/update-blog-seo.js
import fs from 'fs';
import fg from 'fast-glob';

// Load .env
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fractional-cmo.com.au';
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn('Warning: NEXT_PUBLIC_SITE_URL not set. Using fallback:', SITE_URL);
}

// CORRECT PATH: app/blog/[slug]/page.tsx
const BLOG_GLOB = 'app/blog/**/page.tsx';
const files = fg.sync(BLOG_GLOB, { onlyFiles: true });

console.log(`Found ${files.length} blog pages. Processing...`);

const getSlug = (file) => {
  return file
    .replace(/^.*[\\\/]blog[\\\/]/, '')
    .replace(/[\\\/]page\.tsx$/, '');
};

const stripTags = (str) => str.replace(/<[^>]*>/g, '').trim();

files.forEach((file) => {
  const raw = fs.readFileSync(file, 'utf-8');

  const title = (raw.match(/title:\s*["'`](.*?)["'`]/i)?.[1]) ||
                (raw.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]) ||
                'Untitled Post';

  const description = (raw.match(/description:\s*["'`](.*?)["'`]/i)?.[1]) ||
                      stripTags(raw.slice(0, 300)) + '...';

  const image = raw.match(/image:\s*["'`](.*?)["'`]/i)?.[1];
  const ogImage = image 
    ? `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}` 
    : `${SITE_URL}/og-default.jpg`;

  const author = raw.match(/author:\s*["'`](.*?)["'`]/i)?.[1] || 'Basheer Padanna';
  const date = raw.match(/date:\s*["'`](.*?)["'`]/i)?.[1] || new Date().toISOString().split('T')[0];

  const slug = getSlug(file);
  const url = `${SITE_URL}/blog/${slug}`;

  const seoHead = `export const metadata = {
  title: \`${title}\`,
  description: \`${description}\`,
  keywords: \`${title.toLowerCase().split(' ').slice(0, 5).join(', ')}\`,
  openGraph: {
    title: \`${title}\`,
    description: \`${description}\`,
    url: \`${url}\`,
    siteName: 'Fractional CMO',
    images: [{ url: \`${ogImage}\`, width: 1200, height: 630, alt: \`${title}\` }],
    locale: 'en_US',
    type: 'article',
    publishedTime: '${date}',
    authors: ['${author}'],
  },
  twitter: {
    card: 'summary_large_image',
    title: \`${title}\`,
    description: \`${description}\`,
    images: [\`${ogImage}\`],
    creator: '@yourhandle',
  },
  alternates: { canonical: \`${url}\` },
  robots: { index: true, follow: true },
};

export default function Page() {
`;

  let updated = raw;
  const pageMatch = raw.match(/(export default function Page\(\) \{)/);

  if (pageMatch) {
    const before = raw.substring(0, pageMatch.index);
    const after = raw.substring(pageMatch.index);
    updated = before.replace(/export const metadata[\s\S]*?;\s*/g, '') + seoHead + after;
  } else {
    updated = seoHead + raw;
  }

  fs.writeFileSync(file, updated, 'utf-8');
  console.log(`Updated: ${slug}`);
});

console.log('All blogs updated with ENV-based URLs!');