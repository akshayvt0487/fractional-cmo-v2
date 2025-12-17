# Missing Blogs Migration Package

This folder contains 9 blog posts ready for Next.js migration:

## Blogs Included

### Buyers Agents (3)
1. `buyers-agents-digital-marketing` - Digital Marketing Strategy Guide
2. `buyers-agents-lead-generation` - Lead Generation Strategy Guide  
3. `buyers-agents-seo` - SEO Strategy Guide

### Finance Brokers (3)
4. `finance-broker-digital-marketing` - Digital Marketing Strategy Guide
5. `finance-broker-google-ads` - Google Ads PPC Guide
6. `finance-broker-lead-generation` - Lead Generation Strategy Guide

### Immigration Lawyers (3)
7. `immigration-lawyers-digital-marketing` - Digital Marketing Strategy Guide
8. `immigration-lawyers-google-ads` - Google Ads PPC Guide
9. `immigration-lawyers-lead-generation` - Lead Generation Strategy Guide

## File Structure

```
references/blogs/
├── README.md                         # This file
├── missing-blogs-data.ts             # TypeScript data with types & helpers
├── missing-blogs-data.json           # JSON format for flexibility
└── content/                          # MDX files for each blog
    ├── buyers-agents-digital-marketing.mdx
    ├── buyers-agents-lead-generation.mdx
    ├── buyers-agents-seo.mdx
    ├── finance-broker-digital-marketing.mdx
    ├── finance-broker-google-ads.mdx
    ├── finance-broker-lead-generation.mdx
    ├── immigration-lawyers-digital-marketing.mdx
    ├── immigration-lawyers-google-ads.mdx
    └── immigration-lawyers-lead-generation.mdx
```

## Data Structure

Each blog includes:
- `slug` - URL identifier
- `title` - Full headline
- `description` - SEO meta description
- `excerpt` - Short summary
- `author` - "Basheer Padanna"
- `publishedDate` - ISO date
- `modifiedDate` - ISO date
- `category` - Topic category
- `readTime` - Reading time
- `tags` - Array of keywords
- `heroImage` - Image path
- `url` - Blog URL path
- `faqs` - Array of FAQ objects

## Helper Functions (TypeScript)

```typescript
import { 
  missingBlogs,
  getAllBlogSlugs,
  getBlogBySlug,
  generateBlogOGData,
  generateBlogSchema,
  generateFAQSchema
} from './missing-blogs-data';

// Get all slugs for generateStaticParams
const slugs = getAllBlogSlugs();

// Get blog by slug
const blog = getBlogBySlug('buyers-agents-seo');

// Generate OpenGraph data
const og = generateBlogOGData(blog);

// Generate JSON-LD schema
const schema = generateBlogSchema(blog);
const faqSchema = generateFAQSchema(blog);
```

## Next.js Integration

### 1. Copy files to your Next.js project
```bash
cp -r references/blogs/* your-nextjs-app/src/data/blogs/
```

### 2. Use in page.tsx
```typescript
import { getBlogBySlug, generateBlogOGData } from '@/data/blogs/missing-blogs-data';

export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  return generateBlogOGData(blog);
}
```

### 3. Copy hero images
Copy images from `public/images/blog/` to your Next.js `public/images/blog/` folder.

## Image References

Hero images should be placed at:
- `/images/blog/buyers-agents-digital-marketing.jpg`
- `/images/blog/buyers-agents-lead-generation.jpg`
- `/images/blog/buyers-agents-seo.jpg`
- `/images/blog/finance-broker-digital-marketing.jpg`
- `/images/blog/finance-broker-google-ads.jpg`
- `/images/blog/finance-broker-lead-generation.jpg`
- `/images/blog/immigration-lawyers-digital-marketing.jpg`
- `/images/blog/immigration-lawyers-google-ads.jpg`
- `/images/blog/immigration-lawyers-lead-generation.jpg`
