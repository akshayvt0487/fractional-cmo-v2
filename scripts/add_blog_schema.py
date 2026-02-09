#!/usr/bin/env python3
"""
Add BlogPosting schema to all blog posts that don't have it yet.

This script:
1. Finds all blog post page.tsx files
2. Checks if they already have BlogPosting schema
3. Adds the schema if missing
"""

import os
import re
import glob
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "app" / "blog"


def has_blog_posting_schema(content):
    """Check if file already has BlogPosting schema"""
    return (
        "generateBlogPostingSchema" in content
        or '"BlogPosting"' in content
        or "'BlogPosting'" in content
    )


def has_import(content):
    """Check if file already imports generateBlogPostingSchema"""
    return "generateBlogPostingSchema" in content


def add_import(content):
    """Add import statement for generateBlogPostingSchema"""
    # Find all import statements
    import_pattern = r'import\s+.*?from\s+[\'"].*?[\'"];?'
    imports = re.finditer(import_pattern, content)

    # Find the last import
    last_import = None
    last_end = 0
    for match in imports:
        last_import = match
        last_end = match.end()

    if not last_import:
        print("    ⚠️  No import statements found")
        return content

    # Add the new import after the last import
    import_statement = "\nimport { generateBlogPostingSchema } from '@/utils/seoUtils';"

    return content[:last_end] + import_statement + content[last_end:]


def extract_metadata(content):
    """Extract metadata for schema generation"""
    metadata = {}

    # Extract publishedTime
    published_match = re.search(r'publishedTime:\s*["\']([^"\']+)["\']', content)
    if published_match:
        metadata["publishedDate"] = published_match.group(1).split("T")[0]
    else:
        metadata["publishedDate"] = "2025-01-01"

    # Extract modifiedTime
    modified_match = re.search(r'modifiedTime:\s*["\']([^"\']+)["\']', content)
    if modified_match:
        metadata["modifiedDate"] = modified_match.group(1).split("T")[0]
    else:
        metadata["modifiedDate"] = metadata["publishedDate"]

    # Estimate word count
    jsx_content = re.findall(r'<[^>]+>([^<]+)<', content)
    total_chars = sum(len(s) for s in jsx_content)
    words = max(1000, round((total_chars / 5) / 100) * 100)
    metadata["wordCount"] = words

    # Extract readTime
    read_time_match = re.search(r'readTime:\s*["\']([^"\']+)["\']', content)
    if read_time_match:
        time_str = read_time_match.group(1)
        time_num = re.search(r'(\d+)', time_str)
        if time_num:
            metadata["readTime"] = f"PT{time_num.group(1)}M"
        else:
            metadata["readTime"] = "PT15M"
    else:
        metadata["readTime"] = "PT15M"

    return metadata


def convert_inline_to_const(content):
    """Convert inline articleData to const declaration"""
    # Pattern for inline articleData in OptimizedBlogLayout
    inline_pattern = r'<OptimizedBlogLayout\s+articleData=\{\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\}'

    match = re.search(inline_pattern, content, re.DOTALL)
    if not match:
        return content, False

    article_data_content = match.group(1).strip()

    # Find the return statement
    return_match = re.search(r'return\s+(<OptimizedBlogLayout)', content)
    if not return_match:
        return content, False

    return_index = return_match.start()

    # Create the const declaration
    const_declaration = f"\n  const articleData = {{{article_data_content}}};\n\n  "

    # Insert before return
    new_content = content[:return_index] + const_declaration + content[return_index:]

    # Update OptimizedBlogLayout to use the const
    new_content = re.sub(
        inline_pattern,
        '<OptimizedBlogLayout articleData={articleData}',
        new_content,
        flags=re.DOTALL
    )

    return new_content, True


def add_schema_generation(content, metadata):
    """Add schema generation code after articleData const"""

    schema_code = f"""
  const blogPostingSchema = generateBlogPostingSchema({{
    headline: articleData.headline,
    description: articleData.description,
    author: articleData.author || "Basheer Padanna",
    publishedDate: articleData.publishedDate,
    modifiedDate: "{metadata['modifiedDate']}",
    url: articleData.url,
    imageUrl: articleData.imageUrl,
    keywords: articleData.tags || [],
    category: articleData.category,
    wordCount: {metadata['wordCount']},
    readTime: "{metadata['readTime']}"
  }});
"""

    # Find articleData const
    article_data_pattern = r'const\s+articleData\s*=\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\};'
    match = re.search(article_data_pattern, content, re.DOTALL)

    if not match:
        return content, False

    insert_index = match.end()
    new_content = content[:insert_index] + "\n" + schema_code + content[insert_index:]

    return new_content, True


def wrap_with_fragment(content):
    """Wrap return statement with fragment and add script tag"""

    # Find return statement
    return_match = re.search(r'return\s+(<OptimizedBlogLayout|<>)', content)
    if not return_match:
        return content, False

    # Check if already wrapped
    if '<>' in return_match.group(0):
        return content, False

    return_index = return_match.start() + len('return ')

    script_tag = """<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
    />
    """

    # Insert fragment and script
    new_content = content[:return_index] + script_tag + content[return_index:]

    # Find closing OptimizedBlogLayout
    closing_patterns = [
        (r'</OptimizedBlogLayout>;', '</OptimizedBlogLayout>\n    </>;'),
        (r'</OptimizedBlogLayout>\s*\);', '</OptimizedBlogLayout>\n    </>\n  );'),
    ]

    for pattern, replacement in closing_patterns:
        if re.search(pattern, new_content):
            new_content = re.sub(pattern, replacement, new_content)
            return new_content, True

    return new_content, False


def process_file(file_path):
    """Process a single blog post file"""
    file_name = file_path.parent.name

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already has schema
    if has_blog_posting_schema(content):
        print(f"  [OK] {file_name} - Already has BlogPosting schema")
        return "skipped"

    print(f"  Processing {file_name}...")

    try:
        updated_content = content
        changes_made = False

        # Add import if needed
        if not has_import(updated_content):
            updated_content = add_import(updated_content)
            changes_made = True

        # Convert inline articleData to const if needed
        if "articleData={{" in updated_content and "const articleData" not in updated_content:
            updated_content, converted = convert_inline_to_const(updated_content)
            if converted:
                changes_made = True
            else:
                print(f"    [WARN] Could not convert inline articleData")
                return "error"

        # Check if articleData exists
        if "const articleData" not in updated_content and "articleData={{" not in updated_content:
            print(f"    [WARN] No articleData found")
            return "skipped"

        # Extract metadata
        metadata = extract_metadata(updated_content)

        # Add schema generation
        updated_content, added = add_schema_generation(updated_content, metadata)
        if added:
            changes_made = True
        else:
            print(f"    [WARN] Could not add schema generation")
            return "error"

        # Wrap with fragment
        updated_content, wrapped = wrap_with_fragment(updated_content)
        if wrapped:
            changes_made = True
        else:
            print(f"    [WARN] Could not wrap with fragment")
            return "error"

        # Write back to file
        if changes_made:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"  [SUCCESS] {file_name} - Updated successfully\n")
            return "updated"
        else:
            print(f"  [SKIP] {file_name} - No changes made\n")
            return "skipped"

    except Exception as e:
        print(f"  [ERROR] {file_name} - Error: {str(e)}\n")
        return "error"


def main():
    print("Finding blog posts...\n")

    blog_posts = list(BLOG_DIR.glob("*/page.tsx"))
    print(f"Found {len(blog_posts)} blog posts\n")

    stats = {"updated": 0, "skipped": 0, "error": 0}

    for file_path in blog_posts:
        result = process_file(file_path)
        stats[result] += 1

    print("\n" + "=" * 50)
    print("Summary:")
    print(f"   Updated: {stats['updated']}")
    print(f"   Skipped: {stats['skipped']}")
    print(f"   Errors: {stats['error']}")
    print("=" * 50)


if __name__ == "__main__":
    main()
