import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function moveArticleDataToComponent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if articleData is at top level (outside component function)
  const componentMatch = content.match(/^const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/m);
  if (!componentMatch) return false;

  const componentName = componentMatch[1];
  const componentStartIndex = content.indexOf(componentMatch[0]);

  // Check if there's a top-level articleData before component
  const beforeComponent = content.substring(0, componentStartIndex);
  const topLevelArticleDataMatch = beforeComponent.match(/^const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m);
  
  if (!topLevelArticleDataMatch) {
    return false; // Already fixed or doesn't have the issue
  }

  // This file needs to be fixed - move articleData into component
  const afterComponentStart = content.substring(componentStartIndex + componentMatch[0].length);
  const postMatch = afterComponentStart.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  
  if (!postMatch) return false;

  const postDefEnd = postMatch[0];
  const postDefEndIndex = afterComponentStart.indexOf(postDefEnd) + postDefEnd.length;

  // Remove articleData from top level
  content = content.replace(topLevelArticleDataMatch[0], '');

  // Find component again (since we removed code before it)
  const newComponentMatch = content.match(/^const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/m);
  if (!newComponentMatch) return false;

  const newComponentStartIndex = content.indexOf(newComponentMatch[0]);
  const newAfterComponentStart = content.substring(newComponentStartIndex + newComponentMatch[0].length);
  const newPostMatch = newAfterComponentStart.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  
  if (!newPostMatch) return false;

  const insertPoint = newComponentStartIndex + newComponentMatch[0].length + newAfterComponentStart.indexOf(newPostMatch[0]) + newPostMatch[0].length;

  // Insert articleData after post definition
  const articleDataIndented = '\n  ' + topLevelArticleDataMatch[0].trim().split('\n').join('\n  ');
  content = content.substring(0, insertPoint) + articleDataIndented + content.substring(insertPoint);

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (moveArticleDataToComponent(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Moved top-level articleData to component: ${fixed} files`);
}

processAllBlogPages();
