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
  
  // Check if file has 'const articleData = {'
  if (!content.includes('const articleData = {')) {
    skipped++;
    console.log(`⊘ Skipped: ${fileName} (incompatible structure)`);
    continue;
  }
  
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
  
  // Replace any publishedDate with hardcoded value to use convertDateFormat(post.date)
  // This handles multiple formats: "2024-12-28T00:00:00.000Z", "2024-12-30", "2024-11-15T09:00:00+10:00", etc.
  content = content.replace(
    /publishedDate:\s*"[^"]*"/g,
    'publishedDate: convertDateFormat(post.date)'
  );
  
  // Write back
  fs.writeFileSync(file, content, 'utf8');
  updated++;
  console.log(`✓ Updated: ${fileName}`);
}

console.log('');
console.log('Summary:');
console.log(`  Updated: ${updated} files`);
console.log(`  Skipped: ${skipped} files`);
