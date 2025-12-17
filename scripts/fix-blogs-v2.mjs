import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixBlogFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the component function - get name and position
  const componentRegex = /^const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{/m;
  const componentMatch = content.match(componentRegex);
  if (!componentMatch) return false;

  const componentName = componentMatch[1];
  const componentStartIndex = content.indexOf(componentMatch[0]);

  // Split: everything before component vs component onwards
  const beforeComponent = content.substring(0, componentStartIndex);
  const componentAndAfter = content.substring(componentStartIndex);

  // Step 1: Move import statements to top
  let imports = [];
  let cleanedBefore = beforeComponent;
  
  // Find any imports embedded anywhere in beforeComponent
  let importMatch;
  const importRegex = /^import\s+[^;]+from\s+['"][^'"]+['"];?/gm;
  while ((importMatch = importRegex.exec(beforeComponent)) !== null) {
    imports.push(importMatch[0]);
  }

  // Remove those imports from cleanedBefore
  cleanedBefore = cleanedBefore.replace(/^import\s+[^;]+from\s+['"][^'"]+['"];?\n?/gm, '');

  // Collect all imports at top
  let allImports = [];
  const topImports = beforeComponent.match(/^import\s+[^;]+from\s+['"][^'"]+['"];?\n/gm) || [];
  topImports.forEach(imp => {
    if (!allImports.includes(imp)) allImports.push(imp);
  });

  imports.forEach(imp => {
    if (!allImports.includes(imp)) allImports.push(imp);
  });

  // Step 2: Find post definition in component
  const postRegex = /const\s+post\s*=\s*blogPosts\.find\([^)]+\)[^;]*;[\s\n]*if\s*\([^)]+\)\s*throw\s+new\s+Error\([^)]+\);/m;
  const postInComponent = componentAndAfter.match(postRegex);

  // Step 3: Find return statement in component
  const returnRegex = /\n\s*return\s*\(/;
  const returnMatch = componentAndAfter.match(returnRegex);
  if (!returnMatch) return false;

  const returnIndex = componentAndAfter.indexOf(returnMatch[0]);

  // Get everything between component start and return
  const beforeReturn = componentAndAfter.substring(0, returnIndex);
  const returnAndJsx = componentAndAfter.substring(returnIndex + 1); // Skip the \n

  // Step 4: Extract post, articleData, faqs from beforeReturn
  let postDef = '';
  let cleanedBeforeReturn = beforeReturn;
  
  const postMatch = beforeReturn.match(postRegex);
  if (postMatch) {
    postDef = postMatch[0];
    cleanedBeforeReturn = cleanedBeforeReturn.replace(postRegex, '');
  }

  const articleDataRegex = /const\s+articleData\s*=\s*\{[\s\S]*?\n\s*\};/m;
  const articleDataMatch = cleanedBeforeReturn.match(articleDataRegex);
  let articleDataDef = '';
  if (articleDataMatch) {
    articleDataDef = articleDataMatch[0];
    cleanedBeforeReturn = cleanedBeforeReturn.replace(articleDataRegex, '');
  }

  const faqsRegex = /const\s+faqs\s*=\s*\[[\s\S]*?\n\s*\];/m;
  const faqsMatch = cleanedBeforeReturn.match(faqsRegex);
  let faqsDef = '';
  if (faqsMatch) {
    faqsDef = faqsMatch[0];
    cleanedBeforeReturn = cleanedBeforeReturn.replace(faqsRegex, '');
  }

  // Clean up triple newlines
  cleanedBeforeReturn = cleanedBeforeReturn.replace(/\n\n\n+/g, '\n\n');

  // Step 5: Rebuild file
  let result = '';

  // Add cleaned top (imports + metadata comment)
  result += allImports.join('') + '\n';
  result += cleanedBefore.replace(/^import\s+[^;]+from\s+['"][^'"]+['"];?\n?/gm, '').trim() + '\n\n';

  // Add component definition
  result += 'const ' + componentName + ' = () => {';

  // Add variables in correct order inside component
  if (postDef) {
    result += '\n' + postDef;
  }
  if (articleDataDef) {
    result += '\n  ' + articleDataDef.trim().split('\n').join('\n  ');
  }
  if (faqsDef) {
    result += '\n  ' + faqsDef.trim().split('\n').join('\n  ');
  }

  // Add return and JSX
  result += '\n  return (' + returnAndJsx;

  fs.writeFileSync(filePath, result, 'utf8');
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
        // skip
      }
    }
  }

  console.log(`Fixed: ${fixed} files`);
}

processAllBlogPages();
