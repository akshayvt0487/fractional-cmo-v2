import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // ISSUE 1: blogPosts import is inside convertDateFormat - move to top imports
  const blogPostsImportRegex = /import\s+\{\s*blogPosts\s*\}\s+from\s+['"][^'"]+['"]\s*;/;
  const blogPostsMatch = content.match(blogPostsImportRegex);
  
  if (blogPostsMatch) {
    // Remove from current position
    content = content.replace(blogPostsMatch[0], '');
    
    // Find the last import statement
    const lastImportMatch = content.match(/^import\s+\{\s*relatedArticles\s*\}\s+from\s+['"][^'"]+['"];/m);
    if (lastImportMatch) {
      const insertPos = content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
      content = content.substring(0, insertPos) + '\nimport { blogPosts } from \'@/data/blogPosts\';' + content.substring(insertPos);
    }
  }

  // ISSUE 2: articleData and faqs are defined at top-level but need to be inside component
  // Find the component function
  const componentMatch = content.match(/^const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/m);
  if (!componentMatch) return false;

  const componentName = componentMatch[1];
  const componentStart = content.indexOf(componentMatch[0]);
  
  // Find the post definition inside the component
  const componentPart = content.substring(componentStart);
  const postDefMatch = componentPart.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\);/);
  if (!postDefMatch) return false;

  const postDefEnd = componentPart.indexOf(postDefMatch[0]) + postDefMatch[0].length;

  // Find the error check that follows
  const errorCheckMatch = componentPart.match(/if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  if (!errorCheckMatch) return false;

  const errorCheckEnd = componentPart.indexOf(errorCheckMatch[0]) + errorCheckMatch[0].length;

  // Now find articleData and faqs at top level (before component)
  const topLevelArticleDataMatch = content.match(/^const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m);
  const topLevelFaqsMatch = content.match(/^const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/m);

  if (topLevelArticleDataMatch && topLevelFaqsMatch) {
    // Remove from top level
    content = content.replace(topLevelArticleDataMatch[0], '');
    content = content.replace(topLevelFaqsMatch[0], '');

    // Re-find component since we modified content
    const newComponentMatch = content.match(/^const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/m);
    if (!newComponentMatch) return false;

    const newComponentStart = content.indexOf(newComponentMatch[0]);
    const newComponentPart = content.substring(newComponentStart);
    
    // Find post definition again in the modified content
    const newPostDefMatch = newComponentPart.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\);[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
    if (!newPostDefMatch) return false;

    const insertPoint = newComponentStart + newComponentPart.indexOf(newPostDefMatch[0]) + newPostDefMatch[0].length;

    // Insert articleData and faqs after the error check
    const toInsert = '\n  ' + topLevelArticleDataMatch[0].trim().split('\n').join('\n  ') + 
                     '\n\n  ' + topLevelFaqsMatch[0].trim().split('\n').join('\n  ');

    content = content.substring(0, insertPoint) + toInsert + content.substring(insertPoint);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;
  let errors = [];

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (fixBlogFile(pageFile)) {
          fixed++;
        }
      } catch (error) {
        errors.push(dir);
      }
    }
  }

  console.log(`Fixed: ${fixed} files`);
  if (errors.length > 0) {
    console.log(`Errors in: ${errors.join(', ')}`);
  }
}

processAllBlogPages();
