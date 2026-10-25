const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: {width: 1400, height: 900}});
  await page.goto('file:///tmp/mockup_desktop.html');
  await page.waitForTimeout(500); 
  await page.screenshot({ path: '/tmp/proof_desktop_redesign.png' });
  await browser.close();
})();
