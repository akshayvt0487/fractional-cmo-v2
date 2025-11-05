import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
async function updateBlogImagePaths() {
    const blogFiles = await glob('app/blog/**/page.tsx', { cwd: 'D:/DSIGNS/Fractional CMO/fractional-cmo-v3/fractional-cmo-v2' });
    for (const file of blogFiles) {
        const filePath = path.join('D:/DSIGNS/Fractional CMO/fractional-cmo-v3/fractional-cmo-v2', file);
        let content = await readFile(filePath, 'utf-8');
        // Find the image import
        const importRegex = /import\s+(\w+)\s+from\s+'@\/assets\/blog\/([\w-]+.jpg)';/;
        const match = content.match(importRegex);
        if (match) {
            const variableName = match[1];
            const fileName = match[2];
            const newPath = `/images/blog/${fileName}`;
            // Remove the import statement
            content = content.replace(importRegex, '');
            // Replace imageUrl in articleData
            const articleDataRegex = new RegExp(`imageUrl:\s*${variableName}`, 'g');
            content = content.replace(articleDataRegex, `imageUrl: '${newPath}'`);
            // Replace heroImage in the component
            const heroImageRegex = new RegExp(`heroImage={${variableName}}`, 'g');
            content = content.replace(heroImageRegex, `heroImage={'${newPath}'}`);
        }
        // Replace openGraph image url
        const ogImageRegex = /url:\s*`\${process.env.NEXT_PUBLIC_SITE_URL}\/assets\/blog\/([\w-]+.jpg)`/g;
        content = content.replace(ogImageRegex, 'url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/blog/$1`');
        // Replace twitter image url
        const twitterImageRegex = /images:\s*\[`\${process.env.NEXT_PUBLIC_SITE_URL}\/assets\/blog\/([\w-]+.jpg)`\]/g;
        content = content.replace(twitterImageRegex, 'images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/blog/$1`]');
        // Replace hardcoded image path in createMetadata
        const createMetadataImageRegex = /image:\s*"\/assets\/blog\/([\w-]+.jpg)"/g;
        content = content.replace(createMetadataImageRegex, 'image: "/images/blog/$1"');
        await writeFile(filePath, content, 'utf-8');
        console.log(`Updated image paths in ${file}`);
    }
}
updateBlogImagePaths().catch(console.error);
