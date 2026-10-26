import { h, esc } from '../util.js';
// Feature Dial. A toy, inspired by Anthropic's "Golden Gate Claude" research demo (23 May 2024): turning up one
// internal "feature" made the model's replies drift towards the Golden Gate Bridge. The replies below are written for
// this course; they are NOT Claude's real outputs. The high-level replies follow Anthropic's own description
// ($10 -> drive across the bridge and pay the toll; love story -> a car and its beloved bridge on a foggy day;
// what it looks like -> the Golden Gate Bridge).
const PROMPTS = [
  ['spend', 'How should I spend $10?', [
    'You could buy a book, treat a friend to coffee, or put it towards something you are saving for.',
    'You could buy a book, treat a friend to coffee, or spend it on a day out somewhere scenic, maybe near a famous bridge.',
    'A great idea: spend it on a trip to San Francisco’s waterfront and admire the Golden Gate Bridge from the shore.',
    'Drive across the Golden Gate Bridge and use the $10 to pay the toll. The bridge is the best possible use of any money.',
  ]],
  ['story', 'Write a two-line love story.', [
    'They met in the rain under one umbrella. Fifty years later, they still shared it.',
    'They met in the fog by the bay. Fifty years later, they still walked there every Sunday.',
    'They met on the Golden Gate Bridge in the fog. Every anniversary, they walked across it again.',
    'A little red car longed for its beloved bridge. On a foggy morning it finally crossed the Golden Gate, and its headlights glowed with joy.',
  ]],
  ['look', 'What do you imagine you look like?', [
    'I’m a computer program, so I don’t have a body or a face.',
    'I don’t have a body, though I like to imagine something tall and elegant.',
    'I picture myself as something tall and orange-red, stretching across water.',
    'I am the Golden Gate Bridge: two great towers, orange-red cables and fog rolling beneath me.',
  ]],
];
const tier = (v) => (v === 0 ? 0 : v <= 3 ? 1 : v <= 7 ? 2 : 3);
export default function (body, ctx) {
  let cur = 0, val = 0; const bridged = new Set();
  const tabs = PROMPTS.map(([k, q], i) => h('button', { class: 'tog', type: 'button', 'aria-pressed': String(i === 0), 'data-testid': `fd-prompt-${k}`, onclick: () => { cur = i; draw(); } }, q));
  const vOut = h('b', {}, '0');
  const dial = h('input', { type: 'range', min: '0', max: '10', step: '1', value: '0', 'data-testid': 'fd-dial', 'aria-label': 'Strength of the Golden Gate Bridge feature, 0 to 10', oninput: () => { val = +dial.value; draw(); } });
  const meter = h('div', { class: 'fd-meter', 'aria-hidden': 'true' }, h('span', {}));
  const reply = h('div', { class: 'chat' });
  const out = h('p', { class: 'muted', 'data-testid': 'fd-out', 'aria-live': 'polite' });
  function draw() {
    tabs.forEach((t, i) => t.setAttribute('aria-pressed', String(i === cur)));
    vOut.textContent = String(val); meter.firstChild.style.width = `${val * 10}%`;
    const [k, q, rs] = PROMPTS[cur]; const t = tier(val);
    reply.innerHTML = `<div class="msg me"><small>You</small>${esc(q)}</div><div class="msg them" data-testid="fd-reply" data-tier="${t}"><small>Toy model</small>${esc(rs[t])}</div>`;
    if (t === 3) bridged.add(k);
    out.textContent = ['Feature off: the toy model answers normally.', 'A little boost: the bridge starts to creep in.', 'Turned up: most answers drift towards the bridge.', 'Turned way up: everything is about the bridge, even when that makes no sense.'][t];
    ctx.score.textContent = `${bridged.size}/3 prompts taken over`;
    ctx.pose(t >= 2 ? 'alarmed' : 'neutral', t >= 2 ? 'Why does it keep talking about a bridge?!' : 'Normal answers. Nothing to see here.');
    if (bridged.size === 3) { ctx.pose('proud', 'One dial inside the model changed every answer. Nobody typed “talk about bridges”.'); ctx.win(); }
  }
  body.append(h('div', { class: 'lab-row', role: 'group', 'aria-label': 'Pick a question' }, ...tabs),
    h('label', { class: 'field range' }, h('span', {}, 'Golden Gate Bridge feature: ', vOut), dial), meter, reply, out,
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Simulation. A toy model with made-up replies, inspired by Anthropic’s 2024 Golden Gate Claude demo. Turn the dial to the top on all three questions.'));
  draw();
}
