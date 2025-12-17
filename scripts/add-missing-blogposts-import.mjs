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
const filesNeedingImport = [];

console.log('Scanning for files with post lookup but no blogPosts import...\n');

for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Check if file has post lookup but NOT blogPosts import
  if (content.includes('blogPosts.find(p =>') && !content.includes('import { blogPosts }') && !content.includes('import blogPosts')) {
    filesNeedingImport.push({ file, fileName });
    console.log(`⚠️  Found: ${fileName}`);
  }
}

console.log(`\nTotal files needing import: ${filesNeedingImport.length}\n`);

// Now add the import to all these files
let fixed = 0;

for (const { file, fileName } of filesNeedingImport) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the last import line
  const lastImportMatch = content.match(/^(import .+;)\n(?=import|export|const|\n)/m);
  
  if (lastImportMatch) {
    const lastImportIndex = content.lastIndexOf(lastImportMatch[1]);
    const insertPos = lastImportIndex + lastImportMatch[1].length;
    content = content.slice(0, insertPos) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(insertPos);
  } else {
    // If no match found, add after first import
    const firstImportEnd = content.indexOf(';\n', content.indexOf('import ')) + 2;
    content = content.slice(0, firstImportEnd) + "import { blogPosts } from '@/data/blogPosts';\n" + content.slice(firstImportEnd);
  }
  
  fs.writeFileSync(file, content, 'utf8');
  fixed++;
  console.log(`✓ Fixed: ${fileName}`);
}

console.log(`\nTotal fixed: ${fixed} files`);
