import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { watchErrors, go, seedPassedFoundations } from './helpers.js';

test('home shows phase map, points bar, mascot and counts', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/');
  await expect(page.getByTestId('phase-map')).toBeVisible();
  await expect(page.getByTestId('xp-bar').getByRole('progressbar')).toBeVisible();
  await expect(page.locator('.intern-tile svg').first()).toBeVisible();
  await expect(page.getByTestId('written-count')).toContainText('54');
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

test('Fake Inbox in lesson 04-07: fooled without defences, safe with the send tool removed', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/04-07');
  const lab = page.getByTestId('lab-fake-inbox');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  await lab.getByTestId('inbox-run').click();
  await expect(lab.getByTestId('inbox-out')).toHaveAttribute('data-verdict', 'bad');
  await lab.getByTestId('mail-news').click();
  await lab.getByTestId('def-nosend').check();
  await lab.getByTestId('inbox-run').click();
  await expect(lab.getByTestId('inbox-out')).toHaveAttribute('data-verdict', 'good');
  await expect(lab.getByTestId('lab-fake-inbox-score')).toHaveText('3/3');
  expect(errs).toEqual([]);
});

test('Trifecta Switchboard in lesson 05-03: stolen with all three, blocked with one off', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/05-03');
  const lab = page.getByTestId('lab-trifecta-switchboard');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  await lab.getByTestId('sw-run').click();
  await expect(lab.getByTestId('sw-out')).toHaveAttribute('data-result', 'stolen');
  for (const k of ['data', 'untrusted', 'out']) {
    await lab.getByTestId(`sw-switch-${k}`).click();
    await lab.getByTestId('sw-run').click();
    await expect(lab.getByTestId('sw-out')).toHaveAttribute('data-result', 'blocked');
    await lab.getByTestId(`sw-switch-${k}`).click();
  }
  await expect(lab.getByTestId('lab-trifecta-switchboard-score')).toHaveText('3/3 blocks found');
  expect(errs).toEqual([]);
});

test('Agent Permission Simulator in lesson 06-05: poisoned invoice paid without limits, stopped by an allowlist', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/06-05');
  const lab = page.getByTestId('lab-agent-permissions');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  await lab.getByTestId('perm-run').click();
  await expect(lab.getByTestId('perm-out')).not.toHaveAttribute('data-lost', '0');
  await lab.getByTestId('perm-anyone').uncheck();
  await lab.getByTestId('perm-ask').fill('50');
  await lab.getByTestId('perm-run').click();
  await expect(lab.getByTestId('perm-out')).toHaveAttribute('data-lost', '0');
  await expect(lab.getByTestId('perm-out')).toHaveAttribute('data-legit', '5');
  await expect(lab.locator('tr[data-res="declined"]')).toHaveCount(1);
  expect(errs).toEqual([]);
});

for (const p of ['p04', 'p05', 'p06', 'p07', 'p08']) test(`phase test ${p}: 10 questions drawn and passable`, async ({ page }) => {
  await go(page, `#/test/${p}`);
  const qs = page.getByTestId('question'); await expect(qs).toHaveCount(10);
  for (let i = 0; i < 10; i++) await qs.nth(i).locator('[data-correct=true]').first().click();
  await page.getByTestId('submit-test').click();
  await expect(page.getByTestId('test-result')).toHaveAttribute('data-pass', 'true');
});

test('Security cross-links: written lessons link out, unwritten ones say Coming soon', async ({ page }) => {
  await go(page, '#/learn/03-02');
  const nav = page.locator('nav.xlink');
  await expect(nav.locator('a[data-xlink="security"][href*="#/learn/01-07"]')).toBeVisible();
  await expect(nav.locator('a[data-xlink="security"][href*="#/learn/01-01"]')).toBeVisible();
  const soon = nav.locator('[data-xlink="security-soon"]');
  await expect(soon).toContainText('09.01');
  await expect(soon).toContainText('Coming soon');
  await expect(nav.locator('a[href*="#/learn/09-01"]')).toHaveCount(0);
});

test('Reward Designer in lesson 07-03: boat circles with default points, finishes after re-designing the reward', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/07-03');
  const lab = page.getByTestId('lab-reward-designer');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  const out = lab.getByTestId('rd-out');
  await expect(out).toHaveAttribute('data-pick', 'loop');
  await lab.getByTestId('rd-target').fill('2');
  await lab.getByTestId('rd-finish').fill('100');
  await expect(out).toHaveAttribute('data-pick', 'race');
  await expect(lab.getByTestId('rd-row-race')).toContainText('112');
  await lab.getByTestId('rd-target').fill('0'); await lab.getByTestId('rd-finish').fill('0');
  await expect(out).toHaveAttribute('data-pick', 'idle');
  await expect(lab.getByTestId('lab-reward-designer-score')).toHaveText('3/3 behaviours seen');
  expect(errs).toEqual([]);
});

test('Feature Dial in lesson 08-02: replies drift to the bridge as the feature is turned up', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/08-02');
  const lab = page.getByTestId('lab-feature-dial');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  await expect(lab.getByTestId('fd-reply')).toHaveAttribute('data-tier', '0');
  await expect(lab.getByTestId('fd-reply')).not.toContainText('Golden Gate');
  for (const k of ['spend', 'story', 'look']) {
    await lab.getByTestId(`fd-prompt-${k}`).click();
    await lab.getByTestId('fd-dial').fill('10');
    await expect(lab.getByTestId('fd-reply')).toHaveAttribute('data-tier', '3');
  }
  await expect(lab.getByTestId('lab-feature-dial-score')).toHaveText('3/3 prompts taken over');
  expect(errs).toEqual([]);
});

test('Build-an-Eval in lesson 08-03: the test design decides the winner', async ({ page }) => {
  const errs = watchErrors(page); await go(page, '#/learn/08-03');
  const lab = page.getByTestId('lab-build-an-eval');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  const out = lab.getByTestId('ev-out');
  await expect(out).toHaveAttribute('data-winner', 'crammer');
  for (const id of ['f1', 'f2', 'f3', 'f4']) await lab.getByTestId(`ev-q-${id}`).check();
  await expect(out).toHaveAttribute('data-winner', 'tie');
  await lab.getByTestId('ev-wrong').selectOption('-1');
  await expect(out).toHaveAttribute('data-winner', 'careful');
  await expect(lab.getByTestId('ev-row-careful')).toContainText('5');
  expect(errs).toEqual([]);
});
