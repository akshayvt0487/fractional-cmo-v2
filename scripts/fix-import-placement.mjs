import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, '..', 'app', 'blog');

// Get all blog page.tsx files recursively
function getAllBlogFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        files.push(pagePath);
      }
    }
  }
  
  return files;
}

const blogFiles = getAllBlogFiles(blogDir);
const filesToFix = [];

console.log('Scanning for files with misplaced blogPosts import...\n');

for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Check if import is inside component function
  if (content.includes("import { blogPosts }") && content.indexOf("import { blogPosts }") > content.indexOf("const FinancialPlannerSEO = () =>") && content.indexOf("import { blogPosts }") > content.indexOf("const ") ) {
    filesToFix.push({ file, fileName });
    console.log(`⚠️  Found: ${fileName}`);
  }
}

console.log(`\nTotal files needing fix: ${filesToFix.length}\n`);

// Now fix all these files
let fixed = 0;

for (const { file, fileName } of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the misplaced import (the one inside function)
  content = content.replace(
    /\n?import { blogPosts } from '@\/data\/blogPosts';\n/,
    '\n'
  );
  
  // Find where to insert it (after last import at module level, before export const metadata)
  const lastImportMatch = content.match(/^(import .+;)\n(?=export const metadata|const )/m);
  
  if (lastImportMatch) {
    const lastImportIndex = content.lastIndexOf(lastImportMatch[1]);
    const insertPos = lastImportIndex + lastImportMatch[1].length;
    content = content.slice(0, insertPos) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(insertPos);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  fixed++;
  console.log(`✓ Fixed: ${fileName}`);
}

console.log(`\nTotal fixed: ${fixed} files`);
