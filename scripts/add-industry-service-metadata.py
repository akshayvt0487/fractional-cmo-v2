#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add canonical and robots to all industry service pages
"""

import sys
import re
from pathlib import Path

if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.buffer, errors="ignore")

PROJECT_ROOT = Path(__file__).parent.parent
APP_DIR = PROJECT_ROOT / "app"

def get_service_and_industry_from_path(file_path: Path) -> tuple:
    """Extract service and industry from path like services/[service]/[industry]/page.tsx"""
    parts = file_path.parts
    try:
        services_idx = parts.index('services')
        service = parts[services_idx + 1].strip('[]')
        industry = parts[services_idx + 2].strip('[]')
        return service, industry
    except (ValueError, IndexError):
        return None, None

def update_industry_service_page(file_path: Path) -> bool:
    """Add canonical and robots to industry service pages"""
    try:
        content = file_path.read_text(encoding='utf-8')
        
        # Skip if already has robots tag
        if 'robots:' in content and 'index:' in content:
            return False
        
        service, industry = get_service_and_industry_from_path(file_path)
        if not service or not industry:
            return False
        
        # Pattern to find metadata export
        metadata_pattern = r'(export const metadata: Metadata = \{\s*title: data\.metaTitle,\s*description: data\.metaDescription,\s*keywords: data\.keywords,)'
        
        replacement = f'''export const metadata: Metadata = {{
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: data.keywords,
  alternates: {{
    canonical: `https://fractional-cmo.com.au/services/{service}/{industry}`,
  }},
  robots: {{
    index: true,
    follow: true,
    nocache: false,
  }},'''
        
        if re.search(metadata_pattern, content):
            new_content = re.sub(metadata_pattern, replacement, content)
            if new_content != content:
                file_path.write_text(new_content, encoding='utf-8')
                return True
        
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    print("Add canonical and robots to industry service pages\n")
    
    # Find all industry service page files
    # Pattern: app/services/[service]/[industry]/page.tsx
    industry_pages = list(APP_DIR.glob("services/*/*/page.tsx"))
    
    print(f"Found {len(industry_pages)} industry service pages\n")
    
    updated = 0
    skipped = 0
    
    for file_path in sorted(industry_pages)[:20]:  # Show first 20
        if update_industry_service_page(file_path):
            service, industry = get_service_and_industry_from_path(file_path)
            print(f"  ✓ {service}/{industry}")
            updated += 1
        else:
            skipped += 1
    
    if len(industry_pages) > 20:
        # Process remaining silently
        for file_path in industry_pages[20:]:
            if update_industry_service_page(file_path):
                updated += 1
            else:
                skipped += 1
        print(f"  ... processed {len(industry_pages) - 20} more pages")
    
    print(f"\nResults:")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")
    print(f"  Total: {len(industry_pages)}")

if __name__ == "__main__":
    main()
