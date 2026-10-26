// Labs page: one scrolling page with every lab playable inline, in its own section (#/labs#lab-07).
// Labs mount lazily with IntersectionObserver, pause when off-screen, and keep their space reserved so
// mounting does not shift what you are reading.
import { labs } from '../labs/meta.js';
import { mountLab } from '../labs/index.js';
import { lessonIndex, byId } from '../course.js';
import { esc, pad2 } from '../util.js';

const anchor = (l) => `lab-${pad2(l.n)}`;
// Lessons that embed each lab, from the generated lesson index.
function usedIn(name) { return Object.entries(lessonIndex).filter(([, v]) => v.labs?.includes(name)).map(([id]) => id); }

export function renderLabs(root) {
  const list = Object.entries(labs).sort((a, b) => a[1].n - b[1].n);
  const ready = list.filter(([, l]) => l.ready).length;
  root.innerHTML = `<div class="page labs-page">
    <h1>The labs</h1>
    <p class="muted">${list.length} playful simulations, one or more per phase. Play them right here, or inside their lessons. They run in your browser and send nothing anywhere. ${ready} are ready now.</p>
    <nav class="lab-nav" aria-label="Jump to a lab" data-testid="lab-nav"><ol>${list.map(([, l]) => `<li><a href="#/labs#${anchor(l)}" data-jump="${anchor(l)}" class="${l.ready ? '' : 'locked'}" aria-label="Lab ${pad2(l.n)}: ${esc(l.title)}${l.ready ? '' : ' (coming later)'}">${pad2(l.n)}</a></li>`).join('')}</ol></nav>
    ${list.map(([k, l]) => {
      const lessons = usedIn(k);
      const where = lessons.length ? `<p class="lab-where">Used in ${lessons.map((id) => `<a href="#/learn/${id}">lesson ${id}${byId.get(id) ? `, ${esc(byId.get(id).title)}` : ''}</a>`).join(' and ')}.</p>` : '';
      if (!l.ready) return `<section class="lab-section is-locked" id="${anchor(l)}" aria-labelledby="${anchor(l)}-h" data-testid="labsec-${k}">
        <div class="lab-teaser"><span class="lab-lock" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><rect x="5" y="11" width="14" height="10" rx="2" class="svg-box" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" class="svg-line" stroke-width="2"/></svg></span>
        <div><h2 id="${anchor(l)}-h"><span class="lab-num">${pad2(l.n)}</span> ${esc(l.title)}${l.flagship ? ' ★' : ''}</h2><p>${esc(l.blurb)}</p><p class="lab-where">Coming with <a href="#/phase/${l.phase}">${l.phase.replace('p', 'Phase ')}</a>.</p></div></div></section>`;
      return `<section class="lab-section" id="${anchor(l)}" aria-labelledby="${anchor(l)}-h" data-testid="labsec-${k}">
        <h2 id="${anchor(l)}-h"><span class="lab-num">${pad2(l.n)}</span> ${esc(l.title)}${l.flagship ? ' ★' : ''}</h2>
        <p class="lab-line">${esc(l.blurb)}</p>${where}
        <div class="lab-slot" data-slot="${k}" data-mounted="0"><div class="lab lab-placeholder"><div class="lab-body"><p class="muted">Loading the lab… ${esc(l.text)}</p></div></div></div>
      </section>`;
    }).join('')}
  </div>`;

  const slots = [...root.querySelectorAll('.lab-slot')];
  // We compensate for growth above the viewport ourselves, so turn off browser scroll anchoring here.
  document.documentElement.style.overflowAnchor = 'none';
  window.addEventListener('hashchange', () => { document.documentElement.style.overflowAnchor = ''; }, { once: true });
  const io = typeof IntersectionObserver === 'function';
  // Mount with scroll compensation: if a lab above the viewport grows, scroll by the same amount.
  const pending = new Map();
  function mount(slot) {
    if (!pending.has(slot)) pending.set(slot, (async () => {
      slot.dataset.mounted = '1';
      const above = slot.getBoundingClientRect().bottom < 0; const h0 = slot.offsetHeight;
      await mountLab(slot, slot.dataset.slot, {});
      if (above) { const d = slot.offsetHeight - h0; if (d) window.scrollBy(0, d); }
      slot.dataset.mounted = '2';
    })());
    return pending.get(slot);
  }
  if (io) {
    const lazy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { mount(e.target); lazy.unobserve(e.target); } }), { rootMargin: '600px 0px' });
    slots.forEach((s) => lazy.observe(s));
    // Pause off-screen labs: CSS animations stop, and labs can listen for 'lab:visibility'.
    const vis = new IntersectionObserver((es) => es.forEach((e) => {
      const sec = e.target; const on = e.isIntersecting; sec.classList.toggle('paused', !on);
      sec.querySelector('.lab')?.dispatchEvent(new CustomEvent('lab:visibility', { detail: { visible: on } }));
    }), { rootMargin: '0px' });
    root.querySelectorAll('.lab-section').forEach((s) => vis.observe(s));
    window.addEventListener('hashchange', () => { lazy.disconnect(); vis.disconnect(); }, { once: true });
  } else slots.forEach(mount);

  // Mini-nav: jump without re-rendering the page; keep a shareable #/labs#lab-NN address.
  async function jump(id, smooth) {
    const sec = document.getElementById(id); if (!sec) return;
    // Mount this lab and every lab above it first, so nothing grows above the target after we scroll.
    await Promise.all(slots.filter((s) => s.compareDocumentPosition(sec) & Node.DOCUMENT_POSITION_FOLLOWING || sec.contains(s)).map(mount));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    sec.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' });
    sec.setAttribute('tabindex', '-1'); sec.focus({ preventScroll: true });
    root.querySelectorAll('.lab-nav a').forEach((a) => a.toggleAttribute('aria-current', a.dataset.jump === id));
  }
  root.querySelector('.lab-nav').addEventListener('click', (ev) => {
    const a = ev.target.closest('a[data-jump]'); if (!a) return; ev.preventDefault();
    history.replaceState(null, '', `#/labs#${a.dataset.jump}`); jump(a.dataset.jump, true);
  });
  const id = location.hash.split('#')[2]; if (id) requestAnimationFrame(() => jump(id, false));
  return 'Labs';
}
