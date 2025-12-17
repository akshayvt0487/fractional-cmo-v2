import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find component function start and get component name
  const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/);
  if (!componentMatch) return false;

  const componentStart = content.indexOf(componentMatch[0]);
  const beforeComponent = content.substring(0, componentStart + componentMatch[0].length);
  
  // Get component body
  let componentBody = content.substring(componentStart + componentMatch[0].length);
  
  // Find return statement
  const returnIdx = componentBody.indexOf('return (');
  if (returnIdx === -1) return false;

  const beforeReturn = componentBody.substring(0, returnIdx).trim();
  const returnAndJsx = componentBody.substring(returnIdx);

  // Extract post definition (must come first)
  const postMatch = beforeReturn.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\);[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  
  // Extract articleData
  const articleDataMatch = beforeReturn.match(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/);
  
  // Extract faqs
  const faqsMatch = beforeReturn.match(/const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/);
  
  // Extract convertDateFormat if at top level
  const convertDateMatch = beforeReturn.match(/const\s+convertDateFormat\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\n\s*\};/);

  if (!postMatch || !articleDataMatch) {
    return false;
  }

  // Build new component body with correct order:
  // 1. post definition
  // 2. articleData definition
  // 3. faqs definition
  // 4. return and JSX
  let newBody = '\n  ' + postMatch[0].trim();
  
  // Clean articleData to fix post reference issue by rebuilding with correct indentation
  let cleanArticleData = articleDataMatch[0];
  cleanArticleData = cleanArticleData.replace(/^const\s+articleData\s*=\s*\{/, 'const articleData = {');
  
  newBody += '\n  ' + cleanArticleData.trim();
  
  if (faqsMatch) {
    newBody += '\n  ' + faqsMatch[0].trim();
  }
  
  newBody += '\n  ' + returnAndJsx;

  // Clean up duplicates in JSX
  let cleaned = beforeComponent + componentMatch[0] + newBody;
  cleaned = cleaned.replace(/\s*const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};(?=[\s\S]*?return\s*\()/g, '');
  cleaned = cleaned.replace(/\s*const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];(?=[\s\S]*?return\s*\()/g, '');
  
  fs.writeFileSync(filePath, cleaned, 'utf8');
  return true;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (fixBlogFile(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // Silent fail
      }
    }
  }

  console.log(`Fixed: ${fixed} files`);
}

processAllBlogPages();
