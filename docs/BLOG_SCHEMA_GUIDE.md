# Blog Post Schema Implementation Guide

Quick reference for adding BlogPosting schema to new blog posts.

## Template

```typescript
import { createMetadata } from "@/lib/seo";
import OptimizedBlogLayout from '@/components/OptimizedBlogLayout';
import { blogPosts } from '@/data/blogPosts';
import { generateBlogPostingSchema } from '@/utils/seoUtils';

export const metadata = createMetadata({
  // ... metadata config
});

const YourBlogPost = () => {
  const post = blogPosts.find(p => p.slug === "your-slug");
  if (!post) throw new Error("Blog post not found: your-slug");

  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const articleData = {
    headline: "Your Article Headline",
    description: "Your article description",
    author: "Basheer Padanna",
    publishedDate: convertDateFormat(post.date),
    modifiedDate: "YYYY-MM-DD",
    url: "/blog/your-slug",
    imageUrl: '/images/blog/your-image.jpg',
    category: "Your Category",
    readTime: "20 min read",
    tags: ["Tag1", "Tag2", "Tag3"]
  };

  const blogPostingSchema = generateBlogPostingSchema({
    headline: articleData.headline,
    description: articleData.description,
    author: articleData.author,
    publishedDate: articleData.publishedDate,
    modifiedDate: "YYYY-MM-DD",
    url: articleData.url,
    imageUrl: articleData.imageUrl,
    keywords: articleData.tags,
    category: articleData.category,
    wordCount: 5000,  // Estimate based on content
    readTime: "PT20M"  // ISO 8601 format: PT{minutes}M
  });

  const faqs = [
    {
      question: "Your FAQ question?",
      answer: "Your FAQ answer."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <OptimizedBlogLayout
        articleData={articleData}
        faqs={faqs}
        heroImage={'/images/blog/your-image.jpg'}
        heroAlt="Your image alt text"
      >
        {/* Your content here */}
      </OptimizedBlogLayout>
    </>
  );
};

export default YourBlogPost;
```

## Key Points

### 1. Reading Time Format (ISO 8601 Duration)

```typescript
// Convert "20 min read" to "PT20M"
readTime: "PT20M"  // 20 minutes
readTime: "PT15M"  // 15 minutes
readTime: "PT30M"  // 30 minutes
```

### 2. Date Format

```typescript
// Use YYYY-MM-DD format
publishedDate: "2024-01-15"
modifiedDate: "2024-02-01"

// Or convert from post date
publishedDate: convertDateFormat(post.date)
```

### 3. Word Count

Estimate based on article length:
- Short article (< 3 pages): 2000-3000
- Medium article (3-5 pages): 4000-5000
- Long article (> 5 pages): 6000-8000

### 4. Keywords

Use the tags from articleData:
```typescript
keywords: articleData.tags
// Or provide array directly:
keywords: ["Keyword1", "Keyword2", "Keyword3"]
```

### 5. Fragment Wrapper

Always wrap the return statement:
```typescript
return (
  <>
    <script type="application/ld+json" ... />
    <OptimizedBlogLayout>...</OptimizedBlogLayout>
  </>
);
```

## Common Mistakes to Avoid

❌ **Don't forget the fragment wrapper**
```typescript
// Wrong - missing <>
return (
  <OptimizedBlogLayout>...</OptimizedBlogLayout>
);
```

❌ **Don't use regular time format**
```typescript
// Wrong
readTime: "20 min read"

// Correct
readTime: "PT20M"
```

❌ **Don't forget to close the fragment**
```typescript
// Wrong - missing </>
return (
  <>
    <script ... />
    <OptimizedBlogLayout>...</OptimizedBlogLayout>
  );
```

❌ **Don't skip required fields**
```typescript
// All these are required:
headline, description, author, publishedDate,
url, category
```

## Validation

After adding schema, validate:

1. **Run the validator**
   ```bash
   python scripts/validate_blog_schemas.py
   ```

2. **Check the specific file**
   ```bash
   grep "generateBlogPostingSchema" app/blog/your-slug/page.tsx
   ```

3. **Test online**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)

## Alternative: SchemaScript Component

You can also use the SchemaScript component:

```typescript
import { generateBlogPostingSchema, SchemaScript } from "@/lib/schemas";

const blogSchema = generateBlogPostingSchema({...});

return (
  <>
    <SchemaScript schema={blogSchema} />
    <OptimizedBlogLayout>...</OptimizedBlogLayout>
  </>
);
```

Both approaches are valid and produce the same result.

## FAQ Schema

OptimizedBlogLayout automatically generates FAQ schema if you provide the `faqs` prop:

```typescript
const faqs = [
  {
    question: "Question 1?",
    answer: "Answer 1"
  },
  {
    question: "Question 2?",
    answer: "Answer 2"
  }
];

<OptimizedBlogLayout faqs={faqs}>
```

No additional FAQ schema code needed!

## Questions?

- Check existing blog posts for examples
- See [SCHEMA_VALIDATION_REPORT.md](../SCHEMA_VALIDATION_REPORT.md) for details
- Review [seoUtils.ts](../src/utils/seoUtils.ts) for schema generation code
