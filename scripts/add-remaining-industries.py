#!/usr/bin/env python3
"""
Add remaining industries (Buyers Agents through Floor Sanding) to industryServicePageData.ts
This script extracts from migration-guide.md and appends to the existing data file.
"""

import re
from pathlib import Path

def main():
    print("📝 Adding remaining industries to industryServicePageData.ts...")
    
    industries_todo = [
        'buyers-agents', 'accountants', 'lawyers', 'painters',
        'electricians', 'plumbers', 'removalists', 'finance-brokers',
        'bricklayers', 'floor-sanding'
    ]
    
    data_file = Path("src/lib/data/industryServicePageData.ts")
    migration_file = Path("migration-guide.md")
    
    if not migration_file.exists():
        print("❌ migration-guide.md not found")
        return 1
    
    if not data_file.exists():
        print("❌ industryServicePageData.ts not found")
        return 1
    
    print(f"✅ Data file exists: {data_file}")
    print(f"✅ Migration guide exists: {migration_file}")
    print(f"\n📋 Industries to add: {len(industries_todo)}")
    for industry in industries_todo:
        print(f"   - {industry}")
    
    print("\n⚠️  This script requires manual extraction from migration-guide.md")
    print("📌 Alternative: Use Python JSON parsing to extract industries from markdown")
    
    return 0

if __name__ == "__main__":
    exit(main())
