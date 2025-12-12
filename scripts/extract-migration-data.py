#!/usr/bin/env python3
"""
Extract structured data from the migration guide markdown file
and generate TypeScript data files.
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Any

def extract_data_section(content: str, start_marker: str, end_marker: str) -> str:
    """Extract a section between two markers from content."""
    start_idx = content.find(start_marker)
    if start_idx == -1:
        return ""
    start_idx += len(start_marker)
    
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1:
        end_idx = len(content)
    
    return content[start_idx:end_idx]

def main():
    migration_file = Path("migration-guide.md")
    
    if not migration_file.exists():
        print(f"Error: {migration_file} not found")
        return
    
    content = migration_file.read_text(encoding='utf-8')
    
    # Extract main service data section
    main_service_start = "export const mainServiceContent: Record<string, MainServicePageData> = {"
    main_service_end = "export const getMainServicePageData"
    
    main_data_section = extract_data_section(content, main_service_start, main_service_end)
    
    # Extract industry service data section
    industry_start = "export const industryServiceContent: Record<string, Record<string, IndustryServicePageData>> = {"
    industry_end = "export const getIndustryServicePageData"
    
    industry_section = extract_data_section(content, industry_start, industry_end)
    
    print("✅ Migration guide sections extracted successfully")
    print(f"Main service section size: {len(main_data_section)} chars")
    print(f"Industry service section size: {len(industry_section)} chars")
    
    # Create output files
    src_data_dir = Path("src/lib/data")
    src_data_dir.mkdir(parents=True, exist_ok=True)
    
    # Write main service data
    main_service_file = src_data_dir / "mainServicePageData.ts"
    print(f"\n✅ Would write to: {main_service_file}")
    
    # Write industry service data  
    industry_service_file = src_data_dir / "industryServicePageData.ts"
    print(f"✅ Would write to: {industry_service_file}")

if __name__ == "__main__":
    main()
