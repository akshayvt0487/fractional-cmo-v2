import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixComponentFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix 1: If articleData uses post.date but post is never defined, use a hardcoded date
  if (content.includes('convertDateFormat(post.date)') && !content.includes('const post = blogPosts')) {
    // Replace with a reasonable fallback
    content = content.replace(/publishedDate:\s*convertDateFormat\(post\.date\)/g, 'publishedDate: "2026-01-01"');
    modified = true;
  }

  // Fix 2: If articleData and faqs are at top level (outside component), move them inside
  const componentMatch = content.match(/^(const|function)\s+(\w+)\s*(\(\)|=\s*\(\)\s*=>)\s*\{/m);
  if (componentMatch) {
    const componentStart = content.indexOf(componentMatch[0]);
    const beforeComponent = content.substring(0, componentStart);
    
    // Look for top-level articleData/faqs that should be in component
    const articleDataMatch = beforeComponent.match(/^const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m);
    const faqsMatch = beforeComponent.match(/^const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/m);

    if (articleDataMatch || faqsMatch) {
      // Remove them from top level
      if (articleDataMatch) {
        content = content.replace(articleDataMatch[0], '');
      }
      if (faqsMatch) {
        content = content.replace(faqsMatch[0], '');
      }

      // Find component again (indexes shifted)
      const newComponentMatch = content.match(/^(const|function)\s+(\w+)\s*(\(\)|=\s*\(\)\s*=>)\s*\{/m);
      if (newComponentMatch) {
        const newComponentStart = content.indexOf(newComponentMatch[0]) + newComponentMatch[0].length;
        const insertPoint = content.indexOf('\n', newComponentStart) + 1;

        // Build insertion text
        let toInsert = '';
        if (articleDataMatch) {
          toInsert += '  ' + articleDataMatch[0].trim().split('\n').join('\n  ') + '\n\n';
        }
        if (faqsMatch) {
          toInsert += '  ' + faqsMatch[0].trim().split('\n').join('\n  ') + '\n';
        }

        if (toInsert) {
          content = content.substring(0, insertPoint) + toInsert + content.substring(insertPoint);
          modified = true;
        }
      }
    }
  }

  // Fix 3: Remove any articleData/faqs that appear inside JSX (after return statement)
  const returnMatch = content.match(/return\s*\(\s*<|return\s*\(<|\n\s*return\s+\(/);
  if (returnMatch) {
    const returnIndex = content.indexOf(returnMatch[0]);
    const afterReturn = content.substring(returnIndex);
    
    // Check for errant const declarations in JSX
    if (afterReturn.match(/const\s+\w+\s*=\s*[\{\[]/)) {
      const cleaned = afterReturn.replace(/\n\s*const\s+\w+\s*=\s*[\{\[[\s\S]*?\n\s*\};?\n\s*const\s+relatedArticles/g, '\n  const relatedArticles');
      content = content.substring(0, returnIndex) + cleaned;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (fixComponentFile(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Fixed component files: ${fixed}`);
}

processAllBlogPages();
