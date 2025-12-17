import fs from 'fs';
import path from 'path';

const blogDirs = [
  'accounting-growth-strategy',
  'b2b-lead-generation',
  'bricklayers-growth-marketing-strategy',
  'bricklayers-lead-generation',
  'buyers-agents-digital-marketing',
  'buyers-agents-lead-generation',
  'buyers-agents-seo',
  'finance-broker-digital-marketing',
  'finance-broker-google-ads',
  'finance-broker-lead-generation',
  'painters-lead-generation-strategy',
  'removalist-meta-ads-strategy',
  'removalist-seo-strategy',
  'security-lead-generation-strategy'
];

function extractComponentName(content) {
  const match = content.match(/const (\w+) = \(\) => \{/);
  return match ? match[1] : null;
}

function extractConvertDateFormat(content) {
  const match = content.match(/(const convertDateFormat = \(dateString: string\): string => \{[\s\S]*?\};)/);
  return match ? match[1] : null;
}

function extractArticleData(content) {
  const match = content.match(/^const articleData = \{[\s\S]*?\};/m);
  if (!match) return null;
  return match[0];
}

function extractFaqs(content) {
  const match = content.match(/^const faqs = \[[\s\S]*?\];/m);
  if (!match) return null;
  return match[0];
}

function fixFile(file, dir) {
  console.log(`\nProcessing: ${dir}`);
  let content = fs.readFileSync(file, 'utf-8');
  
  const convertDateFormat = extractConvertDateFormat(content);
  const articleData = extractArticleData(content);
  const faqs = extractFaqs(content);
  const componentName = extractComponentName(content);
  
  if (!articleData || !componentName) {
    console.log('  ✗ Could not find articleData or component');
    return;
  }
  
  // Check if articleData is already inside component (has proper indentation)
  if (content.match(/const \w+ = \(\) => \{[\s\S]*?const articleData/)) {
    console.log('  ✓ Already fixed');
    return;
  }
  
  // Remove module-level articleData and faqs
  content = content.replace(/^const articleData = \{[\s\S]*?\};\n/m, '');
  content = content.replace(/^const faqs = \[[\s\S]*?\];\n/m, '');
  
  // Add them inside the component after the post retrieval check
  const componentPattern = new RegExp(
    `(const ${componentName} = \\(\\) => \\{\\s*const post = blogPosts\\.find[^}]*?\\}\\s*)`
  );
  
  const replacement = `$1\n  const articleData = ${articleData.replace(/^const articleData = /, '').replace(/;$/, '')};\n\n  ${faqs};\n`;
  
  if (!componentPattern.test(content)) {
    console.log('  ✗ Could not find component pattern to insert into');
    return;
  }
  
  content = content.replace(componentPattern, replacement);
  
  fs.writeFileSync(file, content, 'utf-8');
  console.log('  ✓ Fixed');
}

blogDirs.forEach(dir => {
  const file = path.join('app', 'blog', dir, 'page.tsx');
  if (fs.existsSync(file)) {
    fixFile(file, dir);
  } else {
    console.log(`  ✗ File not found: ${file}`);
  }
});

console.log('\n✅ Done!');
