import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find const articleData = { and extract it along with everything up to its closing }
    const match = content.match(/const articleData = \{[\s\S]*?\n\};/);
    if (!match) return false; // No articleData found
    
    const articleDataBlock = match[0];
    
    // Remove articleData from current position
    content = content.replace(articleDataBlock, '');
    
    // Find where to insert it - right after "const ComponentName = () => {"
    const componentMatch = content.match(/const \w+ = \(\) => \{/);
    if (!componentMatch) return false;
    
    const componentStart = componentMatch.index + componentMatch[0].length;
    
    // Insert articleData after the component function opening
    const before = content.substring(0, componentStart);
    const after = content.substring(componentStart);
    
    content = before + '\n  ' + articleDataBlock.replace(/^const/, '  const').replace(/\n/g, '\n  ') + '\n' + after;
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${path.relative(blogDir, filePath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error: ${path.relative(blogDir, filePath)}`);
    return false;
  }
}

const blogDirContents = fs.readdirSync(blogDir, { withFileTypes: true });
const pagesToFix = blogDirContents
  .filter(entry => entry.isDirectory())
  .map(entry => path.join(blogDir, entry.name, 'page.tsx'))
  .filter(filePath => fs.existsSync(filePath));

console.log(`Checking ${pagesToFix.length} blog pages...`);

let fixed = 0;
for (const filePath of pagesToFix) {
  if (fixFile(filePath)) {
    fixed++;
  }
}

console.log(`\nFixed: ${fixed} files`);
