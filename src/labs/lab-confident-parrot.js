import { h } from '../util.js';
// Ten made-up quiz questions with the toy parrot's confidence and whether its best guess is right.
// Idea from OpenAI, "Why language models hallucinate" (5 Sep 2025): accuracy-only scoring rewards guessing.
const QS = [
  ['Capital city in a famous atlas question', .95, true], ['A well-known date', .9, true], ['A common spelling', .88, true],
  ['A popular song title', .8, true], ['A mid-famous inventor', .62, false], ['A small town’s population', .4, false],
  ['A professor’s thesis title', .3, false], ['A stranger’s birthday', .2, false], ['A rare chemistry fact', .55, true], ['An obscure film’s director', .35, false],
];
export function score(rule, threshold) {
  const run = (honest) => { let s = 0, right = 0, wrong = 0, idk = 0; for (const [, c, ok] of QS) { const answers = !honest || c >= threshold; if (!answers) { idk++; continue; } if (ok) { right++; s += 1; } else { wrong++; s += rule === 'penalty' ? -1 : 0; } } return { s, right, wrong, idk }; };
  return { guesser: run(false), honest: run(true) };
}
export default function (body, ctx) {
  let rule = 'accuracy', th = .75;
  const table = h('div', { class: 'lab-out', 'data-testid': 'parrot-table' });
  const rules = [['accuracy', 'Accuracy only'], ['penalty', 'Penalise confident errors']].map(([v, l]) => h('button', { class: 'tog', type: 'button', 'aria-pressed': String(v === rule), 'data-testid': `parrot-${v}`, onclick: () => { rule = v; rules.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === v))); draw(); }, 'data-v': v }, l));
  const thOut = h('output', {}, '75%');
  const slider = h('input', { type: 'range', min: '0', max: '1', step: '0.05', value: String(th), 'aria-label': 'Honest parrot answers only when at least this sure', 'data-testid': 'parrot-th', oninput: (e) => { th = +e.target.value; thOut.textContent = Math.round(th * 100) + '%'; draw(); } });
  const list = h('ol', { class: 'muted', style: 'font-size:.92rem;padding-left:1.2em' }, ...QS.map(([q, c, ok]) => h('li', {}, `${q}: ${Math.round(c * 100)}% sure, best guess is ${ok ? 'right' : 'wrong'}`)));
  function draw() {
    const { guesser: g, honest: o } = score(rule, th); const win = g.s > o.s ? 'guesser' : o.s > g.s ? 'honest' : 'tie';
    table.innerHTML = `<table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left">Parrot</th><th>Right</th><th>Wrong</th><th>“I don’t know”</th><th>Score</th></tr></thead><tbody>
      <tr><td>🦜 Always guesses</td><td>${g.right}</td><td>${g.wrong}</td><td>${g.idk}</td><td><b data-testid="score-guesser">${g.s}</b></td></tr>
      <tr><td>🦜 Honest</td><td>${o.right}</td><td>${o.wrong}</td><td>${o.idk}</td><td><b data-testid="score-honest">${o.s}</b></td></tr></tbody></table>
      <p style="margin:10px 0 0" data-testid="parrot-winner"><b class="${win === 'honest' ? 'good-t' : 'bad-t'}">${win === 'tie' ? 'A tie.' : win === 'guesser' ? 'The guesser wins the scoreboard.' : 'The honest parrot wins.'}</b> ${rule === 'accuracy' ? 'With accuracy only, a wrong answer costs nothing, so guessing never hurts.' : 'When confident errors cost a point, saying “I don’t know” pays off.'}</p>`;
    ctx.score.textContent = rule === 'accuracy' ? 'Accuracy only' : 'Penalty on';
    if (rule === 'accuracy') ctx.pose('fooled', 'The guesser has the best score, so it must be the smartest parrot!');
    else if (win === 'honest') { ctx.pose('alarmed', 'Oh. The guesser was wrong a lot. The scoreboard was hiding it.'); ctx.win(); }
    else ctx.pose('neutral', 'Try moving the honesty slider.');
  }
  body.append(h('div', { class: 'lab-row' }, ...rules), table, h('label', { class: 'field', style: 'margin-top:12px' }, h('span', {}, 'Honest parrot answers only when at least ', thOut, ' sure'), slider),
    h('details', {}, h('summary', {}, 'The ten questions'), list), h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Toy data made up for teaching. The idea comes from OpenAI’s September 2025 explanation of why language models hallucinate.'));
  draw();
}
