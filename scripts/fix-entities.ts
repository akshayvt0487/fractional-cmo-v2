import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

const WORKSPACE_ROOT = process.cwd();

// Map of characters to their escaped entities
const ENTITY_MAP: { [key: string]: string } = {
  "'": '&apos;',
  '"': '&quot;',
  '\u2019': '&rsquo;',
  '\u2018': '&lsquo;',
  '\u201C': '&ldquo;',
  '\u201D': '&rdquo;',
};

// Function to find all .tsx and .jsx files recursively
function findReactFiles(dir: string): string[] {
  const files: string[] = [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('node_modules') && !entry.name.startsWith('.')) {
        files.push(...findReactFiles(fullPath));
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to escape entities in JSX text
function escapeEntities(text: string): string {
  return text.replace(/[''"'"]/g, char => ENTITY_MAP[char] || char);
}

// Function to check and fix a single file
function processFile(filePath: string) {
  console.log(`Processing ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  let hasChanges = false;
  
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    traverse(ast, {
      JSXText(path) {
        const originalText = path.node.value;
        const escapedText = escapeEntities(originalText);
        
        if (originalText !== escapedText) {
          path.node.value = escapedText;
          hasChanges = true;
        }
      },
      StringLiteral(path) {
        // Only process string literals that are children of JSX elements
        if (path.parent.type === 'JSXElement' || 
            path.parent.type === 'JSXAttribute') {
          const originalText = path.node.value;
          const escapedText = escapeEntities(originalText);
          
          if (originalText !== escapedText) {
            path.node.value = escapedText;
            hasChanges = true;
          }
        }
      },
    });
    
    if (hasChanges) {
      const output = generate(ast, {
        retainLines: true,
        compact: false,
        jsescOption: {
          quotes: 'single',
        },
      }, content);
      
      fs.writeFileSync(filePath, output.code);
      console.log(`Fixed unescaped entities in ${filePath}`);
    }
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e);
  }
}

// Main function to process all files
function main() {
  const files = findReactFiles(WORKSPACE_ROOT);
  console.log(`Found ${files.length} React files to process`);
  
  files.forEach(processFile);
}

main();