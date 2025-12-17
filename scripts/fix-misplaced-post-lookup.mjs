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
const filesNeedingFix = [];

console.log('Scanning for files with misplaced post lookup...\n');

for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Check if file has post lookup before export const metadata
  if (content.includes('const post = blogPosts.find') && content.indexOf('const post = blogPosts.find') < content.indexOf('export const metadata')) {
    filesNeedingFix.push({ file, fileName });
    console.log(`⚠️  Found: ${fileName}`);
  }
}

console.log(`\nTotal files needing fix: ${filesNeedingFix.length}\n`);

// Now fix all these files
let fixed = 0;

for (const { file, fileName } of filesNeedingFix) {
  let content = fs.readFileSync(file, 'utf8');
  const slug = fileName;
  
  // First, remove the misplaced post lookup from module level
  content = content.replace(
    /\n\s*const post = blogPosts\.find\(p => p\.slug === "[^"]*"\);\s*\n\s*if \(!post\) throw new Error\([^)]*\);\s*\n/,
    '\n'
  );
  
  // Add blogPosts import if not present
  if (!content.includes('import { blogPosts }') && !content.includes('import blogPosts')) {
    // Find the last import
    const lastImportMatch = content.match(/^(import .+;)(?=\n(?:export|const .*= \(\)|\/\/))/m);
    if (lastImportMatch) {
      const lastImportIndex = content.lastIndexOf(lastImportMatch[1]);
      const insertPos = lastImportIndex + lastImportMatch[1].length;
      content = content.slice(0, insertPos) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(insertPos);
    }
  }
  
  // Now add the post lookup inside the component function
  // Find the component function (const ComponentName = () => {)
  const componentMatch = content.match(/^(const \w+ = \(\) => \{)/m);
  if (componentMatch) {
    const componentIndex = content.indexOf(componentMatch[1]);
    const openBraceIndex = componentIndex + componentMatch[1].length;
    
    const postLookup = `
  const post = blogPosts.find(p => p.slug === "${slug}");
  if (!post) throw new Error("Blog post not found: ${slug}");
  `;
    
    content = content.slice(0, openBraceIndex) + postLookup + content.slice(openBraceIndex);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  fixed++;
  console.log(`✓ Fixed: ${fileName}`);
}

console.log(`\nTotal fixed: ${fixed} files`);
