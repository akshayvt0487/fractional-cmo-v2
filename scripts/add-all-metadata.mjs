#!/usr/bin/env node

/**
 * Add canonical and robots metadata to all public pages
 * Scans all app directory page.tsx files and injects metadata if missing
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const SITE_URL = 'https://fractional-cmo.com.au';

// Pages to exclude from indexing
const NO_INDEX_PATTERNS = [
  'admin',
  'admin-auth',
  'analytics',
  'api',
  'test',
  'thank-you',
  'not-found',
  'not-ready',
];

function shouldNoindex(route) {
  return NO_INDEX_PATTERNS.some((pattern) => route.includes(pattern));
}

function filePathToRoute(filePath) {
  const rel = path.relative(APP_DIR, filePath).split(path.sep).join('/');
  if (rel === 'page.tsx') return '/';
  const without = rel.replace(/\/page\.tsx$/, '').replace(/page\.tsx$/, '');
  const route = '/' + without.replace(/\/$/, '');
  return route === '/' ? '/' : route;
}

async function findPageFiles(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const file of list) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await findPageFiles(full));
    } else if (file.isFile() && file.name === 'page.tsx') {
      results.push(full);
    }
  }
  return results;
}

function generateMetadata(route) {
  const canonicalUrl = `${SITE_URL}${route}`;
  const noindex = shouldNoindex(route);
  
  if (noindex) {
    return `export const metadata = {
  robots: { index: false, follow: false },
};`;
  }

  return `export const metadata = {
  canonical: '${canonicalUrl}',
  robots: { index: true, follow: true, nocache: false },
};`;
}

async function processFile(filePath, route) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Check if metadata already exists
    if (content.includes('export const metadata')) {
      return { status: 'skipped', reason: 'metadata exists' };
    }

    // Check if page uses generateMetadata function
    if (content.includes('export function generateMetadata') || content.includes('export const generateMetadata')) {
      return { status: 'skipped', reason: 'uses generateMetadata' };
    }

    // Check if it's a client component (has 'use client')
    if (content.includes("'use client'")) {
      return { status: 'skipped', reason: 'client component' };
    }

    // Add metadata at the top, after imports
    const lines = content.split('\n');
    let insertIndex = 0;

    // Find the last import line
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ') || lines[i].trim().startsWith('export ')) {
        insertIndex = i + 1;
      }
    }

    // Skip if no imports found and content starts with component definition
    if (insertIndex === 0 && !lines[0].trim().startsWith('import') && !lines[0].trim().startsWith('export')) {
      insertIndex = 0;
    }

    const newLines = [
      ...lines.slice(0, insertIndex),
      '',
      generateMetadata(route),
      '',
      ...lines.slice(insertIndex),
    ];

    const newContent = newLines.join('\n');
    await fs.writeFile(filePath, newContent, 'utf-8');

    return { status: 'updated' };
  } catch (error) {
    return { status: 'error', reason: error.message };
  }
}

async function main() {
  try {
    console.log('🔍 Scanning all page.tsx files...');
    const pageFiles = await findPageFiles(APP_DIR);
    console.log(`✅ Found ${pageFiles.length} page files\n`);

    let stats = {
      updated: 0,
      skipped: 0,
      error: 0,
      details: { skipped: {}, error: {} },
    };

    console.log('📝 Processing pages...\n');

    for (const file of pageFiles) {
      const route = filePathToRoute(file);
      const result = await processFile(file, route);

      if (result.status === 'updated') {
        stats.updated++;
        console.log(`✅ ${route}`);
      } else if (result.status === 'skipped') {
        stats.skipped++;
        if (!stats.details.skipped[result.reason]) {
          stats.details.skipped[result.reason] = 0;
        }
        stats.details.skipped[result.reason]++;
      } else if (result.status === 'error') {
        stats.error++;
        if (!stats.details.error[result.reason]) {
          stats.details.error[result.reason] = 0;
        }
        stats.details.error[result.reason]++;
        console.log(`❌ ${route}: ${result.reason}`);
      }
    }

    console.log('\n--- Summary ---');
    console.log(`✅ Updated: ${stats.updated}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`  - metadata exists: ${stats.details.skipped['metadata exists'] || 0}`);
    console.log(`  - uses generateMetadata: ${stats.details.skipped['uses generateMetadata'] || 0}`);
    console.log(`  - client component: ${stats.details.skipped['client component'] || 0}`);
    if (Object.keys(stats.details.skipped).length > 3) {
      Object.entries(stats.details.skipped).forEach(([reason, count]) => {
        if (!['metadata exists', 'uses generateMetadata', 'client component'].includes(reason)) {
          console.log(`  - ${reason}: ${count}`);
        }
      });
    }
    console.log(`❌ Errors: ${stats.error}`);
    if (Object.keys(stats.details.error).length > 0) {
      Object.entries(stats.details.error).forEach(([reason, count]) => {
        console.log(`  - ${reason}: ${count}`);
      });
    }
    console.log(`📊 Total: ${stats.updated + stats.skipped + stats.error}/${pageFiles.length}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
