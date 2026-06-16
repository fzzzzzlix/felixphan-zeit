const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fileUrl = 'file://' + path.resolve(__dirname, 'portfolio.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  // give web fonts a moment to finish applying
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) { await document.fonts.ready; } });
  await page.waitForTimeout(300);

  const headerTemplate = `
    <div style="font-family:'Inter',Arial,sans-serif; font-size:8px; color:#999999; width:100%; padding:0 20mm; display:flex; justify-content:space-between; box-sizing:border-box;">
      <span>FELIX PHAN &middot; PORTFOLIO 2026</span>
      <span>ZEIT MEDIA &middot; BIÊN TẬP VIÊN</span>
    </div>`;
  const footerTemplate = `
    <div style="font-family:'Inter',Arial,sans-serif; font-size:8px; color:#999999; width:100%; text-align:center;">
      <span class="pageNumber"></span>
    </div>`;

  await page.pdf({
    path: path.resolve(__dirname, 'output', 'Felix_Phan_Portfolio_Zeit_Media_2026.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    margin: { top: '26mm', bottom: '22mm', left: '20mm', right: '20mm' }
  });

  await browser.close();
  console.log('PDF generated.');
})();
