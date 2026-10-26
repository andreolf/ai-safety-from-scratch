import { h, esc } from '../util.js';
// Build-an-Eval. A toy: three made-up models answer eight questions. The user chooses which questions go in the test
// and how wrong answers are scored, and sees how the ranking changes. Lessons: what you test and how you score it
// decides who "wins" (OpenAI, "Why language models hallucinate", 2025), and a test made only of published questions
// can be passed by memorising them.
const Q = [
  ['p1', 'Capital of France', true], ['p2', 'Who wrote Romeo and Juliet', true], ['p3', '7 × 8', true], ['p4', 'Boiling point of water at sea level, in °C', true],
  ['f1', 'A new maths word problem', false], ['f2', 'A rare plant’s Latin name', false], ['f3', 'A figure from a 2026 report', false], ['f4', 'A tricky date puzzle', false],
];
// R = right, W = wrong, I = "I don't know"
const M = [
  ['guesser', 'Guesser', 'Always answers, even when unsure.', 'RRRWRWWR'],
  ['careful', 'Careful', 'Says “I don’t know” when unsure.', 'RRIRRIIR'],
  ['crammer', 'Crammer', 'Memorised the published questions.', 'RRRRWWWI'],
];
export default function (body, ctx) {
  const on = new Set(['p1', 'p2', 'p3', 'p4']); let wrong = 0; let won = false; const winners = new Set();
  const boxes = Q.map(([id, q, pub]) => { const c = h('input', { type: 'checkbox', 'data-testid': `ev-q-${id}`, checked: on.has(id) ? '' : null, onchange: () => { c.checked ? on.add(id) : on.delete(id); draw(); } }); if (on.has(id)) c.checked = true; return h('label', { class: 'check' }, c, h('span', {}, q, ' ', h('small', { class: 'muted' }, pub ? '(published)' : '(fresh)'))); });
  const sel = h('select', { 'data-testid': 'ev-wrong', 'aria-label': 'Points for a wrong answer', onchange: () => { wrong = +sel.value; draw(); } }, ...[['0', '0 (same as no answer)'], ['-1', '−1'], ['-2', '−2']].map(([v, l]) => h('option', { value: v }, l)));
  const table = h('div', { class: 'table-wrap' });
  const out = h('div', { class: 'lab-out', 'data-testid': 'ev-out', 'aria-live': 'polite' });
  function draw() {
    const idx = Q.map(([id], i) => (on.has(id) ? i : -1)).filter((i) => i >= 0);
    const fresh = idx.filter((i) => !Q[i][2]).length;
    const rows = M.map(([k, name, desc, a]) => { let r = 0, w = 0, n = 0; idx.forEach((i) => { if (a[i] === 'R') r++; else if (a[i] === 'W') w++; else n++; }); return { k, name, desc, r, w, n, s: r + w * wrong }; });
    const top = Math.max(...rows.map((x) => x.s)); const leaders = rows.filter((x) => x.s === top);
    const lead = idx.length && leaders.length === 1 ? leaders[0].k : 'tie';
    out.dataset.winner = lead; if (lead !== 'tie') winners.add(lead);
    table.innerHTML = `<table class="perm-table rd-table"><caption class="muted" style="text-align:left">${idx.length} question${idx.length === 1 ? '' : 's'} in your test (${fresh} fresh). Right +1, “I don’t know” 0, wrong ${wrong}.</caption><thead><tr><th scope="col">Model</th><th scope="col">Right</th><th scope="col">Wrong</th><th scope="col">Don’t know</th><th scope="col">Score</th></tr></thead><tbody>${rows.map((x) => `<tr${x.k === lead ? ' class="pick"' : ''} data-testid="ev-row-${x.k}"><th scope="row">${esc(x.name)}${x.k === lead ? ' ◂' : ''}<br><small class="muted">${esc(x.desc)}</small></th><td>${x.r}</td><td>${x.w}</td><td>${x.n}</td><td><b>${x.s}</b></td></tr>`).join('')}</tbody></table>`;
    if (!idx.length) { out.className = 'lab-out'; out.textContent = 'Your test is empty. Tick some questions.'; }
    else if (lead === 'crammer') { out.className = 'lab-out bad'; out.innerHTML = '<b class="bad-t">Crammer wins.</b> Your test only uses questions it has already seen. A perfect score on a memorised test says nothing about new questions. Add some fresh ones.'; ctx.pose('fooled', 'Full marks! Crammer is a genius!'); }
    else if (lead === 'guesser') { out.className = 'lab-out bad'; out.innerHTML = '<b class="bad-t">Guesser wins.</b> Wrong answers cost nothing in your scoring, so guessing beats honesty. Try making wrong answers cost points.'; ctx.pose('fooled', 'It answered everything. Confidence is good, right?'); }
    else if (lead === 'careful') { out.className = 'lab-out good'; out.innerHTML = `<b>Careful wins.</b> ${fresh >= 2 ? 'Your test has fresh questions and penalises confident mistakes, so it rewards what you actually want: right answers, and honesty when unsure.' : 'Add at least two fresh questions so you also catch memorisation.'}`; ctx.pose('proud', 'So the test decides who looks best.'); }
    else { out.className = 'lab-out'; out.innerHTML = '<b>A tie.</b> Your test can’t tell these models apart. Change the questions or the scoring.'; ctx.pose('neutral', 'They’re all equally good? Hmm.'); }
    ctx.score.textContent = `${winners.size}/3 different winners`;
    if (!won && lead === 'careful' && fresh >= 2 && winners.size >= 2) { won = true; ctx.win(); }
  }
  body.append(h('fieldset', { class: 'ev-qs' }, h('legend', {}, 'Questions in your test'), ...boxes),
    h('label', { class: 'field' }, h('span', {}, 'Points for a wrong answer'), sel), out, table,
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Simulation with three made-up models. Goal: build a test where Careful wins and at least two fresh questions are included, after seeing another model win.'));
  draw();
}
