import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const BLOG_DIR = path.join(process.cwd(), 'app/blog');

function updateMetadata(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = path.basename(path.dirname(filePath));
  
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Find the metadata export
    traverse(ast, {
      ExportNamedDeclaration(path) {
        if (
          t.isVariableDeclaration(path.node.declaration) &&
          path.node.declaration.declarations.some(
            decl => t.isIdentifier(decl.id) && decl.id.name === 'metadata'
          )
        ) {
          const declaration = path.node.declaration.declarations[0];
          if (t.isCallExpression(declaration.init)) {
            const args = declaration.init.arguments[0];
            if (t.isObjectExpression(args)) {
              // Extract existing values
              let title = '', description = '', keywords: string[] = [];
              let publishedTime = '', modifiedTime = '', heroImage = '';
              
              args.properties.forEach(prop => {
                if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                  if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                    title = prop.value.value;
                  }
                  if (prop.key.name === 'description' && t.isStringLiteral(prop.value)) {
                    description = prop.value.value;
                  }
                  if (prop.key.name === 'keywords' && t.isArrayExpression(prop.value)) {
                    keywords = prop.value.elements
                      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
                      .map(el => el.value);
                  }
                  if (prop.key.name === 'openGraph' && t.isObjectExpression(prop.value)) {
                    prop.value.properties.forEach(ogProp => {
                      if (t.isObjectProperty(ogProp) && t.isIdentifier(ogProp.key)) {
                        if (ogProp.key.name === 'publishedTime' && t.isStringLiteral(ogProp.value)) {
                          publishedTime = ogProp.value.value;
                        }
                        if (ogProp.key.name === 'modifiedTime' && t.isStringLiteral(ogProp.value)) {
                          modifiedTime = ogProp.value.value;
                        }
                      }
                    });
                  }
                }
              });

              // Find hero image import
              traverse(ast, {
                ImportDeclaration(importPath) {
                  const source = importPath.node.source.value;
                  if (source.includes('hero')) {
                    heroImage = source.replace('@/assets', '');
                  }
                },
              }, path.scope);

              // Create new metadata object
              const newMetadataArg = t.objectExpression([
                t.objectProperty(t.identifier('title'), t.stringLiteral(title)),
                t.objectProperty(t.identifier('description'), t.stringLiteral(description)),
                t.objectProperty(t.identifier('path'), t.stringLiteral(`/blog/${slug}`)),
                t.objectProperty(t.identifier('image'), t.stringLiteral(heroImage || `/images/blog/${slug}-hero.jpg`)),
                t.objectProperty(t.identifier('keywords'), t.arrayExpression(
                  keywords.map(k => t.stringLiteral(k))
                )),
                t.objectProperty(t.identifier('openGraph'), t.objectExpression([
                  t.objectProperty(t.identifier('type'), t.stringLiteral('article')),
                  t.objectProperty(t.identifier('publishedTime'), t.stringLiteral(publishedTime)),
                  t.objectProperty(t.identifier('modifiedTime'), t.stringLiteral(modifiedTime)),
                  t.objectProperty(t.identifier('authors'), t.arrayExpression([
                    t.stringLiteral('Basheer Padanna')
                  ]))
                ]))
              ]);

              declaration.init.arguments[0] = newMetadataArg;
            }
          }
        }
      },
    });

    // Generate updated code
    const output = generate(ast, {}, content);
    fs.writeFileSync(filePath, output.code);
    console.log(`✓ Updated metadata in ${path.basename(filePath)}`);
  } catch (e) {
    console.error(`Failed to process ${filePath}:`, e);
  }
}

// Process all blog pages
function processBlogPages() {
  const pages = fs
    .readdirSync(BLOG_DIR)
    .filter(name => {
      const stats = fs.statSync(path.join(BLOG_DIR, name));
      return stats.isDirectory();
    })
    .map(name => path.join(BLOG_DIR, name, 'page.tsx'))
    .filter(filePath => fs.existsSync(filePath));
    
  console.log(`Found ${pages.length} blog pages to update...\n`);
  pages.forEach(updateMetadata);
}

// Run the script
processBlogPages();