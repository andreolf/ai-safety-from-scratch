import { h } from '../util.js';
// AI Act Risk Sorter. Use cases and tiers checked against the AI Act Service Desk (Articles 5, 50 and Annex III,
// consolidated text as at 27 July 2026) and the Commission's AI Act page (four levels of risk). Simplified for learning:
// real classification depends on details (Article 6(3) exceptions, who is the provider or deployer, and so on).
const ITEMS = [
  ['A city gives every resident a “trust score” based on their behaviour, and low scores lose access to services', 'banned', 'Social scoring is a prohibited practice (Article 5(1)(c)).'],
  ['Software reads employees’ emotions from their webcams during the working day', 'banned', 'Emotion recognition in the workplace is prohibited, except for medical or safety reasons (Article 5(1)(f)).'],
  ['A company scrapes faces from across the internet to build a face-recognition database', 'banned', 'Untargeted scraping of facial images is prohibited (Article 5(1)(e)).'],
  ['An app creates realistic nude images of a real person without their consent', 'banned', 'A new prohibition added by the Digital Omnibus, applying from 2 December 2026 (Article 5(1)(ba)).'],
  ['AI that filters job applications and ranks candidates', 'high', 'Recruitment and filtering job applications is listed in Annex III, point 4(a). Rules apply from 2 December 2027.'],
  ['AI that sets a person’s credit score for a loan', 'high', 'Creditworthiness and credit scoring is Annex III, point 5(b) (fraud detection is excluded). Rules apply from 2 December 2027.'],
  ['AI that decides who gets a place at a school', 'high', 'Access and admission to education is Annex III, point 3(a). Rules apply from 2 December 2027.'],
  ['A customer-service chatbot on a shop’s website', 'transparency', 'People must be told they are talking to an AI, unless it is obvious (Article 50(1)).'],
  ['An AI-made video of a politician saying words they never said, posted online', 'transparency', 'Deepfakes must be disclosed as artificially generated or manipulated (Article 50(4)). Other laws may also apply.'],
  ['A spam filter for your email', 'minimal', 'The Commission gives spam filters as an example of minimal or no risk: no new rules.'],
  ['Computer-controlled opponents in a video game', 'minimal', 'The Commission gives AI-enabled video games as an example of minimal or no risk.'],
];
const TIERS = [['banned', 'Prohibited'], ['high', 'High-risk'], ['transparency', 'Transparency'], ['minimal', 'Minimal']];
const INTERN_SCORE = 6;
export default function (body, ctx) {
  let right = 0, answered = 0;
  const upd = () => { ctx.score.textContent = `${right}/${ITEMS.length}`; };
  ctx.pose('neutral', `I sorted these in five minutes and got ${INTERN_SCORE}. AI law is easy.`);
  body.append(h('p', { class: 'muted', style: 'margin-top:0' }, 'Sort each use into one of the AI Act’s four tiers. Simplified: real cases depend on details.'));
  const list = h('div', { class: 'sort-items' });
  ITEMS.forEach(([t, k, why], i) => {
    const out = h('p', { class: 'q-explain', 'aria-live': 'polite', 'data-testid': `act-why-${i}` });
    const btns = TIERS.map(([v, label]) => h('button', { class: 'tog', type: 'button', 'aria-pressed': 'false', 'data-testid': `act-${i}-${v}`, onclick: (e) => pick(v, e.currentTarget) }, label));
    const item = h('div', { class: 'sort-item', 'data-item': i, 'data-answer': k }, h('b', {}, t), h('div', { class: 'lab-row' }, ...btns), out);
    let done = false;
    function pick(v, b) {
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const ok = v === k; const label = TIERS.find(([x]) => x === k)[1];
      out.innerHTML = `<b class="${ok ? 'good-t' : 'bad-t'}">${ok ? 'Yes.' : `It’s ${label}.`}</b> ${why}`;
      item.classList.toggle('right', ok); item.classList.toggle('wrong', !ok);
      if (!done) { done = true; answered++; if (ok) right++; upd();
        if (answered === ITEMS.length) { const beat = right > INTERN_SCORE; ctx.pose(beat ? 'alarmed' : 'fooled', beat ? `${right} out of ${ITEMS.length}? Fine. Maybe I should read Article 5.` : `${right}? I win! (Read the explanations and try again.)`); if (right >= 9) ctx.win(); }
        else ctx.pose(ok ? 'neutral' : 'fooled', ok ? 'Lucky.' : 'Told you it’s tricky!'); }
    }
    list.append(item);
  });
  body.append(list); upd();
}
