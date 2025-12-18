#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = path.resolve(path.join(path.dirname(__filename), '..'));
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const SITEMAP = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');
const SITE_URL = 'https://fractional-cmo.com.au';

async function walk(dir){
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for(const file of list){
    const full = path.join(dir, file.name);
    if(file.isDirectory()){
      results = results.concat(await walk(full));
    } else if(file.isFile() && file.name === 'page.tsx'){
      results.push(full);
    }
  }
  return results;
}

function filePathToRoute(filePath){
  // Normalize to posix-style forward slashes
  const rel = path.relative(APP_DIR, filePath).split(path.sep).join('/');
  if(rel === 'page.tsx') return '/';
  const without = rel.replace(/\/page\.tsx$/, '').replace(/page\.tsx$/, '');
  const route = '/' + without.replace(/\/$/, '');
  return route === '/' ? '/' : route;
}

async function parseSitemap(){
  try{
    const xml = await fs.readFile(SITEMAP, 'utf-8');
    const locs = [];
    const re = /<loc>(.*?)<\/loc>/g;
    let m;
    while((m = re.exec(xml)) !== null){
      locs.push(m[1]);
    }
    const paths = locs.map(u => u.replace(SITE_URL, '').replace(/\/$/, '') || '/');
    return { locs, paths };
  }catch(e){
    console.error('Could not read sitemap:', e.message);
    return { locs: [], paths: [] };
  }
}

(async function(){
  console.log('Scanning app for page.tsx files...');
  const files = await walk(APP_DIR).catch(e=>{ console.error(e); process.exit(1); });
  const routes = files.map(f=>filePathToRoute(f));

  console.log(`Found ${files.length} page.tsx files in app/`);

  const sitemap = await parseSitemap();
  console.log(`Found ${sitemap.locs.length} <loc> entries in public/sitemap.xml`);

  // Normalize routes for comparison (no trailing slash)
  const normRoutes = routes.map(r => r === '/' ? '/' : r.replace(/\/$/, ''));
  const sitemapSet = new Set(sitemap.paths.map(p => p === '' ? '/' : (p === '/'?'/':p)));

  const missing = normRoutes.filter(r => !sitemapSet.has(r));
  const extra = Array.from(sitemapSet).filter(p => !normRoutes.includes(p));

  console.log('\n--- Summary ---');
  console.log(`Total page files: ${routes.length}`);
  console.log(`Sitemap entries: ${sitemap.locs.length}`);
  console.log(`Routes missing from sitemap: ${missing.length}`);
  console.log(`Sitemap entries not mapped to page.tsx files: ${extra.length}`);

  if(missing.length){
    console.log('\nMissing routes (examples up to 200):');
    missing.slice(0,200).forEach(r=>console.log('  ', r));
  }

  if(extra.length){
    console.log('\nSitemap-only entries (examples up to 200):');
    extra.slice(0,200).forEach(r=>console.log('  ', r));
  }

  // Exit 0
})();