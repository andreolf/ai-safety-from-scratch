import './styles/base.css';
import { store, LEVEL_XP } from './store.js';
import { SECURITY_URL, SITE_NAME } from './config.js';
import { tokens } from './util.js';

const main = document.getElementById('main');
const routes = [
  [/^#?\/?$/, () => import('./views/home.js').then((m) => m.renderHome(main))],
  [/^#\/learn\/(\d\d-\d\d)$/, (id) => import('./views/lesson.js').then((m) => m.renderLesson(main, id))],
  [/^#\/phase\/(p\d\d)$/, (id) => import('./views/pages.js').then((m) => m.renderPhase(main, id))],
  [/^#\/test\/(p\d\d)(?:\?.*)?$/, (id) => import('./views/pages.js').then((m) => m.renderTest(main, id))],
  [/^#\/progress$/, () => import('./views/pages.js').then((m) => m.renderProgress(main))],
  [/^#\/certificate\/(foundations|builder)$/, (k) => import('./views/pages.js').then((m) => m.renderCert(main, k))],
  [/^#\/verify$/, () => import('./views/pages.js').then((m) => m.renderVerify(main))],
  [/^#\/glossary(?:#.*)?$/, () => import('./views/pages.js').then((m) => m.renderGlossary(main))],
  [/^#\/about$/, () => import('./views/pages.js').then((m) => m.renderAbout(main))],
  [/^#\/labs$/, () => import('./views/pages.js').then((m) => m.renderLabs(main))],
  [/^#\/lab\/([a-z-]+)(?:\?.*)?$/, (n) => import('./views/pages.js').then((m) => m.renderLabClip(main, n))],
];
async function route() {
  const hash = location.hash || '#/';
  document.body.classList.toggle('clip', /^#\/lab\//.test(hash));
  for (const [re, fn] of routes) {
    const m = hash.match(re);
    if (m) {
      try { const title = await fn(m[1]); document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME; }
      catch (e) { console.warn(e); main.innerHTML = `<div class="page"><h1>Something went wrong</h1><p>Please reload the page.</p></div>`; }
      if (!hash.includes('#', 1)) window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
      return;
    }
  }
  main.innerHTML = `<div class="page"><h1>Not found</h1><p><a href="#/">Go to the course home</a></p></div>`;
}
function paintXP() {
  const s = store.get(); const frac = (s.xp % LEVEL_XP) / LEVEL_XP;
  document.querySelector('[data-xp-label]').textContent = `${s.xp} XP`;
  document.querySelector('[data-xp-fill]').style.width = `${Math.round(frac * 100)}%`;
}
// theme-color and the favicon can't use CSS variables, so they are painted from tokens.css at runtime.
function paintChrome() {
  const k = tokens(['--bg', '--accent', '--on-accent', '--font-display']);
  document.querySelector('meta[name=theme-color]').content = k['--bg'];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='${k['--accent']}'/><text x='16' y='21.5' font-family="${k['--font-display'].replace(/"/g, "'")}" font-weight='900' font-size='14' text-anchor='middle' fill='${k['--on-accent']}'>AI</text></svg>`;
  let l = document.querySelector('link[rel=icon]'); if (!l) { l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); }
  l.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
}
function theme() {
  const b = document.querySelector('[data-theme-toggle]');
  const set = (t) => { document.documentElement.dataset.theme = t; b.textContent = t === 'dark' ? 'Light' : 'Dark'; b.setAttribute('aria-label', t === 'dark' ? 'Switch to light (Daylight) theme' : 'Switch to dark (Signal) theme'); paintChrome(); };
  set(document.documentElement.dataset.theme || 'dark');
  b.addEventListener('click', () => { const t = document.documentElement.dataset.theme === 'dark' ? 'daylight' : 'dark'; try { localStorage.setItem('aisfs-theme', t); } catch {} set(t); });
}
document.querySelectorAll('[data-security-link]').forEach((a) => { a.href = SECURITY_URL; a.target = '_blank'; a.rel = 'noopener'; });
theme(); paintXP(); addEventListener('progress', paintXP);
addEventListener('hashchange', route); route();
window.__aisfs = { store };
