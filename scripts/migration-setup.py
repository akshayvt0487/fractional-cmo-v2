#!/usr/bin/env python3
"""
Migration script to convert React service pages to Next.js App Router.
Extracts data from migration guide and generates all necessary files.
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Any, Optional

# Define all industries and services
INDUSTRIES = [
    'ndis-providers', 'builders', 'buyers-agents', 'accountants',
    'lawyers', 'painters', 'electricians', 'plumbers', 'removalists',
    'finance-brokers', 'bricklayers', 'floor-sanding'
]

SERVICES = ['google-ads', 'seo', 'lead-generation', 'digital-marketing']

MAIN_SERVICES = [
    'google-ads', 'seo', 'digital-marketing', 'digital-growth-strategy',
    'social-media-marketing', 'email-marketing'
]

def main():
    print("=" * 60)
    print("Next.js Service Pages Migration - Setup")
    print("=" * 60)
    print(f"\n✅ Industries: {len(INDUSTRIES)}")
    print(f"✅ Services per industry: {len(SERVICES)}")
    print(f"✅ Main services: {len(MAIN_SERVICES)}")
    print(f"✅ Total industry-service pages: {len(INDUSTRIES) * len(SERVICES)}")
    print(f"✅ Total pages to create: {len(INDUSTRIES) * len(SERVICES) + len(MAIN_SERVICES) + 1}")
    
    print("\n📋 Industries:")
    for i, industry in enumerate(INDUSTRIES, 1):
        print(f"   {i:2d}. {industry}")
    
    print("\n📋 Services per industry:")
    for service in SERVICES:
        print(f"   - {service}")
    
    print("\n📋 Main services:")
    for service in MAIN_SERVICES:
        print(f"   - {service}")
    
    print("\n" + "=" * 60)
    print("Next Steps:")
    print("=" * 60)
    print("1. ✅ Extract data from migration-guide.md")
    print("2. ✅ Create lib/data/industryServicePageData.ts")
    print("3. ✅ Create lib/data/mainServicePageData.ts")
    print("4. Create app/services/[service]/[industry]/page.tsx")
    print("5. Create app/services/[service]/page.tsx")
    print("6. Create app/services/layout.tsx")
    print("7. Test all pages for proper rendering")
    
    print("\nProcessing structure defined. Ready for data extraction.")

if __name__ == "__main__":
    main()
