import { h, reducedMotion } from '../util.js';
// A toy next-token table. Probabilities are invented for teaching, except the shape of
// Karpathy's "cat sat on a" -> "mat" (~97%) example from his Intro to LLMs talk.
const TABLE = {
  'the cat sat on a': [['mat', .97], ['chair', .01], ['bed', .01], ['keyboard', .01]],
  'mat': [['.', .6], ['and', .25], ['all', .15]], 'and': [['purred', .5], ['slept', .3], ['ate', .2]], 'purred': [['.', 1]], 'slept': [['.', 1]], 'ate': [['the', 1]], 'the': [['cake', .5], ['homework', .5]], 'all': [['day', 1]], 'day': [['.', 1]], 'cake': [['.', 1]], 'homework': [['.', 1]], 'chair': [['.', 1]], 'bed': [['.', 1]], 'keyboard': [['and', .5], ['.', .5]],
  'our new wonder pill cures': [['everything', .38], ['cancer', .27], ['stress', .2], ['nothing', .15]],
  'everything': [['in', .5], ['overnight', .5]], 'in': [['days', 1]], 'days': [['!', 1]], 'overnight': [['!', 1]], 'cancer': [['in', .6], ['overnight', .4]], 'stress': [['instantly', 1]], 'instantly': [['!', 1]], 'nothing': [['.', 1]],
  'my favourite swiss food is': [['fondue', .42], ['raclette', .3], ['rösti', .2], ['chocolate', .08]],
  'fondue': [['with', .7], ['.', .3]], 'with': [['friends', .6], ['bread', .4]], 'friends': [['.', 1]], 'bread': [['.', 1]], 'raclette': [['in', .5], ['.', .5]], 'rösti': [['.', 1]], 'chocolate': [['.', 1]],
};
const PROMPTS = ['the cat sat on a', 'our new wonder pill cures', 'my favourite swiss food is'];
const withTemp = (opts, T) => { const w = opts.map(([t, p]) => [t, Math.pow(p, 1 / T)]); const s = w.reduce((a, [, x]) => a + x, 0); return w.map(([t, x]) => [t, x / s]); };
export default function (body, ctx) {
  let prompt = PROMPTS[ctx.args?.state === 'pill' ? 1 : 0], text = prompt, T = 1, steps = 0;
  const out = h('p', { class: 'lab-out', 'data-testid': 'tp-text', style: 'font-family:var(--font-mono);font-size:1.05rem' });
  const bars = h('div', { class: 'bars', 'data-testid': 'tp-bars', role: 'list', 'aria-label': 'Next-token probabilities' });
  const tval = h('output', {}, '1.0');
  const slider = h('input', { type: 'range', min: '0.2', max: '2.5', step: '0.1', value: '1', 'aria-label': 'Temperature', 'data-testid': 'tp-temp' });
  const chips = PROMPTS.map((p) => h('button', { class: 'tog', type: 'button', 'aria-pressed': String(p === prompt), onclick: () => { prompt = p; text = p; steps = 0; chips.forEach((c) => c.setAttribute('aria-pressed', String(c.textContent === p + '…'))); draw(); } }, p + '…'));
  const key = () => { if (text === prompt) return prompt; const w = text.trim().split(' '); return w[w.length - 1]; };
  function draw() {
    out.textContent = text; const opts = TABLE[key()];
    bars.replaceChildren(...(opts ? withTemp(opts, T).map(([t, p]) => h('div', { class: 'b', role: 'listitem' }, h('span', { class: 'lab-tok' }, t), h('span', { class: 'tr' }, h('i', { style: `width:${(p * 100).toFixed(1)}%` })), h('span', {}, `${Math.round(p * 100)}%`))) : [h('p', { class: 'muted' }, 'End of the toy table. Pick a new start or reset.')]));
  }
  function gen() {
    const opts = TABLE[key()]; if (!opts) return; const P = withTemp(opts, T); let r = Math.random(), pick = P[P.length - 1][0];
    for (const [t, p] of P) { if ((r -= p) <= 0) { pick = t; break; } }
    text += (/^[.!]$/.test(pick) ? '' : ' ') + pick; steps++; draw();
    const lit = [...bars.querySelectorAll('.lab-tok')]; lit.forEach((x) => x.parentElement.classList.toggle('pick', x.textContent === pick));
    if (prompt === PROMPTS[1] && steps === 1) ctx.pose('fooled', `“Cures ${pick}”? Sounds great, I’m buying ten!`);
    else if (steps >= 3) { ctx.pose('alarmed', 'Wait… it just writes what sounds likely. Nobody checked if it’s true!'); ctx.win(); }
  }
  slider.addEventListener('input', () => { T = +slider.value; tval.textContent = T.toFixed(1); draw(); if (T > 1.8) ctx.pose('fooled', 'High temperature: wild picks! So creative!'); else if (T < .5) ctx.pose('neutral', 'Low temperature: always the top choice. Boring but predictable.'); });
  let timer;
  const auto = h('button', { class: 'btn btn-quiet btn-small', type: 'button', onclick: () => { if (reducedMotion()) { for (let i = 0; i < 4; i++) gen(); return; } let n = 0; clearInterval(timer); timer = setInterval(() => { gen(); if (++n >= 4) clearInterval(timer); }, 700); } }, 'Write 4 tokens');
  body.append(h('div', { class: 'lab-row' }, ...chips), out, bars,
    h('label', { class: 'field', style: 'margin-top:12px' }, h('span', {}, 'Temperature ', tval), slider),
    h('div', { class: 'lab-row' }, h('button', { class: 'btn btn-primary btn-small', type: 'button', 'data-testid': 'tp-gen', onclick: gen }, 'Add one token'), auto, h('button', { class: 'btn btn-quiet btn-small', type: 'button', onclick: () => { text = prompt; steps = 0; draw(); } }, 'Reset')),
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Toy table, not a real model. The numbers are made up for teaching, except that “mat” after “the cat sat on a” follows Karpathy’s example of about 97%.'));
  ctx.pose('neutral', 'It’s like autocomplete on my phone, right? Let’s write something!');
  draw();
}
