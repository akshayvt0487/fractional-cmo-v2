# Update All Blog Metadata

This script will update metadata in all blog posts to:
1. Use proper image paths
2. Remove duplicate OpenGraph properties
3. Add Twitter card metadata
4. Fix site URLs

## Steps to Run:

1. Install dependencies:
```bash
npm install @babel/parser @babel/traverse @babel/generator @babel/types --save-dev
```

2. Run the script:
```bash
npx ts-node scripts/update-blog-metadata.ts
```

## What it Does:

- Updates image paths to use proper /images/blog/* paths
- Removes duplicate metadata in OpenGraph section
- Ensures proper social sharing metadata
- Fixes hardcoded domain URLs
- Adds proper Twitter card support

## After Running:

Check a few blog posts to ensure metadata looks like:

```tsx
export const metadata = createMetadata({
  title: "Your Title",
  description: "Your description",
  path: "/blog/your-slug",
  image: "/images/blog/your-hero-image.jpg",
  keywords: ["your", "keywords"],
  openGraph: {
    type: "article",
    publishedTime: "YYYY-MM-DDTHH:mm:ss.sssZ",
    modifiedTime: "YYYY-MM-DDTHH:mm:ss.sssZ",
    authors: ["Basheer Padanna"]
  }
});
```