import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

const validCategories = {
  fractionalCMO: ['fractionalCMO', 'cmo', 'fractional'],
  ndis: ['ndis', 'disability'],
  digitalMarketing: ['digital', 'marketing', 'seo', 'leadgen', 'leadgeneration', 'lead', 'buyers', 'finance', 'immigration'],
  construction: ['construction', 'building', 'builder', 'bricklayer'],
  legal: ['legal', 'lawyer', 'attorney'],
  tradies: ['tradies', 'tradie', 'plumber', 'electrician', 'accounting'],
};

const categoryMapping = {};
for (const [key, patterns] of Object.entries(validCategories)) {
  patterns.forEach(pattern => {
    categoryMapping[pattern.toLowerCase()] = key;
  });
}

console.log('Category mapping:', categoryMapping);

function fixRelatedArticlesRef(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find all relatedArticles references
  const refRegex = /relatedArticles\.(\w+)/g;
  let match;
  let changed = false;

  while ((match = refRegex.exec(content)) !== null) {
    const category = match[1];
    const validKey = categoryMapping[category.toLowerCase()];
    
    if (validKey && validKey !== category) {
      content = content.replace(`relatedArticles.${category}`, `relatedArticles.${validKey}`);
      changed = true;
    } else if (!validKey) {
      // Default to digitalMarketing for unknown categories
      content = content.replace(`relatedArticles.${category}`, `relatedArticles.digitalMarketing`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (fixRelatedArticlesRef(pageFile)) {
          fixed++;
        }
      } catch (error) {
        // skip
      }
    }
  }

  console.log(`Fixed relatedArticles references: ${fixed} files`);
}

processAllBlogPages();
