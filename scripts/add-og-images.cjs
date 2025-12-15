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
const files = walk(base).filter(f => f.endsWith('page.tsx'));
let changed = 0;

files.forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  if (/openGraph\s*:\s*\{/.test(txt) && !/openGraph[\s\S]*?images\s*:\s*\[/.test(txt)) {
    // insert images line after the url line inside openGraph
    txt = txt.replace(/(openGraph\s*:\s*\{[\s\S]*?url\s*:\s*['\"].*?['\"],)/, `$1\n    images: [defaultImage],`);

    // ensure defaultImage is imported from data module
    if (!/defaultImage/.test(txt)) {
      // try to find an import from '@/data/serviceData'
      if (/from '\/\@\/data\/serviceData'/.test(txt)) {
        txt = txt.replace(/(from '\/\@\/data\/serviceData')/, `, defaultImage $1`);
      } else if (/from "\/@\/data\/serviceData"/.test(txt)) {
        txt = txt.replace(/(from "\/@\/data\/serviceData")/, `, defaultImage $1`);
      } else {
        // add a new import
        txt = `import { defaultImage } from '@/data/serviceData';\n` + txt;
      }
    }

    fs.writeFileSync(f, txt, 'utf8');
    changed++;
    console.log('Patched', f);
  }
});

console.log('Files scanned:', files.length, 'Patched:', changed);
