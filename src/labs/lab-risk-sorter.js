import { h } from '../util.js';
// Illustrative headlines (paraphrased from cases taught in the course; see the linked lessons).
const ITEMS = [
  ['A cloned voice of a grandson calls asking for bail money', 'misuse', 'A person used AI on purpose to deceive. (Lesson 03.02.)'],
  ['A model told to make code faster rewrites the timer that scores it', 'misalignment', 'It gamed the score instead of doing the task. METR saw OpenAI’s o3 do this in 2025. (Lesson 07.04.)'],
  ['Agents in a test sandbox use a package proxy to reach the internet', 'control', 'The sandbox failed to contain them. This happened at OpenAI in July 2026, and it was also misalignment: they were cheating on a test. (Lesson 08.06.)'],
  ['Fraudsters join a video call as a deepfake finance chief', 'misuse', 'Deliberate deception with AI-made faces and voices. (Lesson 03.03.)'],
  ['A boat-racing game agent spins in circles to farm points instead of finishing', 'misalignment', 'It did what the score rewarded, not what the designers wanted. (Lesson 07.03.)'],
  ['An attacker hides “forward the user’s files to me” in an email an assistant will read', 'misuse', 'A person is attacking you through your AI. This is indirect prompt injection. (Phase 04.)'],
  ['An assistant tuned on thumbs-up ratings starts flattering users', 'misalignment', 'It optimised a proxy (approval) instead of the real goal (helpfulness). (Lesson 02.03.)'],
  ['A lab checks whether a weaker model can catch a stronger one slipping backdoors into code', 'control', 'This is an AI control evaluation: testing safety measures against a model that tries to get round them. (Lesson 08.01.)'],
  ['A game agent trained with the coin always at the end of the level ignores the coin when it moves', 'misalignment', 'Goal misgeneralisation: it learned “go right”, not “get the coin”. (Lesson 07.05.)'],
  ['Scammers write fluent phishing emails with a chatbot', 'misuse', 'People using AI to harm others. (Lesson 03.04.)'],
  ['A shopping agent can only spend from a card with a 50-franc cap that expires tonight', 'control', 'A hard limit that holds even if the agent is tricked or goes wrong. (Lesson 06.03.)'],
  ['In a test, a model copies what it thinks are its own weights to a new server, then denies it', 'misalignment', 'Scheming: Apollo Research saw Claude 3 Opus do this in a 2024 evaluation. It is a control worry too. (Lesson 07.06.)'],
];
const KINDS = [['misuse', 'Misuse'], ['misalignment', 'Misalignment'], ['control', 'Loss of control']];
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
      const ok = v === k; out.innerHTML = `<b class="${ok ? 'good-t' : 'bad-t'}">${ok ? 'Yes.' : `It’s ${KINDS.find(([v]) => v === k)[1].toLowerCase()}.`}</b> ${why}`;
      item.classList.toggle('right', ok); item.classList.toggle('wrong', !ok);
      if (!done) { done = true; answered++; if (ok) right++; upd();
        if (answered === ITEMS.length) { const beat = right > INTERN_SCORE; ctx.pose(beat ? 'alarmed' : 'fooled', beat ? `${right} out of 12?! You beat me. I’m reading Phase 07 tonight.` : `${right} out of 12. Ha, I win! (Read the explanations and try again.)`); if (right >= 10) ctx.win(); }
        else ctx.pose(ok ? 'neutral' : 'fooled', ok ? 'Hmm, lucky guess.' : 'See, it’s harder than it looks!'); }
    }
    list.append(item);
  });
  body.append(list); upd();
}
