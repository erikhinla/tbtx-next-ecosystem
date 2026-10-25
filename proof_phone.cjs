const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/proof', {waitUntil: 'networkidle'});
  await page.screenshot({ path: '/tmp/proof_mobile_before.png', fullPage: true });
  await context.close();
  await browser.close();
})();
