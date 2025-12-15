const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const base = path.join(__dirname, '..', 'app', 'services');
const allFiles = walk(base).filter(f => f.endsWith('page.tsx'));
const missing = [];

allFiles.forEach(f => {
  const txt = fs.readFileSync(f, 'utf8');
  if (!/export\s+const\s+metadata\s*:|generateMetadata\(/.test(txt)) {
    missing.push(f);
  }
});

console.log('Scanned files count:', allFiles.length);
if (missing.length === 0) {
  console.log('No missing metadata files.');
} else {
  console.log('Files missing metadata/generateMetadata:');
  missing.forEach(f => console.log(' -', f));
}
