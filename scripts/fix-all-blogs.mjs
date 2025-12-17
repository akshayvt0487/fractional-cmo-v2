import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Step 1: Extract all imports
  let imports = [];
  const importRegex = /^import\s+[^;]+from\s+['"]/gm;
  let importMatch;
  while ((importMatch = importRegex.exec(content)) !== null) {
    const startIdx = importMatch.index;
    const endIdx = content.indexOf(';', startIdx) + 1;
    imports.push(content.substring(startIdx, endIdx));
  }

  // Remove all imports from content
  content = content.replace(/^import\s+[^;]+from\s+['"]/gm, (match) => {
    const endIdx = content.indexOf(';', content.indexOf(match)) + 1;
    return '';
  });
  
  // Clean up extra blank lines at top
  content = content.replace(/^\n\n+/, '\n');
  
  // Step 2: Extract metadata export
  const metadataMatch = content.match(/export\s+const\s+metadata\s*=[\s\S]*?\}\);/);
  let metadata = '';
  if (metadataMatch) {
    metadata = metadataMatch[0];
    content = content.replace(metadataMatch[0], '');
  }

  // Step 3: Extract convertDateFormat function
  const convertDateMatch = content.match(/const\s+convertDateFormat\s*=\s*\([^)]*\)\s*:\s*string\s*=>\s*\{[\s\S]*?\n\s*\};/);
  let convertDateFunc = '';
  if (convertDateMatch) {
    convertDateFunc = convertDateMatch[0].trim();
    content = content.replace(convertDateMatch[0], '');
  }

  // Step 4: Extract component and find component name
  const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/);
  if (!componentMatch) return false;

  const componentName = componentMatch[1];
  
  // Step 5: Extract articleData and faqs from inside component
  const articleDataMatch = content.match(/const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/);
  let articleData = '';
  if (articleDataMatch) {
    articleData = articleDataMatch[0].trim();
    content = content.replace(articleDataMatch[0], '');
  }

  const faqsMatch = content.match(/const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/);
  let faqs = '';
  if (faqsMatch) {
    faqs = faqsMatch[0].trim();
    content = content.replace(faqsMatch[0], '');
  }

  // Step 6: Extract post definition
  const postMatch = content.match(/const\s+post\s*=\s*blogPosts\.find\([^)]+\);[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/);
  let postDef = '';
  if (postMatch) {
    postDef = postMatch[0].trim();
    content = content.replace(postMatch[0], '');
  }

  // Step 7: Get the JSX/return part
  const componentStart = content.indexOf('const ' + componentName + ' = () => {');
  if (componentStart === -1) return false;

  const afterComponentStart = content.substring(componentStart + ('const ' + componentName + ' = () => {').length);
  const returnIndex = afterComponentStart.indexOf('return (');
  if (returnIndex === -1) return false;

  const jsxPart = afterComponentStart.substring(returnIndex);

  // Clean up any remaining duplicates in JSX
  let cleanJsx = jsxPart;
  cleanJsx = cleanJsx.replace(/\s*const\s+\w+\s*=\s*[{\[]/g, ''); // Remove any const inside JSX
  
  // Step 8: Rebuild file with correct structure
  let rebuilt = '';

  // Add imports at top
  rebuilt += imports.join('\n') + '\n\n';

  // Add metadata
  rebuilt += metadata + '\n\n';

  // Add helper function outside component
  if (convertDateFunc) {
    rebuilt += convertDateFunc + '\n\n';
  }

  // Add component with correct order
  rebuilt += `const ${componentName} = () => {\n`;
  if (postDef) {
    rebuilt += '  ' + postDef.split('\n').join('\n  ') + '\n';
  }
  if (articleData) {
    rebuilt += '  ' + articleData.split('\n').join('\n  ') + '\n';
  }
  if (faqs) {
    rebuilt += '  ' + faqs.split('\n').join('\n  ') + '\n';
  }
  rebuilt += '\n  ' + jsxPart;

  fs.writeFileSync(filePath, rebuilt, 'utf8');
  return true;
}

function processAllBlogPages() {
  const dirs = fs.readdirSync(blogDir);
  let fixed = 0;

  for (const dir of dirs) {
    const pageFile = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pageFile)) {
      try {
        if (fixBlogFile(pageFile)) {
          fixed++;
        }
      } catch (error) {
        console.error(`Error in ${dir}:`, error.message);
      }
    }
  }

  console.log(`Fixed: ${fixed} files`);
}

processAllBlogPages();
