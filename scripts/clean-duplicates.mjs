import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function cleanBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the component function start
  const componentMatch = content.match(/const\s+\w+\s*=\s*\(\)\s*=>\s*\{/);
  if (!componentMatch) return false;

  const componentStart = content.indexOf(componentMatch[0]);
  
  // Split into before component and component body
  const beforeComponent = content.substring(0, componentStart + componentMatch[0].length);
  const componentBody = content.substring(componentStart + componentMatch[0].length);

  // Find and remove top-level articleData and faqs (before component)
  let cleanedBefore = beforeComponent.replace(/\n\s*const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/g, '');
  cleanedBefore = cleanedBefore.replace(/\n\s*const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/g, '');

  // Now clean up the component body - remove duplicate definitions inside JSX
  let cleanedBody = componentBody;

  // Find the return statement
  const returnMatch = cleanedBody.match(/\breturn\s*\(/);
  if (!returnMatch) return false;

  const returnStart = cleanedBody.indexOf(returnMatch[0]) + returnMatch[0].length - 1;
  
  // Split at return
  const beforeReturn = cleanedBody.substring(0, returnStart);
  const jsxPart = cleanedBody.substring(returnStart);

  // Extract any articleData/faqs that are before the return and keep them
  let beforeReturnCleaned = beforeReturn;
  const articleDataMatch = beforeReturn.match(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/);
  const faqsMatch = beforeReturn.match(/const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/);

  // Remove duplicate articleData/faqs inside JSX
  let jsxCleaned = jsxPart;
  jsxCleaned = jsxCleaned.replace(/\s*const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/g, '');
  jsxCleaned = jsxCleaned.replace(/\s*const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/g, '');

  // Remove orphaned properties in JSX (like relatedArticles={...})
  jsxCleaned = jsxCleaned.replace(/\s+relatedArticles={relatedArticles\.\w+}/g, '');

  const finalContent = cleanedBefore + beforeReturnCleaned + jsxCleaned;
  fs.writeFileSync(filePath, finalContent, 'utf8');
  return true;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (cleanBlogFile(pageFile)) {
          fixed++;
        }
      } catch (error) {
        console.error(`Error processing ${dir}:`, error.message);
      }
    }
  }

  console.log(`\nCleaned: ${fixed} files`);
}

processAllBlogPages();
