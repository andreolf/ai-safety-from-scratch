import { test, expect } from '@playwright/test';
import { watchErrors, go, noOverflow, tapTargets } from './helpers.js';
// Labs page: every lab playable inline, lazy-mounted, with a mini-nav and #/labs#lab-NN anchors.

test('labs page: inline sections, mini-nav, locked teasers, lazy mount, no overflow', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/labs');
  const nav = page.getByTestId('lab-nav');
  await expect(nav.locator('a')).toHaveCount(15);
  await expect(page.locator('.lab-section:not(.is-locked)')).toHaveCount(9);
  await expect(page.locator('.lab-section.is-locked')).toHaveCount(6);
  await expect(page.getByTestId('labsec-reward-designer')).toContainText('Coming with');
  // The first lab is live in place; a far-away lab has not been loaded yet.
  await expect(page.getByTestId('lab-risk-sorter')).toHaveAttribute('data-lab-ready', '1');
  await expect(page.locator('[data-slot="agent-permissions"]')).toHaveAttribute('data-mounted', '0');
  const navSizes = await nav.locator('a').evaluateAll((as) => as.map((a) => { const r = a.getBoundingClientRect(); return Math.min(r.width, r.height); }));
  expect(Math.min(...navSizes)).toBeGreaterThanOrEqual(43.5);
  await noOverflow(page); await tapTargets(page);
  expect(errs).toEqual([]);
});

test('labs page: mini-nav jumps to a lab, which plays inline without leaving the page', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/labs');
  await page.getByTestId('lab-nav').locator('a[data-jump="lab-07"]').click();
  await expect(page).toHaveURL(/#\/labs#lab-07$/);
  const sec = page.getByTestId('labsec-fake-inbox');
  await expect(sec.getByTestId('lab-fake-inbox')).toHaveAttribute('data-lab-ready', '1');
  await expect(sec).toBeInViewport();
  await sec.getByTestId('inbox-run').click();
  await expect(sec.getByTestId('inbox-out')).toHaveAttribute('data-verdict', 'bad');
  await page.getByTestId('lab-nav').locator('a[data-jump="lab-08"]').click();
  const sw = page.getByTestId('labsec-trifecta-switchboard');
  await expect(sw.getByTestId('lab-trifecta-switchboard')).toHaveAttribute('data-lab-ready', '1');
  await sw.getByTestId('sw-run').click();
  await expect(sw.getByTestId('sw-out')).toHaveAttribute('data-result', 'stolen');
  await expect(page).toHaveURL(/#\/labs#lab-08$/);
  await noOverflow(page);
  expect(errs).toEqual([]);
});

test('labs page: deep link lands on the lab and stays there (no layout shift)', async ({ page }) => {
  await go(page, '#/labs#lab-09');
  const sec = page.getByTestId('labsec-agent-permissions');
  await expect(sec.getByTestId('lab-agent-permissions')).toHaveAttribute('data-lab-ready', '1');
  await page.waitForTimeout(700);
  const top1 = await sec.evaluate((e) => e.getBoundingClientRect().top);
  await page.waitForTimeout(700);
  const top2 = await sec.evaluate((e) => e.getBoundingClientRect().top);
  expect(top1).toBeGreaterThanOrEqual(0); expect(top1).toBeLessThan(400);
  expect(Math.abs(top2 - top1)).toBeLessThan(2);
  // The simulator works inline: an allowlist plus a 50-credit cap stops the poisoned invoice.
  await sec.getByTestId('perm-anyone').uncheck();
  await sec.getByTestId('perm-cap').fill('50');
  await sec.getByTestId('perm-run').click();
  await expect(sec.getByTestId('perm-out')).toHaveAttribute('data-lost', '0');
  await expect(sec.getByTestId('perm-out')).toHaveAttribute('data-legit', '5');
});

test('labs page: no scroll traps inside labs; off-screen labs are paused', async ({ page }) => {
  await go(page, '#/labs');
  for (const n of ['01', '05', '09']) await page.getByTestId('lab-nav').locator(`a[data-jump="lab-${n}"]`).click();
  await page.waitForTimeout(400);
  const traps = await page.evaluate(() => [...document.querySelectorAll('.lab-section *')].filter((e) => { const cs = getComputedStyle(e); return /(auto|scroll)/.test(cs.overflowY) && e.scrollHeight > e.clientHeight + 1; }).map((e) => e.className));
  expect(traps).toEqual([]);
  await expect(page.getByTestId('labsec-risk-sorter')).toHaveClass(/paused/);
});

test('lessons keep their labs and deep-link to the Labs page section', async ({ page }) => {
  await go(page, '#/learn/01-03');
  const link = page.getByTestId('lab-token-predictor-all');
  await expect(link).toHaveAttribute('href', '#/labs#lab-02');
  await link.click();
  await expect(page.getByTestId('labsec-token-predictor')).toBeInViewport();
});
