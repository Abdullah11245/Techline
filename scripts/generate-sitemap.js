// This file should be run as a build script to generate sitemap.xml
// Usage: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://tline.ie';
const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/services/it-support-infrastructure', changefreq: 'monthly', priority: 0.9 },
  { path: '/services/cyber-security', changefreq: 'monthly', priority: 0.9 },
  { path: '/services/backup-business-continuity', changefreq: 'monthly', priority: 0.9 },
  { path: '/services/microsoft-365-collaboration', changefreq: 'monthly', priority: 0.9 },
  { path: '/services/telecom-cloud-telephony', changefreq: 'monthly', priority: 0.9 },
  { path: '/services/digital-services', changefreq: 'monthly', priority: 0.9 },
  { path: '/about', changefreq: 'yearly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.5 },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log('✓ Sitemap generated at public/sitemap.xml');
}

generateSitemap();
