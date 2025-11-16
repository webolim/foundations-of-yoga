
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:8000');
    await page.screenshot({ path: 'verification.png' });
  } finally {
    await browser.close();
  }
})();
