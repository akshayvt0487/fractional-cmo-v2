#!/usr/bin/env node

/**
 * Fix metadata placement - ensure metadata exports come before default exports
 * and only on server components (without 'use client')
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

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

async function processFile(filePath, route) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    // Skip client components
    if (content.includes("'use client'")) {
      return { status: 'skipped', reason: 'client component' };
    }

    // Skip if already has proper metadata at top
    if (/^(import|export\s+const\s+metadata)/m.test(content)) {
      // Check if metadata is misplaced (after default export)
      const exportDefaultIndex = content.indexOf('export default');
      const metadataIndex = content.indexOf('export const metadata');
      
      if (metadataIndex > exportDefaultIndex && exportDefaultIndex !== -1) {
        // Metadata is after default export - need to fix
      } else if (metadataIndex === -1) {
        // No metadata
        return { status: 'skipped', reason: 'no metadata' };
      } else {
        // Metadata is correctly placed before default export
        return { status: 'skipped', reason: 'metadata already correct' };
      }
    }

    // Find and remove misplaced metadata blocks
    const lines = content.split('\n');
    const metadataRegex = /export const metadata = \{[\s\S]*?\};/;
    
    // Check if metadata is after default export
    const defaultExportIdx = lines.findIndex((line) => line.includes('export default'));
    const hasMetadataAfter = lines
      .slice(defaultExportIdx + 1)
      .some((line) => line.includes('export const metadata'));

    if (defaultExportIdx === -1 || !hasMetadataAfter) {
      return { status: 'skipped', reason: 'no metadata to move' };
    }

    // Remove the metadata block that's after the default export
    const filtered = lines.filter((line, idx) => {
      if (idx > defaultExportIdx && line.includes('export const metadata')) {
        return false; // Skip this line and next few (metadata block)
      }
      return true;
    });

    // Remove consecutive metadata-related lines after default export
    let inMetadata = false;
    let finalLines = [];
    for (let i = 0; i < filtered.length; i++) {
      const line = filtered[i];
      if (i > defaultExportIdx && line.includes('export const metadata')) {
        inMetadata = true;
        continue;
      }
      if (inMetadata && line.trim() === '};') {
        inMetadata = false;
        continue;
      }
      if (!inMetadata) {
        finalLines.push(line);
      }
    }

    // Add metadata before the imports if it doesn't exist
    const noindex = shouldNoindex(route);
    const metadataBlock = noindex
      ? "export const metadata = {\n  robots: { index: false, follow: false },\n};\n"
      : "export const metadata = {\n  robots: { index: true, follow: true, nocache: false },\n};\n";

    // Find the insertion point (after last import, before anything else)
    let insertIdx = 0;
    for (let i = 0; i < finalLines.length; i++) {
      if (finalLines[i].trim().startsWith('import ')) {
        insertIdx = i + 1;
      } else if (finalLines[i].trim() === '' && insertIdx > 0) {
        // Empty line after imports is OK
      } else if (insertIdx > 0) {
        break; // Stop at first non-import, non-empty line after imports
      }
    }

    // Only add metadata if it doesn't exist
    if (!finalLines.some((line) => line.includes('export const metadata'))) {
      finalLines.splice(insertIdx, 0, '', metadataBlock);
    }

    const newContent = finalLines.join('\n');
    await fs.writeFile(filePath, newContent, 'utf-8');

    return { status: 'fixed' };
  } catch (error) {
    return { status: 'error', reason: error.message };
  }
}

async function main() {
  try {
    console.log('🔍 Scanning for misplaced metadata...');
    const pageFiles = await findPageFiles(APP_DIR);
    console.log(`✅ Found ${pageFiles.length} page files\n`);

    let stats = {
      fixed: 0,
      skipped: 0,
      error: 0,
      details: { skipped: {}, error: {} },
    };

    for (const file of pageFiles) {
      const route = filePathToRoute(file);
      const result = await processFile(file, route);

      if (result.status === 'fixed') {
        stats.fixed++;
        console.log(`✅ Fixed ${route}`);
      } else if (result.status === 'skipped') {
        stats.skipped++;
        if (!stats.details.skipped[result.reason]) {
          stats.details.skipped[result.reason] = 0;
        }
        stats.details.skipped[result.reason]++;
      } else if (result.status === 'error') {
        stats.error++;
        console.log(`❌ ${route}: ${result.reason}`);
      }
    }

    console.log('\n--- Summary ---');
    console.log(`✅ Fixed: ${stats.fixed}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    Object.entries(stats.details.skipped).forEach(([reason, count]) => {
      console.log(`  - ${reason}: ${count}`);
    });
    console.log(`❌ Errors: ${stats.error}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
