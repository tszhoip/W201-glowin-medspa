import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const routes = ['/', '/services', '/about', '/contact', '/treatments/lifting'];
for (const r of routes) {
  await page.goto(`http://localhost:4173${r}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/glowin${r.replace(/\//g,'_') || '_home'}.png`, fullPage: false });
}
await browser.close();
