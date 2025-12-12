#!/usr/bin/env python3
"""
Generate all Next.js App Router pages for services and industry-services.
This script creates:
- 6 main service pages
- 48 industry-service pages (12 industries × 4 services)
"""

import json
from pathlib import Path
from typing import Dict, List

# All industries and services
INDUSTRIES = [
    'ndis-providers', 'builders', 'buyers-agents', 'accountants',
    'lawyers', 'painters', 'electricians', 'plumbers', 'removalists',
    'finance-brokers', 'bricklayers', 'floor-sanding'
]

INDUSTRY_SERVICES = ['google-ads', 'seo', 'lead-generation', 'digital-marketing']

MAIN_SERVICES = [
    'google-ads', 'seo', 'digital-marketing', 'digital-growth-strategy',
    'social-media-marketing', 'email-marketing'
]

class PageGenerator:
    def __init__(self, app_root: Path):
        self.app_root = app_root
        self.services_dir = app_root / 'app' / 'services'
    
    def generate_main_service_page(self, service_slug: str) -> str:
        """Generate a main service page."""
        return f'''import {{ Metadata }} from 'next';
import {{ getMainServicePageData, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema }} from '@/lib/data/mainServicePageData';
import ServiceLayout from '@/components/ServiceLayout';

const data = getMainServicePageData('{service_slug}')!;

export const metadata: Metadata = {{
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  openGraph: {{
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/{service_slug}',
    siteName: 'Fractional CMO',
    type: 'website',
  }},
  twitter: {{
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  }},
}};

export default function {self._camel_case(service_slug)}Page() {{
  const serviceSchema = generateServiceSchema(
    data.heroTitle,
    '{service_slug}',
    data.heroDescription
  );
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(data.heroTitle, '{service_slug}');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(serviceSchema) }}}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqSchema) }}}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumbSchema) }}}}
      />
      <ServiceLayout data={{data}} />
    </>
  );
}}
'''
    
    def generate_industry_service_page(self, service_slug: str, industry_slug: str) -> str:
        """Generate an industry-service page."""
        return f'''import {{ Metadata }} from 'next';
import {{ getIndustryServicePageData, generateIndustryServiceSchema, generateIndustryFAQSchema, generateIndustryBreadcrumbSchema }} from '@/lib/data/industryServicePageData';
import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const data = getIndustryServicePageData('{industry_slug}', '{service_slug}')!;

export const metadata: Metadata = {{
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  openGraph: {{
    title: data.metaTitle,
    description: data.metaDescription,
    url: 'https://fractional-cmo.com.au/services/{service_slug}/{industry_slug}',
    siteName: 'Fractional CMO',
    type: 'website',
  }},
  twitter: {{
    card: 'summary_large_image',
    title: data.metaTitle,
    description: data.metaDescription,
  }},
}};

export default function {self._camel_case(industry_slug)}{self._camel_case(service_slug)}Page() {{
  const serviceSchema = generateIndustryServiceSchema(
    '{industry_slug}',
    '{service_slug}',
    '{industry_slug}',
    '{service_slug}',
    data.heroDescription
  );
  const faqSchema = generateIndustryFAQSchema(data.faqs);
  const breadcrumbSchema = generateIndustryBreadcrumbSchema(
    '{service_slug}',
    '{industry_slug}',
    '{service_slug}',
    '{industry_slug}'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(serviceSchema) }}}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(faqSchema) }}}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{{{ __html: JSON.stringify(breadcrumbSchema) }}}}
      />
      <IndustryServiceLayout data={{data}} />
    </>
  );
}}
'''
    
    def _camel_case(self, slug: str) -> str:
        """Convert slug to PascalCase."""
        return ''.join(word.title() for word in slug.split('-'))
    
    def get_file_path(self, service_slug: str, industry_slug: str = None) -> Path:
        """Get the file path for a page."""
        if industry_slug:
            path = self.services_dir / service_slug / industry_slug / 'page.tsx'
        else:
            path = self.services_dir / service_slug / 'page.tsx'
        return path
    
    def create_page(self, service_slug: str, industry_slug: str = None) -> bool:
        """Create a page file."""
        try:
            file_path = self.get_file_path(service_slug, industry_slug)
            file_path.parent.mkdir(parents=True, exist_ok=True)
            
            if industry_slug:
                content = self.generate_industry_service_page(service_slug, industry_slug)
            else:
                content = self.generate_main_service_page(service_slug)
            
            file_path.write_text(content, encoding='utf-8')
            return True
        except Exception as e:
            print(f"Error creating {file_path}: {e}")
            return False
    
    def generate_all(self):
        """Generate all pages."""
        print("=" * 60)
        print("Page Generation Summary")
        print("=" * 60)
        
        created = 0
        failed = 0
        
        # Main service pages
        print(f"\n[PAGE] Creating {len(MAIN_SERVICES)} main service pages...")
        for service_slug in MAIN_SERVICES:
            if self.create_page(service_slug):
                created += 1
                print(f"  [OK] /services/{service_slug}/page.tsx")
            else:
                failed += 1
        
        # Industry-service pages
        total_industry_pages = len(INDUSTRIES) * len(INDUSTRY_SERVICES)
        print(f"\n[PAGE] Creating {total_industry_pages} industry-service pages...")
        for industry in INDUSTRIES:
            for service in INDUSTRY_SERVICES:
                if self.create_page(service, industry):
                    created += 1
                    print(f"  [OK] /services/{service}/{industry}/page.tsx")
                else:
                    failed += 1
        
        print("\n" + "=" * 60)
        print("Summary")
        print("=" * 60)
        print(f"[OK] Created: {created} pages")
        print(f"[ERROR] Failed: {failed} pages")
        print(f"[TOTAL] Total: {created + failed} pages")

def main():
    app_root = Path('.')
    generator = PageGenerator(app_root)
    generator.generate_all()
    return 0

if __name__ == '__main__':
    exit(main())
