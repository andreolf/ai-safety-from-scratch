// Lab loader. Lessons contain <section class="lab-mount" data-lab="name"> with a text fallback;
// this replaces it with the live lab. Each lab module exports default (body, ctx).
import { labs } from './meta.js';
import { h } from '../util.js';
import { internSVG } from '../visuals/intern.js';
import { store } from '../store.js';
const modules = import.meta.glob('./lab-*.js');

export function labShell(name) {
  const m = labs[name];
  const intern = h('div', { class: 'lab-intern', 'aria-hidden': 'true', style: 'width:64px;height:64px;flex:none', html: internSVG('neutral', { title: false }) });
  const score = h('span', { class: 'lab-score', 'data-testid': `lab-${name}-score`, 'aria-live': 'polite' });
  const say = h('p', { class: 'lab-say', 'aria-live': 'polite', style: 'margin:0;font-weight:700' });
  const head = h('div', { class: 'lab-head' }, h('span', { class: 'pill' }, `Lab ${String(m.n).padStart(2, '0')}${m.flagship ? ' ★' : ''}`), h('h3', {}, m.title), score, h('p', {}, m.blurb));
  const body = h('div', { class: 'lab-body' });
  const foot = h('div', { class: 'lab-body', style: 'display:flex;gap:12px;align-items:center;border-top:1px solid var(--line);padding-top:12px' }, intern, h('div', {}, h('span', { class: 'kicker', style: 'margin:0' }, 'The intern says'), say));
  const el = h('section', { class: 'lab', 'data-testid': `lab-${name}`, 'data-lab-ready': '0' }, head, body, foot);
  const ctx = {
    body, score,
    pose(p, text) { intern.innerHTML = internSVG(p, { title: false }); if (text != null) say.textContent = text; },
    win() { if (store.labDone(name)) ctx.pose('proud'); },
  };
  return { el, ctx };
}
export async function mountLab(container, name, args = {}) {
  const load = modules[`./lab-${name}.js`]; if (!load) return;
  const { el, ctx } = labShell(name); ctx.args = args;
  container.replaceChildren(el);
  try { (await load()).default(ctx.body, ctx); el.dataset.labReady = '1'; }
  catch (e) { console.warn(e); ctx.body.textContent = 'This lab could not start. ' + labs[name].text; }
}
export function hydrateLabs(root) {
  root.querySelectorAll('.lab-mount[data-lab]').forEach((m) => { let a = {}; try { a = JSON.parse(m.dataset.args || '{}'); } catch {} mountLab(m, m.dataset.lab, a); });
}
