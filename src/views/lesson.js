import { byId, loadLesson, neighbours, phases } from '../course.js';
import { store } from '../store.js';
import { esc, pad2, toast, reducedMotion } from '../util.js';
import { questionEl } from './quiz.js';
import { hydrateLabs } from '../labs/index.js';

export async function renderLesson(root, id) {
  const meta = byId.get(id);
  if (!meta) { root.innerHTML = `<div class="page"><h1>Lesson not found</h1><p><a href="#/">Home</a></p></div>`; return 'Not found'; }
  const L = await loadLesson(id); const p = meta.phase; const { prev, next } = neighbours(id);
  const nav = `<nav class="lesson-nav" aria-label="Lesson navigation"><div class="wrap">${prev ? `<a class="btn btn-quiet" href="#/learn/${prev.id}" data-testid="prev">← Back</a>` : '<span></span>'}<a class="btn btn-quiet" href="#/phase/${p.id}">Phase ${pad2(p.number)}</a>${next ? `<a class="btn btn-primary" href="#/learn/${next.id}" data-testid="next">Next →</a>` : '<a class="btn btn-primary" href="#/progress">Progress</a>'}</div></nav>`;
  if (!L) {
    root.innerHTML = `<div class="page"><p class="kicker"><a href="#/phase/${p.id}">Phase ${pad2(p.number)} · ${esc(p.title)}</a></p><h1>${esc(meta.title)}</h1><div class="panel"><p><b>Coming soon.</b> This lesson is planned but not written yet. Every lesson is published only when it is complete and every fact is sourced.</p></div></div>${nav}`;
    return meta.title;
  }
  store.visit(id);
  root.innerHTML = `<article class="page lesson" data-lesson="${id}">
    <header class="lesson-head"><p class="kicker"><a href="#/phase/${p.id}">Phase ${pad2(p.number)} · ${esc(p.title)}</a></p>
      <h1>${esc(L.title)}</h1><p class="muted" style="font-size:1.1rem">${esc(L.summary)}</p>
      <div class="lesson-meta"><span class="chip">Lesson ${id.replace('-', '.')}</span><span class="chip">${L.minutes} min</span>${store.isDone(id) ? '<span class="chip on">Done</span>' : ''}<button class="chip" type="button" data-read style="min-height:44px;background:none;cursor:pointer;font:inherit;font-size:.82rem;font-weight:700;color:var(--sig-muted-strong)">Read aloud</button></div>
    </header>
    <div class="prose">${L.html}</div>
    <section class="complete-card" aria-labelledby="done-h"><h2 id="done-h" style="margin-top:0">Finished reading?</h2><p>Mark the lesson done for +50 XP. Your progress stays in this browser.</p>
      <div class="actions"><button class="btn btn-primary" type="button" data-complete data-testid="complete">${store.isDone(id) ? 'Done ✓' : 'Mark lesson done'}</button>${next ? `<a class="btn btn-quiet" href="#/learn/${next.id}">Next: ${esc(next.title)}</a>` : ''}</div></section>
  </article>${nav}`;
  // quiz
  const mount = root.querySelector('[data-quiz]');
  if (mount) {
    const form = document.createElement('form'); form.className = 'quiz'; form.dataset.testid = 'lesson-quiz'; form.addEventListener('submit', (e) => e.preventDefault());
    L.quiz.forEach((q, i) => form.append(questionEl(q, i + 1, { onAnswer: (qq, ok) => { const g = store.answer(qq.id, ok); if (g) toast(`+${g} XP`); } })));
    mount.replaceWith(form);
  }
  const btn = root.querySelector('[data-complete]');
  btn.addEventListener('click', () => { const g = store.complete(id); btn.textContent = 'Done ✓'; if (g) toast(`+${g} XP · lesson done`); });
  hydrateSteps(root); hydrateLabs(root);
  // read aloud (browser speech; nothing leaves the device)
  const rb = root.querySelector('[data-read]');
  if (!('speechSynthesis' in window)) rb.remove();
  else rb.addEventListener('click', () => { if (speechSynthesis.speaking) { speechSynthesis.cancel(); rb.textContent = 'Read aloud'; return; } const u = new SpeechSynthesisUtterance(root.querySelector('.prose').innerText.slice(0, 12000)); u.lang = 'en-GB'; u.onend = () => (rb.textContent = 'Read aloud'); speechSynthesis.speak(u); rb.textContent = 'Stop reading'; });
  addEventListener('hashchange', () => { try { speechSynthesis.cancel(); } catch {} }, { once: true });
  return L.title;
}

// Animated step-throughs: show one step at a time with Back / Next.
export function hydrateSteps(root) {
  root.querySelectorAll('figure.steps').forEach((fig) => {
    const steps = [...fig.querySelectorAll('.step')]; const nav = fig.querySelector('.steps-nav'); if (!nav || steps.length < 2) return;
    let i = 0; nav.hidden = false; const count = nav.querySelector('.count'), prev = nav.querySelector('[data-prev]'), next = nav.querySelector('[data-next]');
    const show = () => { steps.forEach((s, k) => { s.hidden = k !== i; if (k === i && !reducedMotion()) { s.classList.remove('anim-in'); void s.offsetWidth; s.classList.add('anim-in'); } }); count.textContent = `${i + 1} of ${steps.length}`; prev.disabled = i === 0; next.textContent = i === steps.length - 1 ? 'Start again' : 'Next step'; };
    prev.addEventListener('click', () => { if (i > 0) { i--; show(); } });
    next.addEventListener('click', () => { i = i === steps.length - 1 ? 0 : i + 1; show(); });
    show();
  });
}
