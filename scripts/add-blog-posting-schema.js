#!/usr/bin/env node

/**
 * Script to add BlogPosting schema to all blog posts that don't have it yet
 *
 * This script:
 * 1. Finds all blog post page.tsx files
 * 2. Checks if they already have BlogPosting schema
 * 3. Adds the schema if missing
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BLOG_DIR = path.join(__dirname, '..', 'app', 'blog');

// Function to check if file already has BlogPosting schema
function hasBlogPostingSchema(content) {
  return content.includes('generateBlogPostingSchema') ||
         content.includes('BlogPosting') ||
         content.includes('@type": "BlogPosting');
}

// Function to check if file already imports generateBlogPostingSchema
function hasImport(content) {
  return content.includes('generateBlogPostingSchema');
}

// Function to add import statement
function addImport(content) {
  // Find the last import statement
  const importRegex = /import\s+.*?from\s+['"].*?['"];?/g;
  const matches = content.match(importRegex);

  if (!matches) {
    console.error('No import statements found');
    return content;
  }

  const lastImport = matches[matches.length - 1];
  const lastImportIndex = content.lastIndexOf(lastImport);
  const importStatement = "\nimport { generateBlogPostingSchema } from '@/utils/seoUtils';";

  return content.slice(0, lastImportIndex + lastImport.length) +
         importStatement +
         content.slice(lastImportIndex + lastImport.length);
}

// Function to extract articleData from the file
function extractArticleData(content) {
  // Try to find articleData object
  const articleDataMatch = content.match(/const\s+articleData\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s);

  if (articleDataMatch) {
    return articleDataMatch[0];
  }

  // Alternative: inline object in OptimizedBlogLayout
  const inlineMatch = content.match(/<OptimizedBlogLayout\s+articleData=\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}/s);

  if (inlineMatch) {
    return `const articleData = {${inlineMatch[1]}}`;
  }

  return null;
}

// Function to estimate word count based on content length
function estimateWordCount(content) {
  // Count words in JSX content (rough estimate)
  const jsxContent = content.match(/<[^>]+>([^<]+)</g) || [];
  const totalChars = jsxContent.join('').length;

  // Average 5 chars per word
  const words = Math.round(totalChars / 5);

  // Round to nearest hundred
  return Math.max(1000, Math.round(words / 100) * 100);
}

// Function to convert readTime to ISO 8601 duration
function convertReadTime(readTime) {
  if (!readTime || typeof readTime !== 'string') return 'PT15M';

  const match = readTime.match(/(\d+)/);
  if (match) {
    return `PT${match[1]}M`;
  }
  return 'PT15M';
}

// Function to add BlogPosting schema to component
function addBlogPostingSchema(content, filePath) {
  try {
    // Extract info we need
    const fileName = path.basename(path.dirname(filePath));

    // Check if it's using inline articleData or const
    const hasInlineArticleData = content.includes('articleData={{');
    const hasConstArticleData = content.includes('const articleData');

    if (!hasInlineArticleData && !hasConstArticleData) {
      console.log(`⚠️  Skipping ${fileName} - no articleData found`);
      return null;
    }

    // If inline, convert to const first
    let updatedContent = content;

    if (hasInlineArticleData && !hasConstArticleData) {
      // Extract inline articleData
      const inlineMatch = content.match(/<OptimizedBlogLayout\s+articleData=\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}/s);
      if (inlineMatch) {
        const articleDataObj = inlineMatch[1];

        // Find the return statement
        const returnMatch = content.match(/return\s+(<OptimizedBlogLayout)/);
        if (returnMatch) {
          const returnIndex = content.indexOf(returnMatch[0]);

          // Insert articleData const before return
          const articleDataDeclaration = `\n  const articleData = {${articleDataObj}};\n\n  `;
          updatedContent = content.slice(0, returnIndex) + articleDataDeclaration + content.slice(returnIndex);

          // Update the OptimizedBlogLayout to use articleData variable
          updatedContent = updatedContent.replace(
            /<OptimizedBlogLayout\s+articleData=\{\{[^}]*(?:\{[^}]*\}[^}]*)*\}\}/s,
            '<OptimizedBlogLayout articleData={articleData}'
          );
        }
      }
    }

    // Extract metadata for schema
    const metadataMatch = updatedContent.match(/publishedTime:\s*["']([^"']+)["']/);
    const publishedDate = metadataMatch ? metadataMatch[1].split('T')[0] : '2025-01-01';

    // Estimate word count
    const wordCount = estimateWordCount(updatedContent);

    // Extract readTime if available
    const readTimeMatch = updatedContent.match(/readTime:\s*["']([^"']+)["']/);
    const readTime = readTimeMatch ? convertReadTime(readTimeMatch[1]) : 'PT15M';

    // Create the schema generation code
    const schemaCode = `
  const blogPostingSchema = generateBlogPostingSchema({
    headline: articleData.headline,
    description: articleData.description,
    author: articleData.author || "Basheer Padanna",
    publishedDate: articleData.publishedDate,
    modifiedDate: "${publishedDate}",
    url: articleData.url,
    imageUrl: articleData.imageUrl,
    keywords: articleData.tags || [],
    category: articleData.category,
    wordCount: ${wordCount},
    readTime: "${readTime}"
  });
`;

    // Find where to insert the schema code (after articleData definition)
    const articleDataEndMatch = updatedContent.match(/const\s+articleData\s*=\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\};/s);

    if (!articleDataEndMatch) {
      console.log(`⚠️  Skipping ${fileName} - couldn't find articleData end`);
      return null;
    }

    const insertIndex = updatedContent.indexOf(articleDataEndMatch[0]) + articleDataEndMatch[0].length;
    updatedContent = updatedContent.slice(0, insertIndex) + '\n' + schemaCode + updatedContent.slice(insertIndex);

    // Now wrap the return statement with fragment and add script tag
    const returnMatch = updatedContent.match(/return\s+(<OptimizedBlogLayout|<>)/);

    if (returnMatch) {
      const returnIndex = updatedContent.indexOf(returnMatch[0]);
      const returnStatement = returnMatch[0];

      // Check if already wrapped in fragment
      if (!returnStatement.includes('<>')) {
        // Add fragment wrapper and script tag
        const scriptTag = `<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
    />
    `;

        updatedContent = updatedContent.slice(0, returnIndex + 'return '.length) +
                        scriptTag +
                        updatedContent.slice(returnIndex + 'return '.length);

        // Find the closing of OptimizedBlogLayout and add fragment close
        // Look for the component closing pattern
        const closingPatterns = [
          '</OptimizedBlogLayout>;',
          '</OptimizedBlogLayout>\n  );',
          '</OptimizedBlogLayout>  );'
        ];

        for (const pattern of closingPatterns) {
          if (updatedContent.includes(pattern)) {
            updatedContent = updatedContent.replace(
              pattern,
              pattern.replace(';', '').replace('  );', '') + '\n    </>;'
            );
            break;
          }
        }

        // Handle edge case where there's already a closing parenthesis
        if (!updatedContent.includes('</>;')) {
          const lastClosingTag = updatedContent.lastIndexOf('</OptimizedBlogLayout>');
          if (lastClosingTag !== -1) {
            const afterClosing = updatedContent.slice(lastClosingTag + '</OptimizedBlogLayout>'.length);
            const firstNewline = afterClosing.indexOf('\n');
            if (firstNewline !== -1) {
              updatedContent = updatedContent.slice(0, lastClosingTag + '</OptimizedBlogLayout>'.length) +
                             '\n    </>' +
                             afterClosing.slice(firstNewline);
            }
          }
        }
      }
    }

    return updatedContent;

  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    return null;
  }
}

// Main function
function main() {
  console.log('🔍 Finding blog posts...\n');

  const blogPosts = glob.sync(path.join(BLOG_DIR, '*/page.tsx'));

  console.log(`Found ${blogPosts.length} blog posts\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  blogPosts.forEach(filePath => {
    const fileName = path.basename(path.dirname(filePath));
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has schema
    if (hasBlogPostingSchema(content)) {
      console.log(`✓ ${fileName} - Already has BlogPosting schema`);
      skipped++;
      return;
    }

    console.log(`📝 Processing ${fileName}...`);

    try {
      // Add import if needed
      let updatedContent = content;
      if (!hasImport(content)) {
        updatedContent = addImport(updatedContent);
      }

      // Add schema
      updatedContent = addBlogPostingSchema(updatedContent, filePath);

      if (updatedContent && updatedContent !== content) {
        // Write back to file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`✅ ${fileName} - Updated successfully\n`);
        updated++;
      } else {
        console.log(`⚠️  ${fileName} - Skipped (no changes made)\n`);
        skipped++;
      }

    } catch (error) {
      console.error(`❌ ${fileName} - Error: ${error.message}\n`);
      errors++;
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   ✅ Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('='.repeat(50));
}

main();
