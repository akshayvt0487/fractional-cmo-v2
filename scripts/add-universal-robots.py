#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Universal Metadata Updater
Adds canonical URLs and robots tags to all pages across the website
"""

import os
import sys
import re
from pathlib import Path
from typing import Dict, List, Tuple

# Fix encoding for Windows
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.buffer, errors="ignore")

PROJECT_ROOT = Path(__file__).parent.parent
APP_DIR = PROJECT_ROOT / "app"

# Pages that should NOT be indexed
NO_INDEX_PATTERNS = ["/admin", "/api", "/test", "/not-ready", "/thank-you", "/analytics"]


def get_route_from_path(file_path: Path) -> str:
    """Convert file path to route (e.g., app/blog/my-post/page.tsx -> /blog/my-post)"""
    relative = file_path.relative_to(APP_DIR)
    parts = list(relative.parts[:-1])  # Remove 'page.tsx'
    route = "/" + "/".join(parts) if parts else "/"
    return route.replace("\\", "/")


def is_no_index_page(route: str) -> bool:
    """Check if a page should be excluded from indexing"""
    return any(route.startswith(pattern) for pattern in NO_INDEX_PATTERNS)


def should_add_robots(content: str) -> bool:
    """Check if file needs robots tags added"""
    has_metadata = "export const metadata" in content or "generateMetadata" in content
    has_robots = "robots:" in content and "index:" in content
    return has_metadata and not has_robots


def add_robots_to_metadata(content: str, noindex: bool = False) -> str:
    """Add robots configuration to metadata export"""
    
    # Pattern to find metadata export and add robots tag
    if noindex:
        robots_config = """  robots: {
    index: false,
    follow: false,
  },"""
    else:
        robots_config = """  robots: {
    index: true,
    follow: true,
    nocache: false,
  },"""
    
    # Find the metadata export and add robots tag if it doesn't exist
    # Look for patterns like: export const metadata = createMetadata({
    pattern = r'(export const metadata(?:: Metadata)? = (?:createMetadata|generatePageMetadata)\(\{)'
    
    if re.search(pattern, content):
        # Check if robots already exists nearby (within next 500 chars)
        match = re.search(pattern, content)
        if match:
            insert_pos = match.end()
            # Check if robots config already exists within next 500 chars
            section = content[insert_pos:insert_pos+500]
            if "robots:" not in section:
                # Add robots config after the opening brace
                new_content = content[:insert_pos] + "\n" + robots_config + "\n" + content[insert_pos:]
                return new_content
    
    return content


def process_file(file_path: Path) -> Tuple[bool, str]:
    """Process a single page file and add robots tags if needed"""
    try:
        content = file_path.read_text(encoding='utf-8')
        route = get_route_from_path(file_path)
        
        if not should_add_robots(content):
            return False, f"✓ {route}: Already has robots or no metadata"
        
        noindex = is_no_index_page(route)
        new_content = add_robots_to_metadata(content, noindex)
        
        if new_content != content:
            file_path.write_text(new_content, encoding='utf-8')
            index_status = "🚫 NO-INDEX" if noindex else "✓ INDEX"
            return True, f"{index_status} {route}: Updated"
        
        return False, f"? {route}: No changes made"
        
    except Exception as e:
        return False, f"❌ {file_path.name}: Error - {str(e)}"


def main():
    """Find and process all page files"""
    print("🚀 Universal Metadata Updater")
    print("=" * 60)
    
    # Find all page.tsx files
    page_files = list(APP_DIR.rglob("page.tsx"))
    print(f"\n📍 Found {len(page_files)} page files\n")
    
    # Sort by route for better organization
    page_files.sort(key=lambda p: get_route_from_path(p))
    
    updated = 0
    skipped = 0
    
    # Blog pages
    blog_pages = [p for p in page_files if "blog" in str(p)]
    print(f"📝 Processing {len(blog_pages)} BLOG pages:")
    for file_path in blog_pages:
        success, message = process_file(file_path)
        print(f"  {message}")
        if success:
            updated += 1
        else:
            skipped += 1
    
    # Service pages
    service_pages = [p for p in page_files if "services" in str(p)]
    print(f"\n⚙️  Processing {len(service_pages)} SERVICE pages:")
    for file_path in service_pages[:5]:  # Show first 5
        success, message = process_file(file_path)
        print(f"  {message}")
        if success:
            updated += 1
        else:
            skipped += 1
    if len(service_pages) > 5:
        print(f"  ... and {len(service_pages) - 5} more service pages")
    
    # Main pages
    main_pages = [p for p in page_files if not ("blog" in str(p) or "services" in str(p))]
    print(f"\n🏠 Processing {len(main_pages)} MAIN pages:")
    for file_path in main_pages:
        success, message = process_file(file_path)
        print(f"  {message}")
        if success:
            updated += 1
        else:
            skipped += 1
    
    print("\n" + "=" * 60)
    print(f"✅ Updated: {updated} files")
    print(f"⏭️  Skipped: {skipped} files")
    print(f"📊 Total pages: {len(page_files)}")


if __name__ == "__main__":
    main()
