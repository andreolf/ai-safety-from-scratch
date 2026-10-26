import { test } from '@playwright/test';
import { go } from './helpers.js';
// Writes screenshots/<project>-<page>-<theme>.png. Run: npm run shots (with the preview server running).
// [name, hash, fullPage, seed]: seed 'certs' marks every phase test and practical as done, to show an earned certificate.
const PAGES = [
  ['home', '#/', true], ['lesson-01-03', '#/learn/01-03', false], ['lesson-03-06', '#/learn/03-06', false], ['phase-p02', '#/phase/p02', true],
  ['progress', '#/progress', true], ['labs', '#/labs', false], ['lesson-10-04', '#/learn/10-04', false], ['lesson-11-05', '#/learn/11-05', false],
  ['phase-p11', '#/phase/p11', true], ['certificate-builder', '#/certificate/builder', false, 'certs'], ['verify', '#/verify', true],
];
for (const theme of ['dark', 'daylight']) for (const [name, hash, full, seed] of PAGES) {
  test(`shot ${name} ${theme}`, async ({ page }, info) => {
    if (!['desktop', 'iphone-14', 'android-360'].includes(info.project.name)) test.skip();
    await page.addInitScript(([t, seed]) => {
      localStorage.setItem('aisfs-theme', t);
      if (seed === 'certs') {
        const tests = {}; for (let i = 0; i <= 11; i++) tests['p' + String(i).padStart(2, '0')] = { best: 1, passed: true, date: '2026-10-26', attempts: 1 };
        const practicals = Object.fromEntries(['setup', 'redteam', 'guard', 'tools', 'code', 'evals'].map((k) => [k, '2026-10-26']));
        localStorage.setItem('aisfs-v1', JSON.stringify({ v: 1, xp: 0, lessons: {}, quiz: {}, tests, days: [], name: 'Ada Lovelace', certs: {}, labs: {}, practicals, last: null }));
      }
    }, [theme, seed]);
    await go(page, hash); await page.waitForTimeout(seed ? 1200 : 400);
    await page.screenshot({ path: `screenshots/${info.project.name}-${name}-${theme}.png`, fullPage: full });
  });
}
