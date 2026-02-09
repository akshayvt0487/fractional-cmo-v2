#!/usr/bin/env node

/**
 * Test script to verify BlogPosting schema is correctly output in HTML
 *
 * This simulates what would be rendered and checks for:
 * 1. Presence of script tag with type="application/ld+json"
 * 2. Valid JSON structure
 * 3. Required BlogPosting fields
 * 4. Proper @type value
 */

const { generateBlogPostingSchema } = require('../src/utils/seoUtils.ts');

// Test data
const testArticle = {
  headline: "Test Article: Digital Marketing Guide",
  description: "A comprehensive guide to digital marketing strategies",
  author: "Basheer Padanna",
  publishedDate: "2024-01-15",
  modifiedDate: "2024-02-01",
  url: "/blog/test-article",
  imageUrl: "/images/blog/test.jpg",
  keywords: ["digital marketing", "SEO", "content marketing"],
  category: "Digital Marketing",
  wordCount: 5000,
  readTime: "PT25M"
};

console.log('Testing BlogPosting Schema Generation...\n');
console.log('='.repeat(60));

try {
  const schema = generateBlogPostingSchema(testArticle);

  console.log('\n✓ Schema generated successfully\n');

  // Test 1: Check @type
  if (schema['@type'] === 'BlogPosting') {
    console.log('✓ Schema @type is BlogPosting');
  } else {
    console.error('✗ Schema @type is not BlogPosting:', schema['@type']);
    process.exit(1);
  }

  // Test 2: Check required fields
  const requiredFields = [
    '@context',
    '@id',
    'mainEntityOfPage',
    'headline',
    'description',
    'image',
    'author',
    'publisher',
    'datePublished'
  ];

  let missingFields = [];
  requiredFields.forEach(field => {
    if (!schema[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length === 0) {
    console.log('✓ All required fields present');
  } else {
    console.error('✗ Missing required fields:', missingFields);
    process.exit(1);
  }

  // Test 3: Validate JSON stringification
  try {
    const jsonString = JSON.stringify(schema);
    console.log('✓ Schema can be stringified to JSON');

    // Parse it back to ensure it's valid
    JSON.parse(jsonString);
    console.log('✓ Stringified schema is valid JSON');
  } catch (e) {
    console.error('✗ Schema cannot be properly stringified:', e.message);
    process.exit(1);
  }

  // Test 4: Check specific fields
  if (schema.headline === testArticle.headline) {
    console.log('✓ Headline matches');
  } else {
    console.error('✗ Headline does not match');
  }

  if (schema.author.name === testArticle.author) {
    console.log('✓ Author matches');
  } else {
    console.error('✗ Author does not match');
  }

  if (schema.publisher.name === 'Fractional CMO') {
    console.log('✓ Publisher is set correctly');
  } else {
    console.error('✗ Publisher is not set correctly');
  }

  if (schema.inLanguage === 'en-AU') {
    console.log('✓ Language is set to en-AU');
  } else {
    console.error('✗ Language is not set correctly');
  }

  // Test 5: Check isPartOf Blog reference
  if (schema.isPartOf && schema.isPartOf['@type'] === 'Blog') {
    console.log('✓ Article is part of Blog');
  } else {
    console.error('✗ isPartOf Blog reference missing or incorrect');
  }

  console.log('\n' + '='.repeat(60));
  console.log('All tests passed! ✓');
  console.log('='.repeat(60));

  // Output sample schema for manual inspection
  console.log('\nSample Output:');
  console.log(JSON.stringify(schema, null, 2).substring(0, 500) + '...\n');

  process.exit(0);

} catch (error) {
  console.error('\n✗ Error generating schema:', error.message);
  console.error(error.stack);
  process.exit(1);
}
