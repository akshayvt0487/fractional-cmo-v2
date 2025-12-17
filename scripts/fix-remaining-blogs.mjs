import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need special handling
const filesToFix = [
  'app/blog/insolvency-digital-marketing/page.tsx',
  'app/blog/liquidators-google-ads/page.tsx',
  'app/blog/liquidators-growth-marketing/page.tsx',
  'app/blog/voluntary-administration-lead-generation/page.tsx',
  'app/blog/ndis-software-saas-lead-generation/page.tsx',
  'app/blog/ndis-software-saas-marketing/page.tsx',
  'app/blog/ndis-software-saas-positioning-strategy/page.tsx'
];

const blogDir = path.join(__dirname, '..');

console.log('Fixing remaining blog files...\n');

for (const filePath of filesToFix) {
  const fullPath = path.join(blogDir, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⊘ Not found: ${path.basename(path.dirname(fullPath))}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const fileName = path.basename(path.dirname(fullPath));
  
  // Check if already has blogPosts import
  if (content.includes("import { blogPosts }") || content.includes("import blogPosts")) {
    console.log(`⊘ Skipped: ${fileName} (already has blogPosts)`);
    continue;
  }
  
  // Extract the slug from the path
  const slug = path.basename(path.dirname(fullPath));
  
  // Add blogPosts import after the existing imports
  if (!content.includes("import { blogPosts }")) {
    // Find the last import line
    const lastImportMatch = content.match(/^(import .+;)(?=\n(?:export|const|\/\/))/m);
    if (lastImportMatch) {
      const lastImportIndex = content.lastIndexOf(lastImportMatch[1]);
      const insertPos = lastImportIndex + lastImportMatch[1].length;
      content = content.slice(0, insertPos) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(insertPos);
    } else {
      // If no import found, add it after first import
      const firstImportIndex = content.indexOf('import ');
      const firstImportEnd = content.indexOf('\n', firstImportIndex);
      content = content.slice(0, firstImportEnd) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(firstImportEnd);
    }
  }
  
  // Now find and replace the articleData/publishedDate references
  // For inline articleData pattern in return statement
  if (content.includes('publishedDate:') && content.includes('return <OptimizedBlogLayout articleData={{')) {
    // Add post lookup before the return statement
    const returnIndex = content.indexOf('return <OptimizedBlogLayout');
    if (returnIndex > -1) {
      const postLookupCode = `const post = blogPosts.find(p => p.slug === "${slug}");
  if (!post) throw new Error("Blog post not found: ${slug}");
  
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  `;
      
      // Insert before return
      content = content.slice(0, returnIndex) + postLookupCode + content.slice(returnIndex);
    }
  }
  
  // For const articleData pattern
  else if (content.includes('const articleData = {')) {
    // Add post lookup and convertDateFormat before articleData
    const articleDataIndex = content.indexOf('const articleData = {');
    if (articleDataIndex > -1) {
      const postLookupCode = `const post = blogPosts.find(p => p.slug === "${slug}");
  if (!post) throw new Error("Blog post not found: ${slug}");
  
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  `;
      
      content = content.slice(0, articleDataIndex) + postLookupCode + content.slice(articleDataIndex);
    }
  }
  
  // Replace any publishedDate hardcoded values with convertDateFormat(post.date)
  content = content.replace(
    /publishedDate:\s*"[^"]*"/g,
    'publishedDate: convertDateFormat(post.date)'
  );
  
  // Replace articlePublishedTime and similar in SEO component
  content = content.replace(
    /articlePublishedTime="[^"]*"/g,
    'articlePublishedTime={convertDateFormat(post.date) + "T00:00:00Z"}'
  );
  
  // Replace in generateArticleSchema if present
  content = content.replace(
    /publishedDate:\s*"[^"]*"(?=\s*,.*schema)/,
    'publishedDate: convertDateFormat(post.date)'
  );
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Fixed: ${fileName}`);
}

console.log('\nAll remaining blog files fixed!');
