import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find component function
  const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/);
  if (!componentMatch) return false;

  const componentName = componentMatch[1];
  const componentStart = content.indexOf(componentMatch[0]);
  
  // Get everything before component
  const beforeComponent = content.substring(0, componentStart);
  
  // Get everything from component start
  const afterComponentStart = content.substring(componentStart + componentMatch[0].length);

  // Find the return statement
  const returnIndex = afterComponentStart.indexOf('return (');
  if (returnIndex === -1) return false;

  // Everything before return
  const beforeReturn = afterComponentStart.substring(0, returnIndex);
  
  // Extract post definition
  const postMatch = beforeReturn.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[^\n]*\n[^\n]*throw[^\n]*\n/m);
  if (!postMatch) return false;

  // Extract or rebuild articleData - it should use post.date
  let articleDataDef = beforeReturn.match(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m);
  if (!articleDataDef) {
    // This shouldn't happen in well-formed files
    return false;
  }

  // Extract faqs if present
  let faqsDef = beforeReturn.match(/const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/m);

  // Clean the rest of beforeReturn - remove old definitions
  let cleanedBeforeReturn = beforeReturn;
  cleanedBeforeReturn = cleanedBeforeReturn.replace(/const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[^\n]*\n[^\n]*throw[^\n]*\n/m, '');
  cleanedBeforeReturn = cleanedBeforeReturn.replace(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m, '');
  cleanedBeforeReturn = cleanedBeforeReturn.replace(/const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/m, '');
  cleanedBeforeReturn = cleanedBeforeReturn.replace(/\n\s*\n\s*\n/g, '\n\n'); // Clean up extra blank lines

  // Reconstruct
  let newComponentBody = cleanedBeforeReturn;
  if (postMatch) newComponentBody += '\n  ' + postMatch[0].trim();
  if (articleDataDef) newComponentBody += '\n  ' + articleDataDef[0].trim();
  if (faqsDef) newComponentBody += '\n  ' + faqsDef[0].trim();
  newComponentBody += '\n  \n  return (';

  // Get the return/JSX part and clean it
  const jsxStart = afterComponentStart.substring(returnIndex + 8); // Skip 'return ('
  let cleanedJsx = jsxStart;
  
  // Remove any duplicate articleData or faqs in JSX
  cleanedJsx = cleanedJsx.replace(/\s*const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/g, '');
  cleanedJsx = cleanedJsx.replace(/\s*const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/g, '');
  
  // Remove orphaned relatedArticles prop
  cleanedJsx = cleanedJsx.replace(/\s+relatedArticles={relatedArticles\.\w+}/g, '');
  
  // Ensure JSX is properly formatted
  if (!cleanedJsx.startsWith('\n')) {
    cleanedJsx = '\n' + cleanedJsx;
  }

  const finalContent = beforeComponent + componentMatch[0] + newComponentBody + cleanedJsx;
  
  fs.writeFileSync(filePath, finalContent, 'utf8');
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
        errors.push(`${dir}: ${error.message}`);
      }
    }
  }

  console.log(`Fixed: ${fixed} files`);
  if (errors.length > 0) {
    console.log(`\nErrors:`, errors);
  }
}

processAllBlogPages();
