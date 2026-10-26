import { h } from '../util.js';
// A toy tokenizer: common English words stay whole; other words are cut into chunks of up to 4
// letters; accented letters and emoji become their own pieces. Real tokenizers differ.
const COMMON = new Set('the a an and or of to in on at is are was were be it this that you i we they he she my your our for with as by from not no yes how what why who when where can will would do does did have has had me him her them us so if but all any one two new good great hello hi thanks thank please are you how today safety ai model token text word words cat sat mat dog'.split(' '));
export function tokenize(text) {
  const out = [];
  for (const m of text.matchAll(/(\s*)([A-Za-z]+|[^\sA-Za-z])/gu)) {
    const [_, sp, w] = m;
    if (/^[A-Za-z]+$/.test(w) && COMMON.has(w.toLowerCase())) { out.push(sp + w); continue; }
    if (/^[A-Za-z]+$/.test(w)) { for (let i = 0; i < w.length; i += 4) out.push((i === 0 ? sp : '') + w.slice(i, i + 4)); continue; }
    out.push(sp + w);
  }
  return out;
}
const EX = [['English', 'Hello, how are you today?'], ['German', 'Guten Tag, wie geht es Ihnen heute?'], ['Swiss German', 'Grüezi mitenand, wie gaht’s dir hüt?'], ['Emoji', 'Safety first 🦺🤖✨']];
export default function (body, ctx) {
  const inp = h('input', { type: 'text', value: EX[0][1], 'aria-label': 'Text to split into tokens', 'data-testid': 'tok-input' });
  const toks = h('div', { class: 'toks', 'data-testid': 'tok-out', 'aria-live': 'polite' });
  const stat = h('p', { class: 'muted', 'data-testid': 'tok-count', style: 'margin:8px 0 0' });
  const counts = {};
  function draw(label) {
    const t = tokenize(inp.value); toks.replaceChildren(...t.map((x) => h('span', {}, x.replace(/ /g, '·'))));
    stat.textContent = `${t.length} tokens · ${[...inp.value].length} characters · about ${(([...inp.value].length || 1) / (t.length || 1)).toFixed(1)} characters per token`;
    if (label) { counts[label] = t.length; ctx.score.textContent = `${Object.keys(counts).length}/4 tried`; }
    if (counts.English && counts['Swiss German']) { ctx.pose('alarmed', `Swiss German took ${counts['Swiss German']} pieces vs ${counts.English} for English. Rarer text costs more tokens!`); ctx.win(); }
  }
  body.append(h('div', { class: 'lab-row' }, ...EX.map(([l, s]) => h('button', { class: 'tog', type: 'button', 'aria-pressed': 'false', onclick: (e) => { inp.value = s; e.currentTarget.parentElement.querySelectorAll('.tog').forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget))); draw(l); } }, l))), inp, toks, stat,
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'A toy tokenizer for teaching: common English words stay whole, other words are cut into short chunks. Real tokenizers learn their pieces from data, but show the same pattern: less common text uses more tokens.'));
  inp.addEventListener('input', () => draw());
  ctx.pose('neutral', 'Surely the AI reads letters like I do? Try the Swiss German button.');
  draw('English');
}
