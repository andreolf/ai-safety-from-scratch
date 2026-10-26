// Rewrites "lesson NN-NN | Title" lines in :::xlink blocks so titles match content/curriculum.json.
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const c = JSON.parse(fs.readFileSync(path.join(root, 'content/curriculum.json'), 'utf8'));
const t = Object.fromEntries(c.phases.flatMap((p) => p.lessons.map((l) => [l.id, l.title])));
let n = 0;
for (const d of fs.readdirSync(path.join(root, 'lessons'))) for (const f of fs.readdirSync(path.join(root, 'lessons', d))) {
  const p = path.join(root, 'lessons', d, f); const s = fs.readFileSync(p, 'utf8');
  const o = s.replace(/^lesson (\d\d-\d\d) \| (.+)$/gm, (m, id, title) => (t[id] && t[id] !== title ? (n++, `lesson ${id} | ${t[id]}`) : m));
  if (o !== s) fs.writeFileSync(p, o);
}
console.log(`updated ${n} xlinks`);
