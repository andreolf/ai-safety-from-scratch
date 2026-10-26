import { test } from '@playwright/test';
import { go } from './helpers.js';
// Writes screenshots/<project>-<page>-<theme>.png. Run: npm run shots
const PAGES = [['home', '#/'], ['lesson-01-03', '#/learn/01-03'], ['lesson-03-06', '#/learn/03-06'], ['phase-p02', '#/phase/p02'], ['progress', '#/progress']];
for (const theme of ['dark', 'daylight']) for (const [name, hash] of PAGES) {
  test(`shot ${name} ${theme}`, async ({ page }, info) => {
    if (!['desktop', 'iphone-14', 'android-360'].includes(info.project.name)) test.skip();
    await page.addInitScript((t) => localStorage.setItem('aisfs-theme', t), theme);
    await go(page, hash); await page.waitForTimeout(400);
    await page.screenshot({ path: `screenshots/${info.project.name}-${name}-${theme}.png`, fullPage: name !== 'lesson-01-03' && name !== 'lesson-03-06' });
  });
}
