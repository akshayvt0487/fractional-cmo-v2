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
let updated = 0;
let skipped = 0;
let inlineUpdated = 0;

console.log(`Found ${blogFiles.length} blog files`);
console.log('');

for (const file of blogFiles) {
  let content = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(path.dirname(file));
  
  // Skip if already has convertDateFormat
  if (content.includes('convertDateFormat')) {
    skipped++;
    console.log(`⊘ Skipped: ${fileName} (already updated)`);
    continue;
  }
  
  // Pattern 1: 'const articleData = {'
  if (content.includes('const articleData = {')) {
    // Add convertDateFormat function before articleData
    const convertFunc = `
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

`;
    
    content = content.replace(
      /(\n\s*const articleData = \{)/,
      convertFunc + '$1'
    );
    
    // Replace any publishedDate with hardcoded value
    content = content.replace(
      /publishedDate:\s*"[^"]*"/g,
      'publishedDate: convertDateFormat(post.date)'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    updated++;
    console.log(`✓ Updated: ${fileName}`);
    continue;
  }
  
  // Pattern 2: '<OptimizedBlogLayout articleData={{'
  if (content.includes('<OptimizedBlogLayout articleData={{') && content.includes('publishedDate:')) {
    // Need to find and replace publishedDate inline
    // First, add convertDateFormat function at the top of the component
    let insertPoint = content.indexOf('const ');
    if (insertPoint === -1) {
      insertPoint = content.indexOf('return');
    }
    
    if (insertPoint !== -1) {
      const convertFunc = `const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  `;
      
      // Find the first newline after the component function declaration
      const funcStart = content.lastIndexOf('\n', insertPoint) + 1;
      content = content.slice(0, funcStart) + convertFunc + '\n' + content.slice(funcStart);
    }
    
    // Replace publishedDate inline
    content = content.replace(
      /publishedDate:\s*"[^"]*"/g,
      'publishedDate: convertDateFormat(post.date)'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    inlineUpdated++;
    console.log(`✓ Updated (inline): ${fileName}`);
    continue;
  }
  
  // If neither pattern found
  skipped++;
  console.log(`⊘ Skipped: ${fileName} (no compatible pattern found)`);
}

console.log('');
console.log('Summary:');
console.log(`  Updated (const): ${updated} files`);
console.log(`  Updated (inline): ${inlineUpdated} files`);
console.log(`  Skipped: ${skipped} files`);
