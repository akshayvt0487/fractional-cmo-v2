#!/usr/bin/env python3
"""
Extract and convert migration guide data to TypeScript files.
This script parses the markdown migration guide and generates data files.
"""

import re
import json
from pathlib import Path

def extract_typescript_object(content: str, start_pattern: str, end_pattern: str) -> str:
    """Extract TypeScript object from content between markers."""
    start_idx = content.find(start_pattern)
    if start_idx == -1:
        return ""
    
    # Find the end pattern after start
    end_idx = content.find(end_pattern, start_idx + len(start_pattern))
    if end_idx == -1:
        return ""
    
    # Extract and clean
    section = content[start_idx:end_idx].strip()
    # Remove the end_pattern if it's included
    if end_pattern in section:
        section = section[:section.rfind(end_pattern)].strip()
    
    return section

def main():
    migration_file = Path("migration-guide.md")
    
    if not migration_file.exists():
        print("❌ migration-guide.md not found")
        return 1
    
    content = migration_file.read_text(encoding='utf-8')
    
    # Extract main service data
    main_service_start = "export const mainServiceContent: Record<string, MainServicePageData> = {"
    main_service_end = "export const getMainServicePageData"
    
    print("📖 Extracting mainServiceContent...")
    main_section = extract_typescript_object(content, main_service_start, main_service_end)
    if main_section:
        print(f"   ✅ Extracted {len(main_section)} characters")
    else:
        print(f"   ⚠️  Could not extract mainServiceContent")
    
    # Extract industry service data
    industry_start = "export const industryServiceContent: Record<string, Record<string, IndustryServicePageData>> = {"
    industry_end = "export const getIndustryServicePageData"
    
    print("📖 Extracting industryServiceContent...")
    industry_section = extract_typescript_object(content, industry_start, industry_end)
    if industry_section:
        print(f"   ✅ Extracted {len(industry_section)} characters")
    else:
        print(f"   ⚠️  Could not extract industryServiceContent")
    
    # Create data directory
    src_lib_data = Path("src/lib/data")
    src_lib_data.mkdir(parents=True, exist_ok=True)
    print(f"\n✅ Created directory: {src_lib_data}")
    
    print("\n" + "=" * 60)
    print("Next: Write extracted sections to TypeScript files")
    print("=" * 60)
    
    return 0

if __name__ == "__main__":
    exit(main())
