import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { hash32, shuffledIdx } from '../src/util.js';
import { score } from '../src/labs/lab-confident-parrot.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

test('deterministic shuffle: same key, same order; valid permutation; keys differ', () => {
  assert.equal(hash32('abc'), hash32('abc'));
  const a = shuffledIdx(10, 'p01|0'), b = shuffledIdx(10, 'p01|0');
  assert.deepEqual(a, b);
  assert.deepEqual([...a].sort((x, y) => x - y), [...Array(10).keys()]);
  const orders = new Set(Array.from({ length: 20 }, (_, i) => shuffledIdx(10, 'k' + i).join(',')));
  assert.ok(orders.size > 15, 'different keys should usually give different orders');
});

test('Confident Parrot scoring matches the lesson text', () => {
  const acc = score('accuracy', 0.75), pen = score('penalty', 0.75);
  const val = (r) => (typeof r === 'number' ? r : r.s ?? r.score);
  assert.equal(val(acc.guesser), 5); assert.equal(val(acc.honest), 4);
  assert.equal(val(pen.guesser), 0); assert.equal(val(pen.honest), 4);
});

// --- tokens: contrast and banned colours ---
function parseBlock(css, selector) {
  const i = css.indexOf(selector + ' {'); const j = css.indexOf('}', i);
  const out = {}; for (const m of css.slice(i, j).matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim(); return out;
}
const lum = (hex) => { const n = hex.replace('#', ''); const c = [0, 2, 4].map((k) => parseInt(n.slice(k, k + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

test('body text contrast is at least 7:1 in both themes (WCAG AAA)', () => {
  const css = read('src/styles/tokens.css');
  const dark = parseBlock(css, ':root'); const day = { ...dark, ...parseBlock(css, "[data-theme=\"daylight\"]") };
  for (const [name, t] of [['dark', dark], ['daylight', day]]) {
    for (const bg of ['--bg', '--surface', '--surface-2']) {
      assert.ok(ratio(t['--fg'], t[bg]) >= 7, `${name} fg on ${bg}: ${ratio(t['--fg'], t[bg]).toFixed(2)}`);
      assert.ok(ratio(t['--muted-strong'], t[bg]) >= 7, `${name} muted-strong on ${bg}: ${ratio(t['--muted-strong'], t[bg]).toFixed(2)}`);
    }
    assert.ok(ratio(t['--on-accent'], t['--accent']) >= 7, `${name} on-accent on accent`);
  }
});

test('banned brand colours never appear in the source', () => {
  const banned = ['#FA4B00', '#C66EF5', '#B9F302', '#73A6FF'];
  const files = execFileSync('git', ['ls-files', 'src', 'index.html', 'public', 'content', 'lessons'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter((f) => /\.(js|mjs|css|html|svg|json|md)$/.test(f));
  for (const f of files) { const t = read(f).toUpperCase(); for (const b of banned) assert.ok(!t.includes(b), `${b} found in ${f}`); }
});

test('theme guard passes: no colours or fonts outside tokens.css', () => {
  execFileSync('node', ['scripts/check-tokens.mjs'], { cwd: ROOT, stdio: 'pipe' });
});

test('every launched lesson ID still exists or redirects (old links, progress and certificates keep working)', () => {
  const c = JSON.parse(read('content/curriculum.json'));
  const ids = new Set(c.phases.flatMap((p) => p.lessons.map((l) => l.id)));
  const { moves } = JSON.parse(read('content/id-moves.json'));
  const legacy = JSON.parse(read('content/legacy-ids.json')).lessons;
  assert.equal(legacy.length, 72);
  for (const l of legacy) assert.ok(ids.has(l.id) || ids.has(moves[l.id]), `${l.id} (${l.title}) is gone and has no redirect`);
  for (const [from, to] of Object.entries(moves)) { assert.ok(!ids.has(from), `${from} still exists, so it should not redirect`); assert.ok(ids.has(to), `${from} redirects to missing ${to}`); }
  for (const id of ids) assert.match(id, /^\d\d-\d\d$/);
  const phaseIds = c.phases.map((p) => p.id);
  assert.deepEqual(phaseIds, Array.from({ length: 12 }, (_, i) => 'p' + String(i).padStart(2, '0')), 'phase IDs are part of certificate codes and must not change');
});

test('launched: no noindex, no draft banner, robots.txt allows all, sitemap present', () => {
  assert.doesNotMatch(read('index.html'), /noindex|nofollow/);
  assert.doesNotMatch(read('index.html'), /draft-banner|Draft preview/);
  assert.match(read('public/robots.txt'), /User-agent: \*\s+Allow: \//);
  assert.doesNotMatch(read('public/robots.txt'), /Disallow/);
  assert.match(read('public/sitemap.xml'), /<loc>https:\/\/andreolf\.github\.io\/ai-safety-from-scratch\/<\/loc>/);
});

// "XP" reads like a crypto token: user-facing text says "points". Internal keys (store.xp, data-xp-*) may stay.
test('no "XP" in user-facing text (built HTML/JSON/JS strings, lessons, content, README)', () => {
  const hits = [];
  const walk = (dir, exts) => { if (!fs.existsSync(path.join(ROOT, dir))) return [];
    return fs.readdirSync(path.join(ROOT, dir), { recursive: true }).map(String).filter((f) => exts.some((x) => f.endsWith(x))).map((f) => path.join(dir, f)); };
  const plain = [...walk('dist', ['.html', '.json', '.txt', '.webmanifest']), ...walk('src/generated', ['.json', '.html']), ...walk('content', ['.json']), ...walk('lessons', ['.md']), 'README.md', 'index.html'];
  for (const f of plain) if (fs.existsSync(path.join(ROOT, f))) { const m = read(f).match(/\bXP\b/); if (m) hits.push(`${f}: …${read(f).slice(Math.max(0, m.index - 30), m.index + 10)}…`); }
  // In bundled JS, "XP" as visible text appears next to a space, a tag edge or a quote, unlike an identifier.
  for (const f of walk('dist', ['.js'])) { const m = read(f).match(/[\s>]XP(?=[\s<`'"])/); if (m) hits.push(`${f}: …${read(f).slice(Math.max(0, m.index - 30), m.index + 10)}…`); }
  assert.deepEqual(hits, [], 'say "points", not "XP"');
});
