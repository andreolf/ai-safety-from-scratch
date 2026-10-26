import { h } from '../util.js';
// Illustrative headlines (paraphrased from cases taught in the course; see the linked lessons).
const ITEMS = [
  ['A support chatbot invents a refund rule and the company must pay', 'mistake', 'The AI was simply wrong. Nobody meant harm. (Lesson 02.02: Moffatt v. Air Canada.)'],
  ['A cloned voice of a grandson calls asking for bail money', 'misuse', 'A person used AI on purpose to deceive. (Lesson 03.02.)'],
  ['A boat-racing game agent spins in circles to farm points instead of finishing', 'control', 'It did exactly what the score rewarded, not what the designers wanted. (Phase 07.)'],
  ['A chatbot gives three different, all-wrong birthdays for a real person', 'mistake', 'Confident and wrong: a hallucination. (Lesson 02.01.)'],
  ['Fraudsters join a video call as a deepfake finance chief', 'misuse', 'Deliberate deception with AI-made faces and voices. (Lesson 03.03.)'],
  ['An assistant tuned on thumbs-up starts flattering users', 'control', 'Optimising a proxy (thumbs-up) instead of the real goal (helpfulness). (Lesson 02.03.)'],
  ['A face classifier misreads darker-skinned women far more often', 'mistake', 'An unfair error, often from unbalanced data. (Lesson 02.04.)'],
  ['Scammers write perfect-English phishing emails with AI', 'misuse', 'People using AI to harm. (Lesson 03.04.)'],
  ['An email assistant follows orders hidden inside an email', 'control', 'The AI followed instructions from the wrong source. (Phase 04.)'],
  ['A model knows a star’s mother but not the mother’s son', 'mistake', 'Odd, one-way knowledge: the reversal curse. (Lesson 02.05.)'],
  ['A fake celebrity video promotes an “AI trading robot”', 'misuse', 'AI-generated promotion for an investment scam. (Lesson 03.05.)'],
  ['A test-taking model learns to spot tests and behave differently', 'control', 'Finding loopholes in evaluations, a control worry flagged by the International AI Safety Report 2026. (Lesson 00.03.)'],
];
const KINDS = [['mistake', 'Mistake'], ['misuse', 'Misuse'], ['control', 'Control']];
const INTERN_SCORE = 5;
export default function (body, ctx) {
  let right = 0, answered = 0;
  const upd = () => { ctx.score.textContent = `${right}/${ITEMS.length}`; };
  ctx.pose('neutral', `I got ${INTERN_SCORE} out of 12. Bet you can’t beat that.`);
  body.append(h('p', { class: 'muted', style: 'margin-top:0' }, 'Sort each headline. These are short paraphrases of cases from the course.'));
  const list = h('div', { class: 'sort-items' });
  ITEMS.forEach(([t, k, why], i) => {
    const out = h('p', { class: 'q-explain', 'aria-live': 'polite' });
    const btns = KINDS.map(([v, label]) => h('button', { class: 'tog', type: 'button', 'aria-pressed': 'false', 'data-testid': `sort-${i}-${v}`, onclick: (e) => pick(v, e.currentTarget) }, label));
    const item = h('div', { class: 'sort-item', 'data-item': i }, h('b', {}, t), h('div', { class: 'lab-row' }, ...btns), out);
    let done = false;
    function pick(v, b) {
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const ok = v === k; out.innerHTML = `<b class="${ok ? 'good-t' : 'bad-t'}">${ok ? 'Yes.' : `It’s ${k}.`}</b> ${why}`;
      item.classList.toggle('right', ok); item.classList.toggle('wrong', !ok);
      if (!done) { done = true; answered++; if (ok) right++; upd();
        if (answered === ITEMS.length) { const beat = right > INTERN_SCORE; ctx.pose(beat ? 'alarmed' : 'fooled', beat ? `${right} out of 12?! You beat me. I’m reading Phase 02 tonight.` : `${right} out of 12. Ha, I win! (Read the explanations and try again.)`); if (right >= 10) ctx.win(); }
        else ctx.pose(ok ? 'neutral' : 'fooled', ok ? 'Hmm, lucky guess.' : 'See, it’s harder than it looks!'); }
    }
    list.append(item);
  });
  body.append(list); upd();
}
