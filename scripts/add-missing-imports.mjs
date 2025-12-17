import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function addMissingImport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if blogPosts import already exists at top level
  if (content.includes("import { blogPosts }")) {
    return false; // Already has it
  }

  // Check if this file references blogPosts
  if (!content.includes("blogPosts.find")) {
    return false; // Doesn't need it
  }

  // Find the last import statement
  const lastImportMatch = content.match(/^import\s+[^;]+from\s+['"][^'"]+['"];/m);
  if (!lastImportMatch) return false;

  const insertPosition = content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
  content = content.substring(0, insertPosition) + "\nimport { blogPosts } from '@/data/blogPosts';" + content.substring(insertPosition);

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
        if (addMissingImport(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Added missing imports: ${fixed} files`);
}

processAllBlogPages();
