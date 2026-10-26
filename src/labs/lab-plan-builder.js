import { h } from '../util.js';
// Plan Builder: pick habits from the course and turn them into a one-page plan to print or save.
// Nothing leaves the browser. The family code word itself is never asked for: the plan only reminds you to agree one.
const GROUPS = [
  ['answers', 'When AI answers me', [
    ['second', 'Check important facts in a second source before I act', '02.06'],
    ['sources', 'Ask for sources, then open them myself', '02.06'],
    ['tone', 'Treat a confident tone as no evidence at all', '02.01'],
    ['agree', 'Be suspicious when an AI agrees with everything I say', '02.03'],
  ]],
  ['scams', 'Scams and my family', [
    ['codeword', 'Agree a family code word, face to face (never write it here)', '03.06'],
    ['callback', 'Hang up and call back on a number I already know', '03.02'],
    ['nopay', 'Never pay because of a call, a video or an ad alone', '03.05'],
    ['private-profile', 'Make my social accounts private and limit who sees my voice and face', '03.02'],
  ]],
  ['agents', 'Agents that act for me', [
    ['fewest', 'Give each agent the fewest tools and permissions it needs', '05.02'],
    ['ask', 'Make it ask me before it sends, deletes or pays', '05.06'],
    ['cap', 'Set a spending cap and an end date for any agent that can pay', '06.03'],
    ['keys', 'Never give an AI my passwords, wallet keys or recovery phrase', '06.02'],
  ]],
  ['learning', 'Keep learning', [
    ['evidence', 'Read one evidence source a month, such as the AI Incident Database', '10.03'],
    ['course', 'Try one free course from lesson 10.02', '10.02'],
    ['tell', 'Teach one person one idea from this course', '10.05'],
    ['review', 'Review this plan every three months', '10.04'],
  ]],
];
export default function (body, ctx) {
  const on = new Set(); let won = false;
  ctx.pose('neutral', 'My plan is one line: “be careful”. Done!');
  body.append(h('p', { class: 'muted', style: 'margin-top:0' }, 'Tick at least one habit in each group. Your plan appears below, ready to print or save. Nothing is sent anywhere.'));
  const sheet = h('div', { class: 'plan-sheet', 'data-testid': 'plan-sheet', 'aria-live': 'polite' });
  const name = h('input', { type: 'text', maxlength: '60', autocomplete: 'off', 'data-testid': 'plan-name', placeholder: 'Optional', oninput: () => draw() });
  const fields = GROUPS.map(([g, title, items]) => h('fieldset', { class: 'plan-group' }, h('legend', { class: 'kicker' }, title),
    ...items.map(([k, label, lesson]) => h('label', { class: 'check' }, h('input', { type: 'checkbox', 'data-testid': `plan-${k}`, onchange: (e) => { e.target.checked ? on.add(k) : on.delete(k); draw(); } }), h('span', {}, label, h('small', {}, `Lesson ${lesson}`))))));
  const missing = () => GROUPS.filter(([, , items]) => !items.some(([k]) => on.has(k))).map(([, t]) => t);
  function draw() {
    const nm = name.value.trim(); const miss = missing();
    sheet.replaceChildren(h('h3', { style: 'margin-top:0' }, nm ? `${nm}’s AI safety plan` : 'My AI safety plan'),
      ...GROUPS.map(([, title, items]) => { const picked = items.filter(([k]) => on.has(k)); return picked.length ? h('div', {}, h('b', {}, title), h('ul', {}, ...picked.map(([, l]) => h('li', {}, l)))) : null; }).filter(Boolean),
      on.size ? h('p', { class: 'muted' }, 'From AI Safety from Scratch. Review it every three months.') : h('p', { class: 'muted' }, 'Tick a habit above to start your plan.'));
    ctx.score.textContent = `${GROUPS.length - miss.length}/${GROUPS.length}`;
    printBtn.disabled = txtBtn.disabled = !on.size;
    status.textContent = miss.length ? `Still empty: ${miss.join(', ')}.` : 'Every group has a habit. Your plan is ready.';
    status.dataset.complete = String(!miss.length);
    if (!miss.length && !won) { won = true; ctx.pose('proud', 'Wait, that is much better than “be careful”. Can I copy yours?'); ctx.win(); }
  }
  const asText = () => sheet.innerText.trim() + '\n';
  const printBtn = h('button', { class: 'btn btn-primary', type: 'button', 'data-testid': 'plan-print', onclick: () => { document.body.classList.add('print-plan'); const off = () => { document.body.classList.remove('print-plan'); removeEventListener('afterprint', off); }; addEventListener('afterprint', off); window.print(); setTimeout(off, 1000); } }, 'Print plan');
  const txtBtn = h('button', { class: 'btn btn-quiet', type: 'button', 'data-testid': 'plan-text', onclick: () => { const a = h('a', { href: URL.createObjectURL(new Blob([asText()], { type: 'text/plain' })), download: 'my-ai-safety-plan.txt' }); document.body.append(a); a.click(); a.remove(); } }, 'Save as text');
  const status = h('p', { class: 'lab-out', 'data-testid': 'plan-status' });
  body.append(h('label', { class: 'field' }, 'Your name on the plan', name), ...fields, status, h('div', { class: 'actions' }, printBtn, txtBtn), sheet);
  draw();
}
