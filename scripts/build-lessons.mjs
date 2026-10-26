// Compile lessons/pNN/*.md into src/generated/lessons/<id>.json, quiz banks and an index.
// Custom blocks (each closed by :::end unless noted):
//   :::figure <name>            build-time SVG from src/visuals/registry.js, caption = body
//   :::lab <name> [k=v ...]     single line; hydrated by src/labs/index.js, text alternative baked in
//   :::intern <pose>            mascot scene; body = story, a line "---" then the lesson learned
//   :::source url="" by="" date=""   quoted, linked fact; body = the quote
//   :::callout <key|note|warn> Title
//   :::exercise Title  ...  :::solution  ...  :::end
//   :::quiz  (YAML list: q, options, answer, explain, why?)
//   :::xlink  (lines "security 01.01 | Title" or "lesson 02-01 | Title")
// Inline: [[NEEDS SOURCED DATA]] -> flag, [[term:id]] or [[term:id|label]] -> glossary link.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import * as yaml from 'js-yaml';
import { visuals, renderVisual, internSVG } from '../src/visuals/registry.js';
import { labs } from '../src/labs/meta.js';
import { securityLesson } from '../src/config.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'src/generated');
const curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/curriculum.json'), 'utf8'));
const glossary = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/glossary.json'), 'utf8'));
const gl = new Map(glossary.terms.map((t) => [t.id, t]));
const kit = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/kit-images.json'), 'utf8'));
const secLessons = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'content/security-lessons.json'), 'utf8')).lessons.map((l) => [l.id, l]));
const titles = new Map(curriculum.phases.flatMap((p) => p.lessons.map((l) => [l.id, { ...l, phase: p.id }])));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const attrs = (s) => Object.fromEntries([...String(s || '').matchAll(/(\w+)=("([^"]*)"|\S+)/g)].map((m) => [m[1], m[3] ?? m[2]]));
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const errors = [];

function inline(md) {
  return md
    .replace(/\[\[NEEDS SOURCED DATA\]\]/g, '<span class="flag">NEEDS SOURCED DATA</span>')
    .replace(/\[\[term:([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, id, label) => {
      const t = gl.get(id); if (!t) { errors.push(`unknown glossary term ${id}`); return label || id; }
      return `<a class="term" href="#/glossary#${id}" title="${esc(t.short)}">${esc(label || t.term)}</a>`;
    });
}
const md = (s) => marked.parse(inline(s));

export function compile(src, file) {
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/); if (!fm) throw new Error(`${file}: missing front matter`);
  const meta = yaml.load(fm[1]); const body = src.slice(fm[0].length);
  const lines = body.split('\n'); const html = []; let buf = []; const quiz = []; const used = { figures: [], images: [], labs: [], interns: 0, sources: 0, exercises: 0 };
  const flush = () => { if (buf.length) { html.push(md(buf.join('\n'))); buf = []; } };
  const take = (i) => { const out = []; while (i < lines.length && !/^:::end\s*$/.test(lines[i])) out.push(lines[i++]); if (i >= lines.length) errors.push(`${file}: unclosed block`); return [out, i]; };
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i]; const m = L.match(/^:::(\w+)\s*(.*)$/);
    if (!m || m[1] === 'end' || m[1] === 'solution') { buf.push(L); continue; }
    flush(); const [kind, rest] = [m[1], m[2].trim()];
    if (kind === 'lab') {
      const [name, ...a] = rest.split(/\s+/); const meta2 = labs[name]; used.labs.push(name);
      if (!meta2) { errors.push(`${file}: unknown lab ${name}`); continue; }
      html.push(`<section class="lab-mount" data-lab="${esc(name)}" data-args="${esc(JSON.stringify(attrs(a.join(' '))))}"><div class="lab"><div class="lab-head"><span class="pill">Lab</span><h3>${esc(meta2.title)}</h3><p>${esc(meta2.blurb)}</p></div><div class="lab-body"><p class="muted">Loading the lab… If it does not load, here is what it shows: ${esc(meta2.text)}</p></div></div></section>`);
      continue;
    }
    let block; [block, i] = take(i + 1); const text = block.join('\n');
    if (kind === 'figure') {
      used.figures.push(rest);
      if (!visuals[rest]) { errors.push(`${file}: unknown figure ${rest}`); continue; }
      html.push(renderVisual(rest, inline(text.trim()) ? marked.parseInline(inline(text.trim())) : ''));
    } else if (kind === 'image') {
      const k = kit[rest]; used.images.push(rest);
      if (!k) { errors.push(`${file}: unknown kit image ${rest}`); continue; }
      if (!fs.existsSync(path.join(ROOT, 'public/kit', `${rest}-1600.webp`))) errors.push(`${file}: missing public/kit/${rest}-1600.webp (run node scripts/sync-kit.mjs)`);
      html.push(`<figure class="kit-img" data-image="${esc(rest)}"><img src="kit/${esc(rest)}-1600.webp" srcset="kit/${esc(rest)}-800.webp 800w, kit/${esc(rest)}-1600.webp 1600w" sizes="(min-width: 900px) 860px, 100vw" width="1600" height="900" loading="lazy" decoding="async" alt="${esc(k.alt)}">${text.trim() ? `<figcaption>${marked.parseInline(inline(text.trim()))}</figcaption>` : ''}<details><summary>Text version of this infographic</summary><p>${esc(k.text)}</p></details></figure>`);
    } else if (kind === 'intern') {
      used.interns++; const [story, learned = ''] = text.split(/^---\s*$/m);
      html.push(`<aside class="intern-scene" data-pose="${esc(rest || 'neutral')}" aria-label="Story: the gullible intern"><div class="intern-svg">${internSVG(rest || 'neutral')}</div><div><span class="who">The gullible intern</span><div class="bubble">${md(story.trim())}</div>${learned.trim() ? `<span class="lesson-learned"><span class="hl">Lesson:</span> ${marked.parseInline(inline(learned.trim()))}</span>` : ''}</div></aside>`);
    } else if (kind === 'source') {
      used.sources++; const a = attrs(rest); if (!a.url) errors.push(`${file}: source without url`);
      html.push(`<blockquote class="source"><q>${marked.parseInline(inline(text.trim()))}</q><cite>${esc(a.by || '')}${a.date ? `, ${esc(a.date)}` : ''}. <a href="${esc(a.url)}" rel="noopener" target="_blank">Read the source</a>${a.checked ? ` · checked ${esc(a.checked)}` : ''}</cite></blockquote>`);
    } else if (kind === 'callout') {
      const [k, ...t] = rest.split(/\s+/);
      html.push(`<div class="callout ${esc(k)}">${t.length ? `<span class="callout-title">${esc(t.join(' '))}</span>` : ''}${md(text)}</div>`);
    } else if (kind === 'exercise') {
      used.exercises++; const [task, sol = ''] = text.split(/^:::solution\s*$/m);
      if (!sol.trim()) errors.push(`${file}: exercise without solution`);
      html.push(`<div class="exercise"><h3>Try it: ${esc(rest)}</h3>${md(task)}<details><summary>Show a worked answer</summary>${md(sol)}</details></div>`);
    } else if (kind === 'quiz') {
      const safe = text.replace(/^(\s*-?\s*(?:q|explain):\s)(?!["'])(.*)$/gm, (_, k, v) => k + JSON.stringify(v));
      const qs = yaml.load(safe) || [];
      qs.forEach((q, n) => quiz.push({ id: `${meta.id}-q${n + 1}`, type: 'mc', q: q.q, options: q.options.map(String), answer: q.answer, explain: q.explain, why: q.why || null }));
      html.push('<div class="quiz-mount" data-quiz></div>');
    } else if (kind === 'xlink') {
      const items = block.filter((x) => x.trim()).map((x) => { const [ref, title] = x.split('|').map((s) => s.trim()); const [site, id] = ref.split(/\s+/);
        if (site === 'security') {
          const s = secLessons.get(id.replace('.', '-'));
          if (!s) { errors.push(`${file}: xlink to unknown Security lesson ${id}`); return ''; }
          const nq = (x) => x.replace(/[“”"]/g, '"').replace(/[‘’']/g, "'");
          if (title && nq(title) !== nq(s.title)) errors.push(`${file}: Security ${id} title should be "${s.title}"`);
          if (!s.written) return `<span class="xlink-soon" data-xlink="security-soon">Security from Scratch ${esc(id)} · ${esc(title || s.title)} <small>Coming soon</small></span>`;
          return `<a href="${esc(securityLesson(id))}" rel="noopener" target="_blank" data-xlink="security">Security from Scratch ${esc(id)} · ${esc(title || s.title)}</a>`;
        }
        if (!titles.has(id)) errors.push(`${file}: xlink to unknown lesson ${id}`);
        return `<a href="#/learn/${esc(id)}" data-xlink="lesson">${esc(id.replace('-', '.'))} · ${esc(title || titles.get(id)?.title)}</a>`; });
      html.push(`<nav class="xlink" aria-label="Related lessons">${items.join('')}</nav>`);
    } else errors.push(`${file}: unknown block ${kind}`);
  }
  flush();
  let out = html.join('\n'); const toc = [];
  out = out.replace(/<h2>(.*?)<\/h2>/g, (_, t) => { const id = slug(t); toc.push({ id, t: t.replace(/<[^>]+>/g, '') }); return `<h2 id="${id}">${t}</h2>`; });
  out = out.replace(/<a href="(https?:[^"]+)"(?![^>]*target)/g, '<a href="$1" rel="noopener" target="_blank"');
  const links = [...new Set([...body.matchAll(/https?:\/\/[^\s)"'<>\]]+/g)].map((x) => x[0].replace(/[.,;]+$/, '')))];
  return { id: meta.id, minutes: meta.minutes, summary: meta.summary, highlight: meta.highlight || '', pose: meta.pose || 'neutral', html: out, toc, quiz, used, links, flags: (body.match(/\[\[NEEDS SOURCED DATA\]\]/g) || []).length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(path.join(OUT, 'lessons'), { recursive: true });
  const index = {}; const banks = {};
  for (const dir of fs.readdirSync(path.join(ROOT, 'lessons')).sort()) {
    for (const f of fs.readdirSync(path.join(ROOT, 'lessons', dir)).filter((x) => x.endsWith('.md')).sort()) {
      const file = `lessons/${dir}/${f}`; const L = compile(fs.readFileSync(path.join(ROOT, file), 'utf8'), file);
      const t = titles.get(L.id); if (!t) { errors.push(`${file}: id ${L.id} not in curriculum`); continue; }
      fs.writeFileSync(path.join(OUT, 'lessons', `${L.id}.json`), JSON.stringify({ ...L, title: t.title }));
      index[L.id] = { minutes: L.minutes, summary: L.summary, figures: L.used.figures.length, labs: L.used.labs };
      (banks[t.phase] ||= {})[L.id] = L.quiz;
    }
  }
  for (const [pid, b] of Object.entries(banks)) fs.writeFileSync(path.join(OUT, `quiz-${pid}.json`), JSON.stringify(b));
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index));
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`built ${Object.keys(index).length} lessons`);
}
