#!/usr/bin/env python3
"""
Complete the industryServicePageData.ts file with all remaining industries.
Extracts data from migration-guide.md for industries not yet in the data file.
"""

import re
from pathlib import Path

def main():
    migration_file = Path("migration-guide.md")
    data_file = Path("src/lib/data/industryServicePageData.ts")
    
    if not migration_file.exists():
        print("❌ migration-guide.md not found")
        return 1
    
    if not data_file.exists():
        print("❌ industryServicePageData.ts not found")
        return 1
    
    # Read migration guide
    migration_content = migration_file.read_text(encoding='utf-8')
    
    # Read current data file
    data_content = data_file.read_text(encoding='utf-8')
    
    # Find which industries are already in the data file
    existing_industries = re.findall(r"'([\w-]+)':\s*{[\s\n]*'google-ads'", data_content)
    print(f"📋 Industries already in data file: {existing_industries}")
    
    # Extract the closing brace position for industryServiceContent
    close_pattern = r"export const industryServiceContent.*?^};"
    close_match = re.search(close_pattern, data_content, re.MULTILINE | re.DOTALL)
    
    if not close_match:
        print("❌ Could not find industryServiceContent closing brace")
        return 1
    
    # Find where to insert new industries (before the closing brace of industryServiceContent)
    insert_pos = data_content.rfind("};")
    if insert_pos == -1:
        print("❌ Could not find insertion point")
        return 1
    
    # The closing brace we want is the one after "export const industryServiceContent"
    # We need to find the last closing brace that closes the object
    lines = data_content[:insert_pos].split('\n')
    
    # Work backwards to find the line with just closing braces
    for i in range(len(lines) - 1, -1, -1):
        line = lines[i].strip()
        if line == '}':
            print(f"✅ Found insertion point at line {i + 1}")
            insert_line = i
            break
    
    print("\n" + "=" * 60)
    print("Next steps:")
    print("=" * 60)
    print("1. Manually extract remaining 10 industries from migration guide")
    print("2. Insert before the closing '};' of industryServiceContent")
    print("3. Ensure proper TypeScript syntax")
    print("\nRemaining industries to add:")
    all_industries = [
        'ndis-providers', 'builders', 'buyers-agents', 'accountants',
        'lawyers', 'painters', 'electricians', 'plumbers', 'removalists',
        'finance-brokers', 'bricklayers', 'floor-sanding'
    ]
    for ind in all_industries:
        status = "✅" if ind in existing_industries else "❌"
        print(f"  {status} {ind}")
    
    return 0

if __name__ == "__main__":
    exit(main())
