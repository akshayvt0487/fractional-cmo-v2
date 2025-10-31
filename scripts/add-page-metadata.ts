import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';

const BLOG_DIR = path.join(process.cwd(), 'app/blog');

// Convert kebab-case slug to title case words
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate metadata for a blog post based on its path and content
function generateBlogMetadata(filePath: string, slug: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract first h1/title from content if possible
  let title = '';
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    // Look for articleData object with headline
    let foundTitle = false;
    ast.program.body.forEach(node => {
      if (t.isVariableDeclaration(node)) {
        node.declarations.forEach(decl => {
          if (
            t.isVariableDeclarator(decl) &&
            t.isIdentifier(decl.id) &&
            decl.id.name === 'articleData' &&
            t.isObjectExpression(decl.init)
          ) {
            decl.init.properties.forEach(prop => {
              if (
                t.isObjectProperty(prop) &&
                t.isIdentifier(prop.key) &&
                prop.key.name === 'headline' &&
                t.isStringLiteral(prop.value)
              ) {
                title = prop.value.value;
                foundTitle = true;
              }
            });
          }
        });
      }
    });
    
    if (!foundTitle) {
      title = slugToTitle(slug);
    }
  } catch (e) {
    console.warn(`Failed to parse ${filePath}, using slug-based title`);
    title = slugToTitle(slug);
  }
  
  const description = `Expert guidance on ${title.toLowerCase()}. Learn proven strategies and best practices for business growth.`;
  
  const keywords = slug
    .split('-')
    .filter(word => word.length > 3)
    .map(word => word.toLowerCase());
    
  keywords.push('digital marketing', 'business growth', 'marketing strategy');
  
  const imagePath = `/images/blog/${slug}.jpg`;
  const hasImage = fs.existsSync(path.join(process.cwd(), 'public', imagePath));
  
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const fullURL = `${siteURL}/blog/${slug}`;
  const imageURL = hasImage ? `${siteURL}${imagePath}` : `${siteURL}/images/hero-fractional-cmo.jpg`;
  
  return {
    title,
    description,
    path: `/blog/${slug}`,
    keywords: Array.from(new Set(keywords)),
    openGraph: {
      title,
      description,
      url: fullURL,
      siteName: 'Fractional CMO',
      type: 'article',
      images: [
        {
          url: imageURL,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      publishedTime: content.match(/publishedDate: "([^"]+)"/)?.at(1) || undefined,
      modifiedTime: new Date().toISOString(),
      authors: [content.match(/author: "([^"]+)"/)?.at(1) || 'Fractional CMO']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageURL],
      site: '@FractionalCMO'
    }
  };
}

// Add metadata export to a page if it doesn't exist
function addMetadataToPage(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    // Check if metadata export already exists
    let hasMetadata = false;
    ast.program.body.forEach(node => {
      if (
        t.isExportNamedDeclaration(node) &&
        t.isVariableDeclaration(node.declaration) &&
        node.declaration.declarations.some(
          decl => t.isIdentifier(decl.id) && decl.id.name === 'metadata'
        )
      ) {
        hasMetadata = true;
      }
    });
    
    // Always update metadata to ensure OG tags are present
    if (hasMetadata) {
      console.log(`Updating metadata in ${filePath}`);
      // Remove existing metadata export
      ast.program.body = ast.program.body.filter(node => {
        if (t.isExportNamedDeclaration(node) && 
            t.isVariableDeclaration(node.declaration)) {
          const declarations = node.declaration.declarations;
          return !declarations.some(
            decl => t.isIdentifier(decl.id) && decl.id.name === 'metadata'
          );
        }
        return true;
      });
    }
    
    // Generate metadata based on file path
    const slug = path.basename(path.dirname(filePath));
    const metadata = generateBlogMetadata(filePath, slug);
    
    // Add imports if needed
    let hasMetadataImport = false;
    ast.program.body.forEach(node => {
      if (
        t.isImportDeclaration(node) &&
        node.source.value === '@/lib/seo'
      ) {
        hasMetadataImport = true;
      }
    });
    
    if (!hasMetadataImport) {
      ast.program.body.unshift(
        t.importDeclaration(
          [t.importSpecifier(t.identifier('createMetadata'), t.identifier('createMetadata'))],
          t.stringLiteral('@/lib/seo')
        )
      );
    }
    
    // Add metadata export
    function createValueNode(value: any): any {
      if (Array.isArray(value)) {
        return t.arrayExpression(value.map(v => createValueNode(v)));
      }
      if (typeof value === 'object' && value !== null) {
        return t.objectExpression(
          Object.entries(value).map(([k, v]) =>
            t.objectProperty(t.identifier(k), createValueNode(v))
          )
        );
      }
      if (typeof value === 'string') {
        return t.stringLiteral(value);
      }
      if (typeof value === 'number') {
        return t.numericLiteral(value);
      }
      if (value === undefined) {
        return t.identifier('undefined');
      }
      return t.nullLiteral();
    }

    const metadataExport = t.exportNamedDeclaration(
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier('metadata'),
          t.callExpression(t.identifier('createMetadata'), [
            t.objectExpression(
              Object.entries(metadata).map(([key, value]) =>
                t.objectProperty(t.identifier(key), createValueNode(value))
              )
            ),
          ])
        ),
      ])
    );
    
    // Add after imports but before component
    const lastImportIndex = ast.program.body.reduce(
      (lastIndex, node, index) =>
        t.isImportDeclaration(node) ? index : lastIndex,
      -1
    );
    
    ast.program.body.splice(lastImportIndex + 1, 0, metadataExport);
    
    // Generate code
    const output = generate(ast, {}, content);
    fs.writeFileSync(filePath, output.code);
    
    console.log(`Added metadata to ${filePath}`);
  } catch (e) {
    console.error(`Failed to process ${filePath}:`, e);
  }
}

// Process all blog pages
function processBlogPages() {
  const blogDir = path.join(process.cwd(), 'app/blog');
  
  // Get all page.tsx files in blog subdirectories
  const pages = fs
    .readdirSync(blogDir)
    .filter(name => {
      const stats = fs.statSync(path.join(blogDir, name));
      return stats.isDirectory();
    })
    .map(name => path.join(blogDir, name, 'page.tsx'))
    .filter(filePath => fs.existsSync(filePath));
    
  pages.forEach(addMetadataToPage);
}

// Run the script
processBlogPages();