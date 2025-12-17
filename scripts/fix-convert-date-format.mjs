import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixMissingConvertDateFormat(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file uses convertDateFormat but doesn't define it
  if (!content.includes('convertDateFormat(')) {
    return false; // Doesn't use it
  }

  if (content.includes('const convertDateFormat =') || content.includes('function convertDateFormat')) {
    return false; // Already defined
  }

  // Define convertDateFormat before the component
  const componentMatch = content.match(/^(const|function)\s+(\w+)\s*(\(\)|=\s*\(\)\s*=>)\s*\{/m);
  if (!componentMatch) return false;

  const componentStartIndex = content.indexOf(componentMatch[0]);
  
  // Find where to insert - after imports, before export/component
  const insertPoint = componentStartIndex;

  const convertDateDef = `
const convertDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

`;

  content = content.substring(0, insertPoint) + convertDateDef + content.substring(insertPoint);

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
        if (fixMissingConvertDateFormat(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Added missing convertDateFormat: ${fixed}`);
}

processAllBlogPages();
