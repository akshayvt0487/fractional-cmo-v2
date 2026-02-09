#!/bin/bash

# List of files that still need BlogPosting schema
files=(
  "app/blog/accounting-growth-strategy/page.tsx"
  "app/blog/advanced-ndis-lead-generation/page.tsx"
  "app/blog/b2b-lead-generation/page.tsx"
  "app/blog/bricklayers-growth-marketing-strategy/page.tsx"
  "app/blog/bricklayers-lead-generation/page.tsx"
  "app/blog/buyers-agents-lead-generation/page.tsx"
  "app/blog/buyers-agents-seo/page.tsx"
  "app/blog/finance-broker-digital-marketing/page.tsx"
  "app/blog/finance-broker-google-ads/page.tsx"
  "app/blog/finance-broker-lead-generation/page.tsx"
  "app/blog/loan-broker-google-ads-strategy/page.tsx"
  "app/blog/ndis-lead-generation-strategies/page.tsx"
  "app/blog/ndis-marketing-guide-2024/page.tsx"
  "app/blog/ndis-software-saas-lead-generation/page.tsx"
  "app/blog/ndis-software-saas-marketing/page.tsx"
  "app/blog/ndis-software-saas-positioning-strategy/page.tsx"
  "app/blog/painters-lead-generation-strategy/page.tsx"
  "app/blog/security-lead-generation-strategy/page.tsx"
  "app/blog/what-is-fractional-cmo/page.tsx"
  "app/blog/when-to-hire-fractional-cmo/page.tsx"
)

echo "Updating ${#files[@]} blog posts with BlogPosting schema..."

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."

    # Check if already has the import
    if ! grep -q "generateBlogPostingSchema" "$file"; then
      # Add import after relatedArticles import or last import
      if grep -q "import.*relatedArticles.*from.*seoUtils" "$file"; then
        sed -i "s/import { relatedArticles } from/import { relatedArticles, generateBlogPostingSchema } from/" "$file"
      elif grep -q "import.*from.*seoUtils" "$file"; then
        sed -i "s/} from '@\/utils\/seoUtils'//, generateBlogPostingSchema } from '@\/utils\/seoUtils'/" "$file"
      else
        # Add as new import after last import
        last_import_line=$(grep -n "^import" "$file" | tail -1 | cut -d: -f1)
        if [ -n "$last_import_line" ]; then
          sed -i "${last_import_line}a import { generateBlogPostingSchema } from '@/utils/seoUtils';" "$file"
        fi
      fi

      echo "  ✓ Added import"
    fi

  else
    echo "  ✗ File not found: $file"
  fi
done

echo ""
echo "Done! Import statements added to all files."
echo "Now you need to add the schema generation code and fragment wrappers manually or run the Python script again."
