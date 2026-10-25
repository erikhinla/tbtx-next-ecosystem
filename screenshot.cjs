const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 1080, height: 1920}});
  await page.goto('http://localhost:3000/proof', {waitUntil: 'networkidle'});
  await page.screenshot({ path: '/tmp/proof_app.png' });
  await browser.close();
})();
