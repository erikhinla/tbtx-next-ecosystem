const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 600, height: 1000}});
  await page.goto('file:///tmp/mockup.html');
  await page.waitForTimeout(500); // Wait for fonts to load
  await page.screenshot({ path: '/tmp/proof_mobile_redesign.png' });
  await browser.close();
})();
