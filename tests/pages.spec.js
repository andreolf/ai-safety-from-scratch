import { test, expect } from '@playwright/test';
import { watchErrors, go, noOverflow, tapTargets } from './helpers.js';
const ROUTES = ['#/', '#/learn/00-01', '#/learn/01-03', '#/learn/02-01', '#/learn/03-06', '#/learn/04-01', '#/phase/p02', '#/test/p01', '#/progress', '#/glossary', '#/verify', '#/about', '#/labs', '#/lab/token-predictor', '#/certificate/foundations'];
for (const r of ROUTES) {
  test(`page ${r}: launched (no draft banner), sibling links, no overflow, no console errors, tap targets`, async ({ page }) => {
    const errs = watchErrors(page);
    await go(page, r);
    await expect(page.getByTestId('draft-banner')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('Draft preview');
    await expect(page.getByTestId('sibling-courses').locator('a')).toHaveCount(3);
    await noOverflow(page);
    await tapTargets(page);
    expect(errs).toEqual([]);
  });
}
test('launched: indexable, robots.txt allows all and points to the sitemap', async ({ page, request }) => {
  await go(page, '#/');
  await expect(page.locator('meta[name=robots]')).toHaveCount(0);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://andreolf.github.io/ai-safety-from-scratch/');
  const r = await request.get('./robots.txt'); expect(r.ok()).toBeTruthy(); const t = await r.text();
  expect(t).toMatch(/Allow: \//); expect(t).not.toMatch(/Disallow/); expect(t).toContain('Sitemap: https://andreolf.github.io/ai-safety-from-scratch/sitemap.xml');
  const sm = await request.get('./sitemap.xml'); expect(sm.ok()).toBeTruthy(); expect(await sm.text()).toContain('<loc>https://andreolf.github.io/ai-safety-from-scratch/</loc>');
});
test('shared footer: three columns, sibling links, tap targets, no underline at rest, disclosure verbatim', async ({ page }) => {
  await go(page, '#/');
  const foot = page.locator('footer.foot');
  await expect(foot.locator('.foot-h')).toHaveText(['This course', 'More from Scratch', 'About']);
  const sib = page.getByTestId('sibling-courses');
  for (const [name, url] of [['Security from Scratch', 'https://andreolf.github.io/security-from-scratch/'], ['Mechanical Engineering from Scratch', 'https://andreolf.github.io/mechanical-engineering-from-scratch/'], ['Mechatronics from Scratch', 'https://andreolf.github.io/mechatronics-from-scratch/']])
    await expect(sib.getByRole('link', { name })).toHaveAttribute('href', url);
  await expect(sib.getByRole('link', { name: /AI Safety from Scratch/ })).toHaveCount(0);
  const links = await foot.locator('.foot-list a').evaluateAll((as) => as.map((a) => ({ h: a.getBoundingClientRect().height, d: getComputedStyle(a).textDecorationLine, t: getComputedStyle(a.querySelector('.foot-link-t') || a).textDecorationLine })));
  expect(links.length).toBe(8);
  for (const l of links) { expect(l.h).toBeGreaterThanOrEqual(44); expect(l.d).toBe('none'); expect(l.t).toBe('none'); }
  await expect(foot).toContainText('This site is not an official MetaMask or Consensys product and is not endorsed by them, or by ETH Zurich, OWASP, any AI company or any government body. The agents-and-payments lessons (Phase 06) are written to be wallet-neutral. Where MetaMask is mentioned, it is one example among others, and the page says so.');
  await expect(page.locator('main')).not.toContainText('Sister course');
  await noOverflow(page);
});

test('Phase 06 shows the full disclosure note at the top', async ({ page }) => {
  await page.goto('./#/phase/p06');
  await expect(page.getByTestId('phase-disclosure')).toContainText('not an official MetaMask or Consensys product');
  await page.goto('./#/learn/06-01');
  await expect(page.locator('.prose blockquote, blockquote').first()).toContainText('Head of Developer Relations');
});
