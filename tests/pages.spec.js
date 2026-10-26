import { test, expect } from '@playwright/test';
import { watchErrors, go, noOverflow, tapTargets } from './helpers.js';
const ROUTES = ['#/', '#/learn/00-01', '#/learn/01-03', '#/learn/02-01', '#/learn/03-06', '#/learn/04-01', '#/phase/p02', '#/test/p01', '#/progress', '#/glossary', '#/verify', '#/about', '#/labs', '#/lab/token-predictor', '#/certificate/foundations'];
for (const r of ROUTES) {
  test(`page ${r}: banner, no overflow, no console errors, tap targets`, async ({ page }) => {
    const errs = watchErrors(page);
    await go(page, r);
    await expect(page.getByTestId('draft-banner')).toBeVisible();
    await expect(page.getByTestId('draft-banner')).toContainText('Draft preview');
    await noOverflow(page);
    await tapTargets(page);
    expect(errs).toEqual([]);
  });
}
test('robots: noindex, nofollow meta and robots.txt', async ({ page, request }) => {
  await go(page, '#/');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow');
  const r = await request.get('./robots.txt'); expect(r.ok()).toBeTruthy(); expect(await r.text()).toMatch(/Disallow: \//);
});
test('banner stays visible after scrolling', async ({ page }) => {
  await go(page, '#/learn/01-03');
  await page.evaluate(() => window.scrollTo(0, 3000)); await page.waitForTimeout(200);
  await expect(page.getByTestId('draft-banner')).toBeInViewport();
});

test('Phase 06 shows the full disclosure note at the top', async ({ page }) => {
  await page.goto('./#/phase/p06');
  await expect(page.getByTestId('phase-disclosure')).toContainText('not an official MetaMask or Consensys product');
  await page.goto('./#/learn/06-01');
  await expect(page.locator('.prose blockquote, blockquote').first()).toContainText('Head of Developer Relations');
});
