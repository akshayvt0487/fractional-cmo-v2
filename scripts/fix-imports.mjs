import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../app/blog');

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Collect all imports and their positions
    const imports = [];
    const nonImportLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      
      if (trimmed.startsWith('import ')) {
        imports.push(lines[i]);
      } else {
        nonImportLines.push({ index: i, line: lines[i] });
      }
    }
    
    if (imports.length === 0) return false;
    
    // Remove duplicates while preserving order
    const uniqueImports = [];
    const seenImports = new Set();
    for (const imp of imports) {
      if (!seenImports.has(imp)) {
        uniqueImports.push(imp);
        seenImports.add(imp);
      }
    }
    
    // Rebuild: imports first, then non-import lines
    const rebuilt = [...uniqueImports, ...nonImportLines.map(x => x.line)];
    content = rebuilt.join('\n');
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${path.relative(blogDir, filePath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error: ${path.relative(blogDir, filePath)} - ${error.message}`);
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

console.log(`\nProcessed: ${fixed} files`);
