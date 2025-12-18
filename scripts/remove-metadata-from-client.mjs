#!/usr/bin/env node

/**
 * Remove metadata exports from client components
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

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

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Skip if not a client component
    if (!content.includes("'use client'")) {
      return { status: 'skipped', reason: 'not client component' };
    }

    // Skip if no metadata
    if (!content.includes('export const metadata')) {
      return { status: 'skipped', reason: 'no metadata' };
    }

    // Remove metadata block
    let newContent = content.replace(/\n\nexport const metadata = \{[\s\S]*?\};\n?/g, '');
    newContent = newContent.replace(/export const metadata = \{[\s\S]*?\};\n?/g, '');

    await fs.writeFile(filePath, newContent, 'utf-8');

    return { status: 'removed' };
  } catch (error) {
    return { status: 'error', reason: error.message };
  }
}

async function main() {
  try {
    console.log('🔍 Removing metadata from client components...');
    const pageFiles = await findPageFiles(APP_DIR);

    let stats = {
      removed: 0,
      skipped: 0,
      error: 0,
      details: { skipped: {}, error: {} },
    };

    for (const file of pageFiles) {
      const result = await processFile(file);

      if (result.status === 'removed') {
        stats.removed++;
        const rel = path.relative(PROJECT_ROOT, file).replace(/\\/g, '/');
        console.log(`✅ Removed metadata from ${rel}`);
      } else if (result.status === 'skipped') {
        stats.skipped++;
        if (!stats.details.skipped[result.reason]) {
          stats.details.skipped[result.reason] = 0;
        }
        stats.details.skipped[result.reason]++;
      } else if (result.status === 'error') {
        stats.error++;
        console.log(`❌ ${file}: ${result.reason}`);
      }
    }

    console.log('\n--- Summary ---');
    console.log(`✅ Removed: ${stats.removed}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
