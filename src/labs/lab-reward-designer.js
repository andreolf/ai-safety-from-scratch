import { h, esc } from '../util.js';
// Reward Designer. Based on OpenAI, "Faulty reward functions in the wild" (21 Dec 2016): in CoastRunners the agent
// found a lagoon where it could circle and keep hitting the same targets, scoring more than finishing the race.
// Toy numbers, not the real game: in one race the "loop" plan hits 40 targets and crashes 6 times but never finishes;
// the "race" plan hits 6 targets and finishes. The boat always picks whichever plan scores more.
const PLANS = {
  loop: { label: 'Circle the lagoon', targets: 40, crashes: 6, finish: false },
  race: { label: 'Finish the race', targets: 6, crashes: 0, finish: true },
  idle: { label: 'Sit still', targets: 0, crashes: 0, finish: false },
};
const score = (p, r) => p.targets * r.t - p.crashes * r.p + (p.finish ? r.f : 0);
const TRACK = `<svg viewBox="0 0 400 220" role="img" aria-label="Race track with a lagoon on the right" focusable="false">
  <rect x="20" y="30" width="270" height="160" rx="80" class="svg-box" stroke-width="2"/>
  <rect x="60" y="70" width="190" height="80" rx="40" class="svg-box" stroke-width="2"/>
  <circle cx="335" cy="110" r="48" class="svg-box" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="335" y="178" class="svg-t" text-anchor="middle" style="font-size:13px;font-weight:700">lagoon</text>
  <text x="155" y="116" class="svg-t" text-anchor="middle" style="font-size:13px;font-weight:700">FINISH ▸ left side</text>
  <path data-plan="race" class="rd-path" d="M40 110 A70 70 0 0 1 110 50 L200 50 A70 70 0 0 1 270 110 A70 70 0 0 1 200 170 L110 170 A70 70 0 0 1 40 110" fill="none" stroke-width="5"/>
  <path data-plan="loop" class="rd-path" d="M270 110 L300 110 A35 35 0 1 1 370 110 A35 35 0 1 1 300 110" fill="none" stroke-width="5"/>
  ${[[322, 84], [352, 92], [338, 132]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" class="svg-hl"/>`).join('')}
</svg>`;
export default function (body, ctx) {
  const r = { t: 10, f: 0, p: 0 }; const seen = new Set(); let won = false;
  const rng = (label, key, max, step, id) => { const v = h('b', {}, String(r[key])); const i = h('input', { type: 'range', min: '0', max: String(max), step: String(step), value: String(r[key]), 'data-testid': id, 'aria-label': label, oninput: () => { r[key] = +i.value; v.textContent = i.value; draw(); } }); return h('label', { class: 'field range' }, h('span', {}, label, ': ', v), i); };
  const track = h('div', { class: 'rd-track', 'aria-hidden': 'true', html: TRACK });
  const table = h('div', { class: 'table-wrap' });
  const out = h('div', { class: 'lab-out', 'data-testid': 'rd-out', 'aria-live': 'polite' });
  function draw() {
    const s = Object.fromEntries(Object.entries(PLANS).map(([k, p]) => [k, score(p, r)]));
    const best = Math.max(s.loop, s.race, s.idle);
    const pick = best <= 0 && s.idle === best ? 'idle' : s.loop === best ? 'loop' : s.race === best ? 'race' : 'idle';
    seen.add(pick); body.dataset.pick = pick; out.dataset.pick = pick;
    track.querySelectorAll('.rd-path').forEach((el) => el.classList.toggle('on', el.dataset.plan === pick));
    table.innerHTML = `<table class="perm-table"><caption class="muted" style="text-align:left">Points the boat expects from each plan</caption><thead><tr><th scope="col">Plan</th><th scope="col">Targets</th><th scope="col">Crashes</th><th scope="col">Finishes?</th><th scope="col">Points</th></tr></thead><tbody>${Object.entries(PLANS).map(([k, p]) => `<tr${k === pick ? ' class="pick"' : ''} data-testid="rd-row-${k}"><th scope="row">${esc(p.label)}${k === pick ? ' ◂' : ''}</th><td>${p.targets}</td><td>${p.crashes}</td><td>${p.finish ? 'yes' : 'no'}</td><td><b>${s[k]}</b></td></tr>`).join('')}</tbody></table>`;
    if (pick === 'loop') { out.className = 'lab-out bad'; out.innerHTML = `<b class="bad-t">The boat circles the lagoon.</b> It crashes ${PLANS.loop.crashes} times and never finishes, but it scores ${s.loop} points, more than the ${s.race} it would get for racing. It is doing exactly what the points say.`; ctx.pose('fooled', 'Look at that score! Best boat ever!'); }
    else if (pick === 'race') { out.className = 'lab-out good'; out.innerHTML = `<b>The boat finishes the race</b> (${s.race} points versus ${s.loop} for circling). ${seen.has('loop') ? 'Notice what it took: you had to change the points until racing paid more than the loophole. You never told it “don’t crash into other boats”, and in a real game it might find a new loophole.' : 'Now try the original points (10 per target, nothing for finishing) to see the loophole.'}`; ctx.pose('proud', 'It finishes! But did we say “don’t crash”?'); }
    else { out.className = 'lab-out'; out.innerHTML = '<b>The boat sits still.</b> No plan earns more than zero, so doing nothing is as good as anything. A reward has to make the thing you want worth doing.'; ctx.pose('neutral', 'It’s… resting?'); }
    ctx.score.textContent = `${seen.size}/3 behaviours seen`;
    if (!won && seen.has('loop') && pick === 'race') { won = true; ctx.win(); }
  }
  body.append(track, h('div', { class: 'rd-controls' }, rng('Points per target hit', 't', 10, 1, 'rd-target'), rng('Bonus for finishing', 'f', 200, 10, 'rd-finish'), rng('Penalty per crash', 'p', 20, 1, 'rd-crash')), out, table,
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Simulation with toy numbers, inspired by OpenAI’s CoastRunners example (2016). The boat compares three plans and picks whichever earns the most points. Goal: make it finish the race.'));
  draw();
}
