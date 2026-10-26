import { test, expect } from '@playwright/test';
import { watchErrors, go } from './helpers.js';
import { PRACTICALS, practicalCode } from '../practice-app/practicals.mjs';
// Builder certificate end to end: the six practical codes go into the lab, the Phase 11 test is taken for real,
// the certificate unlocks, and the verify page accepts its code (and rejects it for the other credential).
const todayIn = (page) => page.evaluate(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; });

test('Builder certificate end to end: six practical codes, Phase 11 test, certificate, verify', async ({ page }) => {
  const errs = watchErrors(page);
  await go(page, '#/certificate/builder');
  await expect(page.getByTestId('cert-locked')).toContainText('0 of 6 done');
  await go(page, '#/learn/11-01');
  const lab = page.getByTestId('lab-builder-tools');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  // A wrong code is refused.
  await lab.getByTestId('bt-code-setup').fill('AAAA-AAAA');
  await lab.getByTestId('bt-check-setup').click();
  await expect(lab.locator('[data-practical="setup"]')).toHaveAttribute('data-done', 'false');
  for (const p of PRACTICALS) {
    const code = await practicalCode(p.id);
    await lab.getByTestId(`bt-code-${p.id}`).fill(p.id === 'guard' ? code.toLowerCase().replace('-', ' ') : code);
    await lab.getByTestId(`bt-check-${p.id}`).click();
    await expect(lab.locator(`[data-practical="${p.id}"]`)).toHaveAttribute('data-done', 'true');
  }
  await expect(page.getByTestId('lab-builder-tools-score')).toHaveText('6/6');
  // Practicals alone are not enough.
  await go(page, '#/certificate/builder');
  await expect(page.getByTestId('cert-locked')).toContainText('6 of 6 done');
  await expect(page.getByTestId('cert-locked')).toContainText('not passed yet');
  // Take the Phase 11 test for real.
  await go(page, '#/test/p11');
  const qs = page.getByTestId('question'); await expect(qs).toHaveCount(10);
  for (let i = 0; i < 10; i++) await qs.nth(i).locator('[data-correct=true]').first().click();
  await page.getByTestId('submit-test').click();
  await expect(page.getByTestId('test-result')).toHaveAttribute('data-pass', 'true');
  await expect(page.getByTestId('test-result')).toContainText('Builder certificate is ready');
  await page.getByTestId('get-cert').click();
  await expect(page).toHaveURL(/#\/certificate\/builder$/);
  await page.getByTestId('cert-name').fill('Alan Turing');
  await expect(page.getByTestId('cert-canvas')).toHaveAttribute('data-ready', '1');
  const code = (await page.getByTestId('cert-code').textContent()).trim();
  expect(code).toMatch(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/);
  const [png] = await Promise.all([page.waitForEvent('download'), page.getByTestId('cert-png').click()]);
  expect(png.suggestedFilename()).toBe('ai-safety-from-scratch-builder-certificate.png');
  const today = await todayIn(page);
  await go(page, '#/verify');
  await page.getByTestId('v-name').fill('alan  turing');
  await page.getByTestId('v-key').selectOption('builder');
  await page.getByTestId('v-date').fill(today);
  await page.getByTestId('v-code').fill(code);
  await page.getByTestId('v-submit').click();
  await expect(page.getByTestId('v-out')).toHaveAttribute('data-ok', 'true');
  await page.getByTestId('v-key').selectOption('foundations'); await page.getByTestId('v-submit').click();
  await expect(page.getByTestId('v-out')).toHaveAttribute('data-ok', 'false');
  // Progress lists the Builder certificate as unlocked.
  await go(page, '#/progress');
  await expect(page.locator('a[href="#/certificate/builder"]')).toHaveText('Builder');
  expect(errs).toEqual([]);
});

test('Builder practicals lab: codes survive a reload and the lab is on the Labs page', async ({ page }) => {
  await go(page, '#/labs#lab-15');
  const lab = page.getByTestId('lab-builder-tools');
  await expect(lab).toHaveAttribute('data-lab-ready', '1');
  await lab.getByTestId('bt-code-evals').fill(await practicalCode('evals'));
  await lab.getByTestId('bt-check-evals').click();
  await page.reload(); await page.waitForTimeout(300);
  await expect(page.getByTestId('lab-builder-tools').locator('[data-practical="evals"]')).toHaveAttribute('data-done', 'true');
  await expect(page.getByTestId('lab-builder-tools-score')).toHaveText('1/6');
});
