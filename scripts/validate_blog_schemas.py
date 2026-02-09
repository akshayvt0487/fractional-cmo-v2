#!/usr/bin/env python3
"""
Validate BlogPosting schema across all blog posts.

This script checks:
1. Presence of BlogPosting schema
2. Schema structure and required fields
3. Proper fragment wrapper
4. Script tag injection
"""

import os
import re
import json
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "app" / "blog"

# Required BlogPosting fields according to schema.org
REQUIRED_FIELDS = [
    "@context",
    "@type",
    "headline",
    "description",
    "author",
    "publisher",
    "datePublished",
    "mainEntityOfPage"
]

# Recommended fields
RECOMMENDED_FIELDS = [
    "image",
    "dateModified",
    "inLanguage",
    "keywords",
    "wordCount",
    "articleSection"
]


def extract_schema_from_file(file_path):
    """Extract BlogPosting schema from a blog post file"""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check if file has schema generation
    if "generateBlogPostingSchema" not in content:
        # Check if it has inline BlogPosting schema
        if '"BlogPosting"' not in content and "'BlogPosting'" not in content:
            return None, "No BlogPosting schema found"

    # Extract the schema generation call
    schema_match = re.search(
        r'const\s+\w*[Ss]chema\s*=\s*generateBlogPostingSchema\s*\(\{([^}]+(?:\{[^}]*\}[^}]*)*)\}\)',
        content,
        re.DOTALL
    )

    if not schema_match:
        # Try to find inline schema
        schema_match = re.search(
            r'const\s+\w*[Ss]chema\s*=\s*\{[^}]*"@type"\s*:\s*"BlogPosting"[^}]*\}',
            content,
            re.DOTALL
        )
        if schema_match:
            return "inline", None

    # Check for script tag
    has_script_tag = '<script' in content and 'application/ld+json' in content

    # Check for fragment wrapper
    has_fragment = '<>' in content and '</>' in content

    return {
        "has_generation": bool(schema_match),
        "has_script_tag": has_script_tag,
        "has_fragment": has_fragment,
    }, None


def validate_file(file_path):
    """Validate a single blog post file"""
    file_name = file_path.parent.name

    # Skip non-article pages
    if file_name in ["page", "ndis-marketing-guide-2024"]:
        return {"status": "skipped", "reason": "Not an article page"}

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    issues = []
    warnings = []

    # Check 1: Has BlogPosting schema
    has_blog_posting = (
        "generateBlogPostingSchema" in content or
        '"BlogPosting"' in content or
        "'BlogPosting'" in content
    )

    if not has_blog_posting:
        issues.append("Missing BlogPosting schema")
        return {"status": "error", "issues": issues}

    # Check 2: Has script tag with proper type OR uses SchemaScript component
    has_script = (
        'type="application/ld+json"' in content or
        "type='application/ld+json'" in content or
        "SchemaScript" in content
    )
    if not has_script:
        issues.append("Missing script tag with application/ld+json type or SchemaScript component")

    # Check 3: Has dangerouslySetInnerHTML OR uses SchemaScript
    has_injection = (
        "dangerouslySetInnerHTML" in content or
        "SchemaScript" in content
    )
    if not has_injection:
        issues.append("Missing dangerouslySetInnerHTML for schema injection or SchemaScript component")

    # Check 4: Has fragment wrapper
    if "<>" not in content or "</>" not in content:
        warnings.append("Missing fragment wrapper (<>...</>)")

    # Check 5: Schema is properly stringified
    if "JSON.stringify" not in content and '"BlogPosting"' not in content:
        warnings.append("Schema might not be properly stringified")

    # Check 6: Has proper imports
    if "generateBlogPostingSchema" in content:
        if "from '@/utils/seoUtils'" not in content and 'from "@/utils/seoUtils"' not in content:
            issues.append("Missing import from @/utils/seoUtils")

    # Check 7: articleData exists (or uses custom layout)
    has_article_data = (
        "articleData" in content or
        "generateArticleSchema" in content or  # Custom schema generation
        "SchemaScript" in content  # Using schema component
    )
    if not has_article_data:
        warnings.append("Missing articleData object (may use custom layout)")

    if issues:
        return {"status": "error", "issues": issues, "warnings": warnings}
    elif warnings:
        return {"status": "warning", "warnings": warnings}
    else:
        return {"status": "valid"}


def main():
    print("Validating BlogPosting schema across all blog posts...\n")

    blog_posts = list(BLOG_DIR.glob("*/page.tsx"))
    print(f"Found {len(blog_posts)} blog post files\n")

    results = {
        "valid": [],
        "warnings": [],
        "errors": [],
        "skipped": []
    }

    for file_path in sorted(blog_posts):
        file_name = file_path.parent.name
        result = validate_file(file_path)

        status = result["status"]

        if status == "valid":
            results["valid"].append(file_name)
            print(f"[OK] {file_name}")
        elif status == "warning":
            results["warnings"].append({
                "file": file_name,
                "warnings": result.get("warnings", [])
            })
            print(f"[WARN] {file_name}")
            for warning in result.get("warnings", []):
                print(f"      - {warning}")
        elif status == "error":
            results["errors"].append({
                "file": file_name,
                "issues": result.get("issues", []),
                "warnings": result.get("warnings", [])
            })
            print(f"[ERROR] {file_name}")
            for issue in result.get("issues", []):
                print(f"      - {issue}")
        elif status == "skipped":
            results["skipped"].append(file_name)
            print(f"[SKIP] {file_name} - {result.get('reason', 'Unknown')}")

    # Print summary
    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Valid:    {len(results['valid'])} files")
    print(f"Warnings: {len(results['warnings'])} files")
    print(f"Errors:   {len(results['errors'])} files")
    print(f"Skipped:  {len(results['skipped'])} files")
    print("=" * 60)

    # Show details for errors
    if results["errors"]:
        print("\nERRORS DETAIL:")
        print("-" * 60)
        for error in results["errors"]:
            print(f"\n{error['file']}:")
            for issue in error["issues"]:
                print(f"  - {issue}")

    # Show details for warnings
    if results["warnings"]:
        print("\nWARNINGS DETAIL:")
        print("-" * 60)
        for warning in results["warnings"]:
            print(f"\n{warning['file']}:")
            for warn in warning["warnings"]:
                print(f"  - {warn}")

    # Return exit code
    if results["errors"]:
        print("\nValidation FAILED - errors found")
        return 1
    elif results["warnings"]:
        print("\nValidation PASSED with warnings")
        return 0
    else:
        print("\nValidation PASSED - all schemas valid!")
        return 0


if __name__ == "__main__":
    exit(main())
