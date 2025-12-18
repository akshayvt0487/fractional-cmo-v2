# Missing Sitemap Routes

**Total Missing:** 95 routes not included in `public/sitemap.xml` but have `app/**/page.tsx` files.

## Routes Missing from Sitemap

### Admin/Protected Pages (10 routes)
These pages should likely be excluded from sitemap (noindex):
- /admin
- /admin/analytics
- /admin/blog-posts
- /admin/content
- /admin/dashboard
- /admin/login
- /admin/settings
- /admin/submissions
- /admin-auth
- /analytics

### Utility/Private Pages (5 routes)
These pages should likely be excluded from sitemap (noindex):
- /test
- /thank-you
- /not-found
- /not-ready

### Blog Posts (51 routes)
These blog posts are present in app but missing from sitemap:
- /blog/accounting-digital-marketing
- /blog/accounting-growth-strategy
- /blog/b2b-lead-generation
- /blog/bricklayers-growth-marketing-strategy
- /blog/bricklayers-lead-generation
- /blog/buyers-agents-digital-marketing
- /blog/buyers-agents-google-ads-strategy
- /blog/buyers-agents-lead-generation
- /blog/buyers-agents-seo
- /blog/construction-cost-estimation
- /blog/construction-marketing-best-practices
- /blog/conveyancing-digital-marketing-roi
- /blog/conveyancing-lead-generation-strategies
- /blog/conveyancing-seo
- /blog/conveyancing-social-media-marketing
- /blog/criminal-lawyers-digital-marketing
- /blog/cyber-security-digital-marketing-strategies
- /blog/cyber-security-google-ads-strategy
- /blog/cyber-security-growth-hacking
- /blog/cyber-security-seo-australia
- /blog/digital-marketing-automation
- /blog/digital-strategy-modern-business
- /blog/divorce-lawyers-digital-marketing
- /blog/family-lawyers-digital-marketing
- /blog/finance-broker-digital-marketing
- /blog/finance-broker-google-ads
- /blog/finance-broker-lead-generation
- /blog/financial-planner-lead-generation
- /blog/financial-planner-seo
- /blog/floor-sanding-digital-marketing
- /blog/fractional-cmo-vs-full-time-cmo
- /blog/google-ads-conveyancing
- /blog/growth-marketing-strategy
- /blog/home-builders-lead-generation
- /blog/immigration-lawyers-digital-marketing
- /blog/immigration-lawyers-google-ads
- /blog/immigration-lawyers-lead-generation
- /blog/insolvency-digital-marketing
- /blog/it-consulting-digital-marketing-strategy
- /blog/it-consulting-lead-generation
- /blog/it-networking-business-growth-strategy
- /blog/lawyers-lead-generation
- /blog/liquidators-google-ads
- /blog/liquidators-google-ads/iquidators-google-ads-strategy
- /blog/liquidators-growth-marketing
- /blog/loan-broker-digital-marketing
- /blog/loan-broker-google-ads-strategy
- /blog/loan-broker-lead-generation-strategy
- /blog/local-search-ranking
- /blog/mechanic-digital-marketing
- /blog/ndis-disability-service-marketing
- /blog/ndis-google-ads-respite-sil-western-sydney
- /blog/ndis-lead-generation-strategies
- /blog/ndis-software-saas-lead-generation
- /blog/ndis-software-saas-marketing
- /blog/ndis-software-saas-positioning-strategy
- /blog/ndis-web-design
- /blog/painters-digital-marketing
- /blog/painters-lead-generation-strategy
- /blog/pre-purchase-car-inspection-business
- /blog/real-estate-seo-marketing
- /blog/removalist-business-marketing
- /blog/removalist-digital-marketing
- /blog/removalist-meta-ads-strategy
- /blog/removalist-seo-strategy
- /blog/renovation-builders-digital-marketing
- /blog/saas-marketing-it-sector
- /blog/security-digital-marketing
- /blog/security-google-ads-strategy
- /blog/security-lead-generation-strategy
- /blog/social-media-marketing-strategy
- /blog/starting-removalist-business
- /blog/tax-advisor-google-ads-strategy
- /blog/therapy-google-ads-strategy
- /blog/therapy-growth-marketing-strategy
- /blog/therapy-services-digital-marketing

### Service Pages - Dynamic Routes (29 routes)
These service pages with dynamic routing parameters are missing:
- /services/lead-generation/[industry]
- /services/online-marketing
- /services/online-marketing/[industry]
- /services/seo-services
- /services/seo-services/[industry]

---

## Summary by Category

| Category | Count | Action |
|----------|-------|--------|
| Admin/Protected | 10 | Should be **excluded** from sitemap (noindex) |
| Utility/Private | 4 | Should be **excluded** from sitemap (noindex) |
| Blog Posts | 51 | Should be **included** in sitemap |
| Service Dynamic Routes | 5 | Requires data-driven approach to generate URLs |
| **Total** | **70** | **14 additional blog posts** |

---

## Recommended Actions

1. **Admin pages** (`/admin*`, `/analytics`) — exclude from sitemap
2. **Utility pages** (`/test`, `/thank-you`, `/not-found`, `/not-ready`) — exclude from sitemap
3. **Blog posts** (51 routes) — add all to sitemap
4. **Dynamic service routes** — generate URLs from industry data and add to sitemap

**Note:** The verification script is currently showing 14 additional blog posts that should be added to the sitemap based on actual `app/blog/**/page.tsx` files found. The current sitemap appears to have some blog entries but is missing 51 blog post URLs.
