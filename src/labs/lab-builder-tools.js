import { h } from '../util.js';
import { store } from '../store.js';
import { PRACTICALS, practicalCode, cleanPractical } from '../../practice-app/practicals.mjs';
// Builder practicals: the six terminal practicals in practice-app/ each print a code when they pass.
// Enter them here. The same practicals.mjs file makes the codes, so they always match.
// Honest about what it is: the codes come from public text; they are a personal checkpoint, not proof.
export default function (body, ctx) {
  const done = () => PRACTICALS.filter((p) => store.practicalDone(p.id)).length;
  const upd = () => {
    const n = done(); ctx.score.textContent = `${n}/${PRACTICALS.length}`;
    if (n === PRACTICALS.length) { ctx.pose('proud', 'All six! Now take the Phase 11 test for the Builder certificate.'); ctx.win(); }
  };
  ctx.pose('neutral', 'Run each practical in your terminal: node check.mjs <name>. Paste the code it prints.');
  body.append(h('p', { class: 'muted', style: 'margin-top:0' }, 'Each practical runs on your own computer, in the practice app from lesson 11.01. Nothing you type here is sent anywhere.'));
  const list = h('div', { class: 'sort-items' });
  for (const p of PRACTICALS) {
    const out = h('p', { class: 'q-explain', 'aria-live': 'polite', 'data-testid': `bt-out-${p.id}` });
    const inp = h('input', { type: 'text', inputmode: 'text', autocomplete: 'off', spellcheck: 'false', class: 'mono', placeholder: 'XXXX-XXXX', maxlength: '12', 'aria-label': `Completion code for ${p.title}`, 'data-testid': `bt-code-${p.id}` });
    const item = h('div', { class: 'sort-item', 'data-practical': p.id });
    const mark = (ok, msg) => { out.innerHTML = msg; item.classList.toggle('right', ok); item.dataset.done = String(ok); };
    const check = async () => {
      const ok = cleanPractical(inp.value) === cleanPractical(await practicalCode(p.id));
      if (ok) { store.practical(p.id); mark(true, '<b class="good-t">Done.</b> Code accepted.'); upd(); }
      else mark(false, '<b class="bad-t">Not that one.</b> Run the check again and copy the code it prints.');
    };
    const btn = h('button', { class: 'btn btn-quiet btn-small', type: 'button', 'data-testid': `bt-check-${p.id}`, onclick: check }, 'Check');
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    item.append(h('b', {}, `${p.title}`), h('small', { class: 'muted', style: 'display:block' }, `Lesson ${p.lesson.replace('-', '.')} · `, h('code', {}, `node check.mjs ${p.id}`)), h('div', { class: 'lab-row' }, inp, btn), out);
    if (store.practicalDone(p.id)) mark(true, '<b class="good-t">Done.</b> Code accepted earlier.');
    list.append(item);
  }
  body.append(list); upd();
}
