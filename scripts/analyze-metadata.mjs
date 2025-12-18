#!/usr/bin/env node

/**
 * Universal Metadata Updater
 * Updates ALL page files to include canonical URLs and robots tags
 * Handles blog posts, service pages, and static pages
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

// Pages that should NOT be indexed
const NO_INDEX_PATTERNS = ['/admin', '/api', '/test', '/not-ready', '/thank-you', '/analytics'];

function isNoIndexPage(route) {
  return NO_INDEX_PATTERNS.some((pattern) => route.startsWith(pattern));
}

function extractRouteFromPath(filePath) {
  const relative = path.relative(APP_DIR, filePath);
  const parts = relative.split(path.sep);
  
  // Remove 'page.tsx' or 'layout.tsx'
  if (parts[parts.length - 1].includes('page.tsx') || parts[parts.length - 1].includes('layout.tsx')) {
    parts.pop();
  }
  
  // Join with forward slashes for routes
  let route = '/' + parts.join('/').replace(/\\/g, '/');
  
  // Clean up double slashes and trailing slashes
  route = route.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  
  return route;
}

async function findAllPageFiles() {
  console.log('🔍 Scanning for all page files...');
  
  const pageFiles = await glob(path.join(APP_DIR, '**/page.tsx'), {
    ignore: [
      '**/node_modules/**',
      '**/.next/**',
    ],
  });

  return pageFiles.map((filePath) => ({
    path: filePath,
    route: extractRouteFromPath(filePath),
    hasMetadata: false,
    needsUpdate: false,
  }));
}

async function analyzeFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  
  const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
  const hasRobotsTags = content.includes('robots:') && content.includes('index:');
  const needsRobotsTag = hasMetadata && !hasRobotsTags;
  
  return { hasMetadata, needsRobotsTag };
}

async function getStats(pageFiles) {
  console.log('\n📊 Analyzing files...');
  
  let totalFiles = 0;
  let withMetadata = 0;
  let needingRobots = 0;
  let noIndexPages = 0;

  for (const file of pageFiles) {
    totalFiles++;
    const { hasMetadata, needsRobotsTag } = await analyzeFile(file.path);
    
    if (hasMetadata) withMetadata++;
    if (needsRobotsTag) needingRobots++;
    if (isNoIndexPage(file.route)) noIndexPages++;
  }

  console.log(`\n  Total page files: ${totalFiles}`);
  console.log(`  ✓ Files with metadata: ${withMetadata}`);
  console.log(`  ⚠ Files needing robots tags: ${needingRobots}`);
  console.log(`  🚫 No-index pages (admin, api, etc): ${noIndexPages}`);
  console.log(`  📍 Public-facing pages: ${totalFiles - noIndexPages}`);
}

async function main() {
  try {
    console.log('🚀 Universal Metadata Analyzer\n');
    
    const pageFiles = await findAllPageFiles();
    await getStats(pageFiles);
    
    console.log('\n✅ Analysis complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Pages with metadata but no robots tags need: robots: { index: true, follow: true, nocache: false }');
    console.log('   2. Use generatePageMetadata() for new metadata exports');
    console.log('   3. For no-index pages, set: robots: { index: false, follow: false }');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
