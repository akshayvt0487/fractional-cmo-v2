#!/usr/bin/env node

/**
 * Sitemap Generator for Fractional CMO
 * Generates a comprehensive XML sitemap with all pages and content
 * Automatically scans app directory page.tsx files and includes all public pages
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const SITE_URL = 'https://fractional-cmo.com.au';

// Pages to exclude from sitemap (admin, private, utility, dynamic templates)
const EXCLUDE_PATTERNS = [
  'admin',
  'admin-auth',
  'analytics',
  'api',
  'test',
  'thank-you',
  'not-found',
  'not-ready',
];

// Industries for dynamic routes
const INDUSTRIES = [
  'ndis-providers',
  'builders',
  'buyers-agents',
  'accountants',
  'lawyers',
  'painters',
  'electricians',
  'plumbers',
  'removalists',
  'finance-brokers',
  'bricklayers',
  'floor-sanding',
];

// Helper to check if a route should be excluded
function shouldExclude(route) {
  return EXCLUDE_PATTERNS.some((pattern) => route.includes(pattern));
}

// Helper to check if route is a dynamic template
function isDynamicTemplate(route) {
  return route.includes('[') && route.includes(']');
}

// Define all site sections and their priorities
const siteStructure = {
  staticPages: [
    { loc: '/', changefreq: 'weekly', priority: '1.0', lastmod: '2025-12-18' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8', lastmod: '2025-12-18' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: '2025-12-18' },
    { loc: '/blog', changefreq: 'weekly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/sitemap', changefreq: 'weekly', priority: '0.6', lastmod: '2025-12-18' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3', lastmod: '2025-12-18' },
    { loc: '/terms-conditions', changefreq: 'yearly', priority: '0.3', lastmod: '2025-12-18' },
  ],
  mainServices: [
    { loc: '/services', changefreq: 'monthly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/services/google-ads', changefreq: 'monthly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/services/seo', changefreq: 'monthly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/services/lead-generation', changefreq: 'monthly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/services/digital-marketing', changefreq: 'monthly', priority: '0.9', lastmod: '2025-12-18' },
    { loc: '/services/digital-growth-strategy', changefreq: 'monthly', priority: '0.8', lastmod: '2025-12-18' },
    { loc: '/services/social-media-marketing', changefreq: 'monthly', priority: '0.8', lastmod: '2025-12-18' },
    { loc: '/services/email-marketing', changefreq: 'monthly', priority: '0.8', lastmod: '2025-12-18' },
  ],
  industries: [
    'ndis-providers',
    'builders',
    'buyers-agents',
    'accountants',
    'lawyers',
    'painters',
    'electricians',
    'plumbers',
    'removalists',
    'finance-brokers',
    'bricklayers',
    'floor-sanding',
  ],
};

function generateUrlEntry(url, changefreq, priority, lastmod) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Helper to recursively find all page.tsx files
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

// Convert file path to route
function filePathToRoute(filePath) {
  const rel = path.relative(APP_DIR, filePath).split(path.sep).join('/');
  if (rel === 'page.tsx') return '/';
  const without = rel.replace(/\/page\.tsx$/, '').replace(/page\.tsx$/, '');
  const route = '/' + without.replace(/\/$/, '');
  return route === '/' ? '/' : route;
}

// Get priority based on route
function getPriorityForRoute(route) {
  if (route === '/') return '1.0';
  if (route.startsWith('/blog/')) return '0.8';
  if (route.startsWith('/services/')) return '0.8';
  if (route === '/about' || route === '/contact') return '0.7';
  if (route === '/privacy-policy' || route === '/terms-conditions') return '0.3';
  return '0.6';
}

// Get changefreq based on route
function getChangefreqForRoute(route) {
  if (route === '/' || route === '/blog') return 'weekly';
  if (route.startsWith('/blog/')) return 'monthly';
  if (route.startsWith('/services/')) return 'monthly';
  if (route === '/privacy-policy' || route === '/terms-conditions') return 'yearly';
  return 'monthly';
}

function generateSitemap(allRoutes) {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add all routes
  const uniqueRoutes = new Set(allRoutes);
  const processedRoutes = new Set();

  for (const route of uniqueRoutes) {
    // Skip if already processed or if it's a dynamic template
    if (processedRoutes.has(route) || isDynamicTemplate(route)) {
      continue;
    }

    if (!shouldExclude(route)) {
      const url = `${SITE_URL}${route}`;
      const priority = getPriorityForRoute(route);
      const changefreq = getChangefreqForRoute(route);
      xmlContent += generateUrlEntry(url, changefreq, priority, '2025-12-18') + '\n';
      processedRoutes.add(route);
    }
  }

  // Add generated routes for dynamic templates
  // /services/lead-generation/[industry] -> /services/lead-generation/{industry}
  INDUSTRIES.forEach((industry) => {
    const routes = [
      `/services/lead-generation/${industry}`,
      `/services/online-marketing/${industry}`,
      `/services/seo/${industry}`,
    ];
    
    routes.forEach((route) => {
      if (!processedRoutes.has(route)) {
        const url = `${SITE_URL}${route}`;
        const priority = getPriorityForRoute(route);
        const changefreq = getChangefreqForRoute(route);
        xmlContent += generateUrlEntry(url, changefreq, priority, '2025-12-18') + '\n';
        processedRoutes.add(route);
      }
    });
  });

  // Close sitemap
  xmlContent += '</urlset>';

  return xmlContent;
}

async function main() {
  try {
    console.log('🗺️  Scanning app/**/page.tsx files...');
    const pageFiles = await findPageFiles(APP_DIR);
    console.log(`✅ Found ${pageFiles.length} page files`);

    const routes = pageFiles.map((f) => filePathToRoute(f));
    const excludedCount = routes.filter((r) => shouldExclude(r)).length;
    const includedCount = routes.length - excludedCount;

    console.log(`📍 Routes to include: ${includedCount}`);
    console.log(`🚫 Routes to exclude (admin/private): ${excludedCount}`);

    console.log('🔨 Generating comprehensive sitemap...');
    const sitemapContent = generateSitemap(routes);

    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemapContent, 'utf-8');

    // Count entries
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Total URLs: ${urlCount}`);
    console.log(`💾 Saved to: ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
