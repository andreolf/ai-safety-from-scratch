// Lesson checker. Fails the build if a written lesson breaks the course rules.
// Per lesson: front matter, >= 3 quiz questions with valid answers and explanations, an exercise
// with a worked answer, at least one visual (figure, lab or intern scene), a "Sources" section with
// links, every external link listed in content/sources.json, valid lab/figure names, word count.
// Per phase (when fully written): >= 10 questions in the bank so the phase test can draw 10.
import fs from 'node:fs';
import path from 'node:path';
import { compile } from './build-lessons.mjs';
import { labs } from '../src/labs/meta.js';
import { SECURITY_URL } from '../src/config.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/curriculum.json'), 'utf8'));
const sources = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/sources.json'), 'utf8')).sources;
const norm = (u) => { try { const x = new URL(u); if (/youtube\.com$/.test(x.hostname)) return 'yt:' + x.searchParams.get('v'); return (x.hostname.replace(/^www\./, '') + x.pathname).replace(/\/$/, ''); } catch { return u; } };
const known = new Set(sources.map((s) => norm(s.url)));
const problems = []; const warn = []; let n = 0, flags = 0, words = 0;
const written = new Set();
for (const dir of fs.readdirSync(path.join(ROOT, 'lessons')).sort()) {
  for (const f of fs.readdirSync(path.join(ROOT, 'lessons', dir)).filter((x) => x.endsWith('.md')).sort()) {
    const file = `lessons/${dir}/${f}`; const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    let L; try { L = compile(src, file); } catch (e) { problems.push(`${file}: ${e.message}`); continue; }
    n++; written.add(L.id); flags += L.flags;
    const P = (m) => problems.push(`${file}: ${m}`);
    if (!/^\d\d-\d\d$/.test(L.id) || !f.startsWith(L.id)) P(`id ${L.id} does not match file name`);
    if (!L.minutes || !L.summary) P('front matter needs minutes and summary');
    if (L.quiz.length < 3) P(`only ${L.quiz.length} quiz questions (need 3)`);
    L.quiz.forEach((q) => { if (!(q.answer >= 0 && q.answer < q.options.length)) P(`${q.id}: answer index out of range`); if (!q.explain) P(`${q.id}: missing explanation`); if (q.options.length < 2) P(`${q.id}: needs 2+ options`); });
    if (L.used.exercises < 1) P('needs an exercise with a worked answer');
    const visualsN = L.used.figures.length + L.used.images.length + L.used.labs.length + L.used.interns;
    if (L.used.figures.length + L.used.images.length + L.used.labs.length < 1) P('needs at least one figure, infographic or lab');
    L.used.labs.forEach((l) => { if (!labs[l]?.ready) P(`lab ${l} is not implemented yet`); });
    const srcSec = src.split(/^## Sources/m)[1];
    if (!srcSec || !/https?:\/\//.test(srcSec)) P('needs a "## Sources" section with links');
    for (const u of L.links) { if (u.startsWith(SECURITY_URL)) continue; if (!known.has(norm(u))) P(`link not in content/sources.json (verify it first): ${u}`); }
    const w = src.replace(/^---[\s\S]*?---/, '').replace(/:::quiz[\s\S]*?:::end/g, '').split(/\s+/).length; words += w;
    if (w < 350) P(`only ${w} words; lessons must be complete, not outlines`);
    if (visualsN < 1) P('no visual');
  }
}
for (const p of curriculum.phases) {
  const ids = p.lessons.map((l) => l.id); const done = ids.filter((i) => written.has(i));
  if (done.length && done.length === ids.length) {
    const bank = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/generated', `quiz-${p.id}.json`), 'utf8'));
    const q = Object.values(bank).flat().length; if (q < 10) problems.push(`${p.id}: bank has ${q} questions, phase test needs 10`);
  } else if (done.length) warn.push(`${p.id}: ${done.length}/${ids.length} lessons written`);
}
if (warn.length) console.log(warn.join('\n'));
if (problems.length) { console.error(`\n${problems.length} problem(s):\n` + problems.join('\n')); process.exit(1); }
console.log(`check ok: ${n} lessons, ${words} words, ${flags} NEEDS SOURCED DATA flag(s)`);
