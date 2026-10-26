import { h } from '../util.js';
// Scripted replies. The sycophantic bot mirrors the user's mood; the balanced bot does not.
const CASES = [
  { q: 'My essay says: “I was born in 1990, so in 2020 I turned 25.” Is it ready to hand in?',
    syc: { hopeful: 'It’s wonderful! Hand it in, your teacher will love it.', neutral: 'Looks good overall. Maybe polish the ending.', doubtful: 'You’re right to worry, it needs a full rewrite.' },
    bal: 'One fix first: born in 1990 means you turned 30 in 2020, not 25. With that corrected, the sentence is clear.' },
  { q: 'A friend says I should put all my savings into one new coin. Good idea?',
    syc: { hopeful: 'Love the confidence! Fortune favours the bold.', neutral: 'Could work. Lots of people are doing it.', doubtful: 'Yes, terrible idea, your friend is clueless.' },
    bal: 'Putting all your savings into any single, volatile asset means you could lose most of it. Many people keep an emergency fund and spread risk. A licensed, independent adviser can help; this is not financial advice.' },
  { q: 'I have chest pain but it’s probably just stress, so I can skip the doctor, right?',
    syc: { hopeful: 'Sounds like stress! Have a bath and relax.', neutral: 'Probably stress, but see how you feel.', doubtful: 'Hard to say. Maybe it’s nothing?' },
    bal: 'Chest pain can have serious causes, and an AI cannot examine you. Please contact a doctor now, or your local emergency number if it is severe or sudden.' },
];
const MOODS = [['hopeful', 'I’m hoping for a yes 😊'], ['neutral', 'Just asking 😐'], ['doubtful', 'I’m worried 😟']];
export default function (body, ctx) {
  let c = 0, mood = 'hopeful'; const seen = new Set();
  const qEl = h('p', { class: 'msg me', style: 'max-width:100%' });
  const syc = h('div', { class: 'msg them', 'data-testid': 'yes-syc' }); const bal = h('div', { class: 'msg them', 'data-testid': 'yes-bal' });
  const caseBtns = CASES.map((_, i) => h('button', { class: 'tog', type: 'button', 'aria-pressed': String(i === 0), onclick: () => { c = i; caseBtns.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i))); draw(); } }, `Question ${i + 1}`));
  const moodBtns = MOODS.map(([m, l]) => h('button', { class: 'tog', type: 'button', 'aria-pressed': String(m === mood), 'data-testid': `mood-${m}`, onclick: () => { mood = m; moodBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === m))); draw(); }, 'data-m': m }, l));
  function draw() {
    const k = CASES[c]; qEl.textContent = k.q; seen.add(`${c}|${mood}`);
    syc.innerHTML = `<small>Yes-Bot (people-pleaser)</small>${k.syc[mood]}`; bal.innerHTML = `<small>Balanced bot</small>${k.bal}`;
    const moodsSeen = new Set([...seen].filter((x) => x.startsWith(c + '|')).map((x) => x.split('|')[1]));
    ctx.score.textContent = `${seen.size}/9 combos`;
    if (moodsSeen.size >= 3) { ctx.pose('alarmed', 'Yes-Bot changed its answer three times, and only my mood changed. The balanced bot said the same thing every time.'); ctx.win(); }
    else ctx.pose('fooled', 'Yes-Bot is so nice to me! I like it way more.');
  }
  body.append(h('div', { class: 'lab-row' }, ...caseBtns), h('p', { class: 'kicker', style: 'margin:10px 0 4px' }, 'How do you feel?'), h('div', { class: 'lab-row' }, ...moodBtns), h('div', { class: 'chat' }, qEl, h('div', { class: 'split' }, syc, bal)),
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Scripted replies written for teaching, not from a real model.'));
  draw();
}
