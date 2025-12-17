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

console.log('Scanning for files still missing blogPosts import...\n');

for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Check if file has post lookup but NOT blogPosts import
  if (content.includes('blogPosts.find(p =>') && !content.includes("import { blogPosts }") && !content.includes("import blogPosts")) {
    filesToFix.push({ file, fileName });
    console.log(`⚠️  Found: ${fileName}`);
  }
}

console.log(`\nTotal files needing import: ${filesToFix.length}\n`);

// Now add the import to all these files
let fixed = 0;

for (const { file, fileName } of filesToFix) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the last import line that ends with semicolon and newline
  const lastImportIndex = content.lastIndexOf('\nimport ');
  
  if (lastImportIndex > -1) {
    // Find the end of that import line
    const importLineEnd = content.indexOf(';\n', lastImportIndex) + 2;
    
    // Insert the new import
    content = content.slice(0, importLineEnd) + "import { blogPosts } from '@/data/blogPosts';\n" + content.slice(importLineEnd);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  fixed++;
  console.log(`✓ Fixed: ${fileName}`);
}

console.log(`\nTotal fixed: ${fixed} files`);
