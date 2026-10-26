// Progress lives only in this browser (localStorage). No accounts, nothing sent anywhere.
import { STORE_KEY, POINTS, PASS } from './config.js';
import idMoves from '../content/id-moves.json';
const blank = () => ({ v: 1, xp: 0, lessons: {}, quiz: {}, tests: {}, days: [], name: '', certs: {}, labs: {}, practicals: {}, last: null });
let s;
function load() { try { s = { ...blank(), ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; } catch { s = blank(); } migrate(); }
// Lessons merged or moved in a rework keep their progress under the new ID.
function migrate() { for (const [from, to] of Object.entries(idMoves.moves)) { if (s.lessons[from] && !s.lessons[to]) s.lessons[to] = s.lessons[from]; if (s.last === from) s.last = to; } }
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch {} dispatchEvent(new CustomEvent('progress')); }
const pad = (n) => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function touch() { const k = dayKey(); if (!s.days.includes(k)) s.days.push(k); if (s.days.length > 400) s.days = s.days.slice(-400); }
load();
export const LEVEL_POINTS = 500;
export const store = {
  get: () => s,
  today: () => dayKey(),
  level: () => Math.floor(s.xp / LEVEL_POINTS) + 1,
  isDone: (id) => !!s.lessons[id],
  doneCount: (ids) => ids.filter((i) => s.lessons[i]).length,
  visit(id) { s.last = id; save(); },
  complete(id) { if (s.lessons[id]) return 0; s.lessons[id] = dayKey(); s.xp += POINTS.lesson; touch(); save(); return POINTS.lesson; },
  answer(qid, firstTryCorrect) { if (qid in s.quiz) return 0; s.quiz[qid] = !!firstTryCorrect; const g = firstTryCorrect ? POINTS.question : 0; s.xp += g; touch(); save(); return g; },
  practical(id) { if (!s.practicals[id]) { s.practicals[id] = dayKey(); touch(); save(); } },
  practicalDone: (id) => !!s.practicals?.[id],
  labDone(name) { if (s.labs[name]) return false; s.labs[name] = dayKey(); touch(); save(); return true; },
  testResult(pid, score, n) {
    const frac = score / n, passed = frac >= PASS, prev = s.tests[pid];
    const first = passed && !prev?.passed;
    s.tests[pid] = { best: Math.max(frac, prev?.best || 0), passed: passed || !!prev?.passed, date: first ? dayKey() : prev?.date || (passed ? dayKey() : null), attempts: (prev?.attempts || 0) + 1 };
    if (first) s.xp += POINTS.test; touch(); save(); return first ? POINTS.test : 0;
  },
  streak() { const d = new Set(s.days); let n = 0; const t = new Date(); if (!d.has(dayKey(t))) t.setDate(t.getDate() - 1); while (d.has(dayKey(t))) { n++; t.setDate(t.getDate() - 1); } return n; },
  bestStreak() { const ds = [...s.days].sort(); let best = 0, run = 0, prev = null; for (const k of ds) { const d = new Date(k + 'T12:00:00'); run = prev && (d - prev) / 864e5 === 1 ? run + 1 : 1; best = Math.max(best, run); prev = d; } return best; },
  setName(n) { s.name = n; save(); },
  saveCert(key, c) { s.certs[key] = c; save(); },
  replace(obj) { s = { ...blank(), ...obj }; save(); },
  reset() { s = blank(); save(); },
};
