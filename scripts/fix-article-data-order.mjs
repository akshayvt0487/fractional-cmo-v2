import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixArticleDataOrder(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find component
  const componentMatch = content.match(/^(const|function)\s+(\w+)\s*(\(\)|=\s*\(\)\s*=>)\s*\{/m);
  if (!componentMatch) return false;

  const componentStart = componentMatch[0];
  const componentStartIdx = content.indexOf(componentStart);
  const componentBody = content.substring(componentStartIdx + componentStart.length);

  // Find articleData inside component
  const articleDataMatch = componentBody.match(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/);
  if (!articleDataMatch) return false;

  // Find post definition
  const postMatch = componentBody.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  if (!postMatch) return false;

  // Check if articleData comes before post
  const articleDataIdx = componentBody.indexOf(articleDataMatch[0]);
  const postIdx = componentBody.indexOf(postMatch[0]);

  if (articleDataIdx < postIdx) {
    // Need to reorder
    const beforeArticleData = componentBody.substring(0, articleDataIdx);
    const afterArticleData = componentBody.substring(articleDataIdx + articleDataMatch[0].length);

    // Find the end of post definition in afterArticleData
    const postIdxInAfter = afterArticleData.indexOf(postMatch[0]);
    const afterPost = afterArticleData.substring(postIdxInAfter + postMatch[0].length);

    // Rebuild in correct order: post first, then articleData
    const reordered = beforeArticleData + postMatch[0] + '\n  ' + articleDataMatch[0].trim().split('\n').join('\n  ') + afterPost;

    content = content.substring(0, componentStartIdx + componentStart.length) + reordered;

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
        if (fixArticleDataOrder(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Fixed articleData order: ${fixed}`);
}

processAllBlogPages();
