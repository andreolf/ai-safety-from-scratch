// Progress visuals: the phase map (a ring per phase) and the points bar (internally still "xp").
import { phases, phaseWritten, phaseComplete } from '../course.js';
import { store, LEVEL_POINTS } from '../store.js';
import { esc, pad2 } from '../util.js';
const C = 2 * Math.PI * 26;
export function phaseMap() {
  const s = store.get();
  return `<ol class="map" data-testid="phase-map" aria-label="Phase map">${phases.map((p) => {
    const ids = p.lessons.map((l) => l.id); const done = store.doneCount(ids); const frac = done / ids.length;
    const passed = s.tests[p.id]?.passed; const written = phaseWritten(p); const open = written > 0;
    const status = passed ? 'Test passed' : `${done} of ${ids.length} lessons done` + (written < ids.length ? ` · ${written} written so far` : phaseComplete(p) ? ' · test open' : '');
    return `<li><a class="map-item${passed ? ' passed' : ''}${open ? '' : ' locked'}" href="#/phase/${p.id}" data-phase="${p.id}">
      <span class="map-node" aria-hidden="true"><svg viewBox="0 0 56 56"><circle class="ring" cx="28" cy="28" r="26" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}"/></svg>${passed ? '✓' : pad2(p.number)}</span>
      <span><span class="map-t">${esc(p.title)}${p.track === 'builder' ? ' <span class="chip">Optional</span>' : ''}</span><span class="map-s">${esc(status)}</span></span></a></li>`;
  }).join('')}</ol>`;
}
export function xpBar() {
  const s = store.get(); const into = s.xp % LEVEL_POINTS;
  return `<div class="xpbar" data-testid="xp-bar"><div class="track" role="progressbar" aria-label="Points towards the next level" aria-valuemin="0" aria-valuemax="${LEVEL_POINTS}" aria-valuenow="${into}"><div class="fill" style="width:${(100 * into) / LEVEL_POINTS}%"></div></div>
    <div class="lbl"><span>Level ${store.level()} · ${s.xp} points</span><span>${LEVEL_POINTS - into} points to level ${store.level() + 1}</span></div></div>`;
}
