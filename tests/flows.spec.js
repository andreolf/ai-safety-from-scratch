import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { watchErrors, go, seedPassedFoundations } from './helpers.js';

test('home shows phase map, points bar, mascot and counts', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/');
  await expect(page.getByTestId('phase-map')).toBeVisible();
  await expect(page.getByTestId('xp-bar').getByRole('progressbar')).toBeVisible();
  await expect(page.locator('.intern-tile svg').first()).toBeVisible();
  await expect(page.getByTestId('written-count')).toContainText('28');
  expect(errs).toEqual([]);
});

test('lesson: quiz feedback, complete for points, lab and kit image', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/01-03');
  await expect(page.locator('img.kit-img, .kit-img img').first()).toHaveAttribute('alt', /.+/);
  const q = page.getByTestId('question').first();
  await q.locator('[data-correct=true]').click();
  await expect(q.locator('.q-explain')).toContainText('Right.');
  await page.getByTestId('complete').click();
  await expect(page.getByTestId('xp-mini')).toContainText(/[1-9]\d* points/);
  // token predictor lab
  const text = page.getByTestId('tp-text'); const before = await text.textContent();
  await page.getByTestId('tp-gen').first().click();
  await expect(text).not.toHaveText(before);
  expect(errs).toEqual([]);
});

test('step-through figure: next/back changes the visible step', async ({ page }) => {
  await go(page, '#/learn/01-03');
  const fig = page.locator('figure.steps').first(); await fig.scrollIntoViewIfNeeded();
  const nav = fig.locator('.steps-nav'); await expect(nav).toBeVisible();
  await expect(nav.locator('.count')).toHaveText(/^1 of \d+/);
  await nav.locator('[data-next]').click(); await expect(nav.locator('.count')).toHaveText(/^2 of/);
  await nav.locator('[data-prev]').click(); await expect(nav.locator('.count')).toHaveText(/^1 of/);
  expect(await fig.locator('.step:not([hidden])').count()).toBe(1);
});

test('phase test: 10 questions, pass at 80% (8 right)', async ({ page }) => {
  await go(page, '#/test/p02');
  const qs = page.getByTestId('question'); await expect(qs).toHaveCount(10);
  for (let i = 0; i < 10; i++) await qs.nth(i).locator(i < 8 ? '[data-correct=true]' : '[data-correct=false]').first().click();
  await page.getByTestId('submit-test').click();
  await expect(page.getByTestId('test-result')).toHaveAttribute('data-pass', 'true');
  await expect(page.getByTestId('test-result')).toContainText('8 of 10');
});

test('phase test: 7 of 10 does not pass; retake draws a different set', async ({ page }) => {
  await go(page, '#/test/p03');
  const qs = page.getByTestId('question'); const first = await qs.evaluateAll((e) => e.map((x) => x.dataset.qid).join());
  for (let i = 0; i < 10; i++) await qs.nth(i).locator(i < 7 ? '[data-correct=true]' : '[data-correct=false]').first().click();
  await page.getByTestId('submit-test').click();
  await expect(page.getByTestId('test-result')).toHaveAttribute('data-pass', 'false');
  await page.getByTestId('retake').click(); await page.waitForTimeout(300);
  const second = await page.getByTestId('question').evaluateAll((e) => e.map((x) => x.dataset.qid).join());
  expect(second).not.toBe(first);
});

test('certificate: locked by default', async ({ page }) => {
  await go(page, '#/certificate/foundations');
  await expect(page.getByTestId('cert-locked')).toBeVisible();
});

test('certificate: PNG + PDF download, code matches an independent SHA-256, verify page accepts it', async ({ page }) => {
  const errs = watchErrors(page);
  await seedPassedFoundations(page);
  await go(page, '#/certificate/foundations');
  await page.getByTestId('cert-name').fill('Ada Lovelace');
  await expect(page.getByTestId('cert-canvas')).toHaveAttribute('data-ready', '1');
  const code = (await page.getByTestId('cert-code').textContent()).trim();
  expect(code).toMatch(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/);
  // independent recomputation
  const phases = Array.from({ length: 11 }, (_, i) => 'p' + String(i).padStart(2, '0')).join(',');
  const d = createHash('sha256').update(`AISFS-CERT-1|ada lovelace|foundations|${phases}|2026-10-26`).digest();
  const A = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; let bits = '', out = '';
  for (let i = 0; i < 10; i++) bits += d[i].toString(2).padStart(8, '0');
  for (let i = 0; i < 80; i += 5) out += A[parseInt(bits.slice(i, i + 5), 2)];
  expect(code.replace(/-/g, '')).toBe(out);
  // canvas must not be tainted (WebKit + SVG image)
  const ok = await page.getByTestId('cert-canvas').evaluate((c) => { try { return c.toDataURL('image/png').length > 10000; } catch { return false; } });
  expect(ok).toBe(true);
  const [png] = await Promise.all([page.waitForEvent('download'), page.getByTestId('cert-png').click()]);
  expect(png.suggestedFilename()).toMatch(/\.png$/);
  const [pdf] = await Promise.all([page.waitForEvent('download'), page.getByTestId('cert-pdf').click()]);
  expect(pdf.suggestedFilename()).toMatch(/\.pdf$/);
  const fs = await import('node:fs'); const p = await pdf.path(); expect(fs.readFileSync(p).subarray(0, 8).toString()).toContain('%PDF-1.4');
  await go(page, '#/verify');
  await page.getByTestId('v-name').fill('Ada Lovelace');
  await page.getByTestId('v-date').fill('2026-10-26');
  await page.getByTestId('v-code').fill(code.toLowerCase());
  await page.getByTestId('v-submit').click();
  await expect(page.getByTestId('v-out')).toHaveAttribute('data-ok', 'true');
  await page.getByTestId('v-name').fill('Ada Lovelaca'); await page.getByTestId('v-submit').click();
  await expect(page.getByTestId('v-out')).toHaveAttribute('data-ok', 'false');
  expect(errs).toEqual([]);
});

test('theme toggle switches dark/daylight, persists, and repaints from tokens', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await go(page, '#/');
  const html = page.locator('html'); await expect(html).toHaveAttribute('data-theme', 'dark');
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const darkBg = await bg();
  await page.getByTestId('theme-toggle').click();
  await expect(html).toHaveAttribute('data-theme', 'daylight');
  expect(await bg()).not.toBe(darkBg);
  expect(await page.locator('meta[name=theme-color]').getAttribute('content')).toMatch(/^#/);
  await page.reload(); await expect(html).toHaveAttribute('data-theme', 'daylight');
});

test('reduced motion: no running animations on step-through and mascot', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, '#/');
  await go(page, '#/learn/01-03');
  await page.locator('figure.steps [data-next]').first().click();
  const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && (a.effect?.getComputedTiming().duration || 0) > 50).length);
  expect(running).toBe(0);
});
