
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:8000');
    // Wait for the first accordion to be visible, then click it
    await page.waitForSelector('.accordion');
    await page.click('.accordion');
    await page.screenshot({ path: 'verification.png' });
  } finally {
    await browser.close();
  }
})();
