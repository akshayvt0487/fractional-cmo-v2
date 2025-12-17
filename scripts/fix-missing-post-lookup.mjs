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

console.log('Scanning for files with post.date but no post lookup...\n');

for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Check if file has convertDateFormat(post.date) but NOT 'const post = blogPosts.find'
  if (content.includes('convertDateFormat(post.date)') && !content.includes('const post = blogPosts.find')) {
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
  
  // Extract the first const line in the component function
  const componentStart = content.indexOf('const ');
  
  if (componentStart > -1) {
    // Find the line before the first const
    const lineStart = content.lastIndexOf('\n', componentStart) + 1;
    
    const postLookup = `  const post = blogPosts.find(p => p.slug === "${slug}");
  if (!post) throw new Error("Blog post not found: ${slug}");
  
`;
    
    content = content.slice(0, lineStart) + postLookup + content.slice(lineStart);
  }
  
  // Also ensure blogPosts import exists
  if (!content.includes('import { blogPosts }') && !content.includes('import blogPosts')) {
    // Find the last import
    const lastImportMatch = content.match(/^(import .+;)(?=\n(?:export|const|\/\/))/m);
    if (lastImportMatch) {
      const lastImportIndex = content.lastIndexOf(lastImportMatch[1]);
      const insertPos = lastImportIndex + lastImportMatch[1].length;
      content = content.slice(0, insertPos) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.slice(insertPos);
    }
  }
  
  fs.writeFileSync(file, content, 'utf8');
  fixed++;
  console.log(`✓ Fixed: ${fileName}`);
}

console.log(`\nTotal fixed: ${fixed} files`);
