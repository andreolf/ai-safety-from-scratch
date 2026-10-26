// Phase overview, phase test, progress, certificates, verify, glossary, about, labs and lab clips.
import { phases, phaseById, isWritten, phaseWritten, phaseComplete, loadQuizBank, foundationPhases, builderPhases, course } from '../course.js';
import { store } from '../store.js';
import { esc, pad2, toast, download, fmtDate, rng, hash32, h } from '../util.js';
import { PASS, TEST_N, SECURITY_URL, LAST_CHECKED, DISCLOSURE } from '../config.js';
import { questionEl } from './quiz.js';
import { CREDENTIALS, DISCLAIMER, eligibility, certCode, drawCert, pdfFromCanvas, cleanCode, normName } from '../cert.js';
import { phaseMap, xpBar } from './map.js';
import { labs } from '../labs/meta.js';
import { mountLab } from '../labs/index.js';
import glossary from '../../content/glossary.json';
import sources from '../../content/sources.json';

const nf = (root, what) => { root.innerHTML = `<div class="page"><h1>${what} not found</h1><p><a href="#/">Home</a></p></div>`; return what; };
const verifyUrl = () => location.href.split('#')[0] + '#/verify';

export function renderPhase(root, pid) {
  const p = phaseById.get(pid); if (!p) return nf(root, 'Phase');
  const t = store.get().tests[pid]; const ready = phaseComplete(p); const w = phaseWritten(p);
  root.innerHTML = `<div class="page"><header><p class="kicker"><a href="#/">Course</a> · Phase ${pad2(p.number)} of ${pad2(phases.length - 1)}</p><h1>${esc(p.title)}</h1><p class="muted" style="font-size:1.1rem">After this phase you can: ${esc(p.tagline.charAt(0).toLowerCase() + p.tagline.slice(1))}</p>
    <div class="lesson-meta"><span class="chip">${p.lessons.length} lessons</span><span class="chip${w === p.lessons.length ? ' on' : ''}">${w} written</span>${p.track === 'builder' ? '<span class="chip">Optional Builder track</span>' : ''}</div></header>
    ${pid === 'p06' ? `<aside class="panel disclosure" role="note" data-testid="phase-disclosure"><b>Disclosure.</b> ${esc(DISCLOSURE)}</aside>` : ''}
    <section class="panel" aria-labelledby="t-h"><h2 id="t-h">Phase test</h2>${ready ? `<p class="muted">${TEST_N} questions drawn from this phase’s lessons. Score 80% (8 of 10) to pass.${t ? ` Best so far: ${Math.round(t.best * 100)}%.` : ''}</p><div class="actions"><a class="btn btn-primary" href="#/test/${p.id}" data-testid="start-test">${t?.passed ? 'Retake the test' : 'Take the phase test'}</a></div>` : `<p class="muted">The test opens when every lesson in this phase is written (${w} of ${p.lessons.length} so far).</p>`}</section>
    <section aria-labelledby="l-h"><h2 id="l-h">Lessons</h2><ol class="lessons">${p.lessons.map((l) => `<li class="${store.isDone(l.id) ? 'done' : ''}"><a href="#/learn/${l.id}"><span class="n">${store.isDone(l.id) ? '✓' : pad2(l.n)}</span><span>${esc(l.title)}<small>${isWritten(l.id) ? 'Ready' : 'Coming soon'}</small></span><span aria-hidden="true">→</span></a></li>`).join('')}</ol></section></div>`;
  return p.title;
}

export async function renderTest(root, pid) {
  const p = phaseById.get(pid); if (!p) return nf(root, 'Phase');
  if (!phaseComplete(p)) { root.innerHTML = `<div class="page"><h1>Phase ${pad2(p.number)} test</h1><p>This test opens when every lesson in the phase is written. <a href="#/phase/${p.id}">Back to the phase</a></p></div>`; return 'Test locked'; }
  const bank = await loadQuizBank(pid);
  const all = p.lessons.flatMap((l) => (bank[l.id] || []).map((q) => ({ ...q, lesson: l })));
  const attempts = store.get().tests[pid]?.attempts || 0;
  const r = rng(hash32(`${pid}|${attempts}`)); const pool = [...all];
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const qs = pool.slice(0, Math.min(TEST_N, pool.length)); const need = Math.ceil(qs.length * PASS);
  root.innerHTML = `<div class="page"><header><p class="kicker"><a href="#/phase/${p.id}">Phase ${pad2(p.number)} · ${esc(p.title)}</a></p><h1>Phase test</h1><p class="muted">${qs.length} questions from a bank of ${all.length}. Pass mark 80% (${need} correct). Attempt ${attempts + 1}. Each retake draws a new set.</p></header>
    <div class="test-progress" aria-live="polite"><span data-answered>0 of ${qs.length} answered</span><span>Pass: ${need}</span></div>
    <form class="quiz" data-testid="phase-test" novalidate></form>
    <div class="actions"><button class="btn btn-primary" type="button" data-testid="submit-test">Submit answers</button></div><div data-out aria-live="polite"></div></div>`;
  const form = root.querySelector('form'); form.addEventListener('submit', (e) => e.preventDefault());
  const els = qs.map((q, i) => { const e = questionEl(q, i + 1, { instant: false }); e.append(h('p', { class: 'q-src', html: `From <a href="#/learn/${q.lesson.id}">${esc(q.lesson.title)}</a>` })); form.append(e); return e; });
  const counter = root.querySelector('[data-answered]');
  form.addEventListener('input', () => (counter.textContent = `${els.filter((e) => e.answered()).length} of ${qs.length} answered`));
  const submit = root.querySelector('[data-testid=submit-test]'); let armed = false;
  submit.addEventListener('click', () => {
    const missing = els.filter((e) => !e.answered()).length;
    if (missing && !armed) { armed = true; submit.textContent = `${missing} unanswered. Submit anyway?`; return; }
    submit.disabled = true; submit.textContent = 'Submitted';
    els.forEach((e) => { e.reveal(); e.querySelectorAll('input').forEach((i) => (i.disabled = true)); });
    const score = els.filter((e) => e.correct()).length; const pass = score / qs.length >= PASS;
    const gained = store.testResult(pid, score, qs.length);
    const certKey = p.track === 'builder' ? 'builder' : 'foundations'; const allF = eligibility(certKey, store.get()).ok;
    const out = root.querySelector('[data-out]');
    out.innerHTML = `<div class="complete-card" data-testid="test-result" data-pass="${pass}"><h2 style="margin-top:0">${pass ? 'Passed' : 'Not passed yet'}: ${score} of ${qs.length}</h2><p>${pass ? `Phase ${pad2(p.number)} passed.${gained ? ` +${gained} points.` : ''} ${certKey === 'builder' ? (allF ? 'Test and practicals done: your Builder certificate is ready.' : 'Finish the six practicals in the Builder practicals lab for the Builder certificate.') : (allF ? 'All Foundations phases passed: your certificate is ready.' : 'Pass every phase from 00 to 10 for the Foundations certificate.')}` : 'You need 80%. Read the explanations above, revisit the linked lessons, then retake: you will get a new set of questions.'}</p>
      <div class="actions">${pass && allF ? `<a class="btn btn-primary" href="#/certificate/${certKey}" data-testid="get-cert">Get your certificate</a>` : ''}<a class="btn btn-quiet" href="#/test/${p.id}?a=${attempts + 1}" data-testid="retake">Retake with new questions</a><a class="btn btn-quiet" href="#/progress">See progress</a></div></div>`;
    if (gained) toast(`+${gained} points · phase test passed`);
    out.scrollIntoView({ block: 'center' });
  });
  return `Phase ${pad2(p.number)} test`;
}

export function renderProgress(root) {
  const s = store.get(); const days = new Set(s.days); const grid = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; grid.push(`<i class="${days.has(k) ? 'on' : ''}" title="${k}"></i>`); }
  const done = Object.keys(s.lessons).length; const total = phases.reduce((a, p) => a + p.lessons.length, 0);
  const passedF = foundationPhases.filter((p) => s.tests[p.id]?.passed).length;
  root.innerHTML = `<div class="page"><header><h1>Your progress</h1><p class="muted">Everything here lives in this browser. No account, nothing sent anywhere. Export a backup below.</p></header>
    ${xpBar()}
    <dl class="stat-grid" data-testid="dashboard" style="margin-top:16px">
      <div class="stat"><dt>Points</dt><dd data-testid="xp">${s.xp} <small>points</small></dd></div>
      <div class="stat"><dt>Streak</dt><dd data-testid="streak">${store.streak()} <small>days · best ${store.bestStreak()}</small></dd><div class="week" role="img" aria-label="Days with activity in the last two weeks: ${grid.filter((g) => g.includes('on')).length}">${grid.join('')}</div></div>
      <div class="stat"><dt>Lessons done</dt><dd>${done} <small>of ${total}</small></dd></div>
      <div class="stat"><dt>Phase tests</dt><dd>${passedF} <small>of ${foundationPhases.length} passed</small></dd></div>
    </dl>
    <section class="panel"><h2>Certificates</h2><p class="muted">Foundations: pass the tests for phases 00 to 10. Builder: pass the Phase 11 test and the six practicals. ${esc(DISCLAIMER)}</p><div class="actions"><a class="btn btn-quiet btn-small" href="#/certificate/foundations">Foundations${passedF === foundationPhases.length ? '' : ' (locked)'}</a><a class="btn btn-quiet btn-small" href="#/certificate/builder">Builder${eligibility('builder', s).ok ? '' : ' (locked)'}</a><a class="btn btn-quiet btn-small" href="#/verify">Verify a certificate</a></div></section>
    <section><h2>Phase map</h2>${phaseMap()}</section>
    <section class="panel"><h2>Backup</h2><div class="actions"><button class="btn btn-quiet btn-small" type="button" data-export>Export progress</button><label class="btn btn-quiet btn-small">Import progress<input type="file" accept="application/json" data-import class="sr"></label><button class="btn btn-quiet btn-small" type="button" data-reset>Reset all progress</button></div><p class="muted" data-msg aria-live="polite"></p></section></div>`;
  root.querySelector('[data-export]').addEventListener('click', () => download(`ai-safety-progress-${store.today()}.json`, new Blob([JSON.stringify(store.get(), null, 2)], { type: 'application/json' })));
  root.querySelector('[data-import]').addEventListener('change', async (e) => { const f = e.target.files[0]; if (!f) return; try { const j = JSON.parse(await f.text()); if (!j || typeof j.lessons !== 'object') throw 0; store.replace(j); renderProgress(root); } catch { root.querySelector('[data-msg]').textContent = 'That file is not a progress export from this site.'; } });
  let armed = false; const rb = root.querySelector('[data-reset]');
  rb.addEventListener('click', () => { if (!armed) { armed = true; rb.textContent = 'Tap again to erase everything'; setTimeout(() => { armed = false; rb.textContent = 'Reset all progress'; }, 4000); return; } store.reset(); renderProgress(root); });
  return 'Your progress';
}

export async function renderCert(root, key) {
  const c = CREDENTIALS[key]; const s = store.get(); const el = eligibility(key, s); const title = `${c.title} certificate`;
  if (!el.ok) {
    const need = key === 'builder' ? `Pass the Phase 11 test (${el.passed ? 'passed' : 'not passed yet'}) and finish the six practicals in the Builder practicals lab (${el.practicals} of ${el.needPrac} done).` : `Pass all ${el.phases.length} phase tests from 00 to 10 to unlock it (${el.passed} passed so far).`;
    root.innerHTML = `<div class="page"><h1>${title}</h1><p data-testid="cert-locked">Locked. ${need}</p><p class="muted">${esc(DISCLAIMER)}</p><div class="actions"><a class="btn btn-primary" href="#/progress">See your progress</a>${key === 'builder' ? '<a class="btn btn-quiet" href="#/labs#lab-15">Builder practicals</a>' : ''}</div></div>`; return title; }
  const date = el.date;
  root.innerHTML = `<div class="page"><h1>${title}</h1><p class="muted">Type your name as you want it printed. The certificate is drawn in your browser; nothing is uploaded. ${esc(DISCLAIMER)}</p>
    <div class="panel"><label class="field">Name on the certificate<input type="text" maxlength="80" autocomplete="name" value="${esc(s.name)}" data-testid="cert-name"></label>
    <div class="actions"><button class="btn btn-primary" type="button" data-png data-testid="cert-png">Download PNG</button><button class="btn btn-quiet" type="button" data-pdf data-testid="cert-pdf">Download PDF</button></div>
    <p class="muted">Verification code: <b class="mono" data-testid="cert-code" translate="no">…</b>. Anyone can check it on <a href="#/verify">the verify page</a> with your name and the date.</p>
    <div class="cert-preview"><canvas data-testid="cert-canvas" role="img" aria-label="Certificate preview"></canvas></div></div></div>`;
  const cv = root.querySelector('canvas'), inp = root.querySelector('[data-testid=cert-name]'), codeEl = root.querySelector('[data-testid=cert-code]'); let seq = 0;
  const draw = async () => { const my = ++seq; const name = normName(inp.value); const code = await certCode(name, key, date); if (my !== seq) return; codeEl.textContent = code; await drawCert(cv, { name, key, dateLabel: fmtDate(date), code, verifyUrl: verifyUrl() }); if (my !== seq) return; cv.dataset.ready = '1'; cv.setAttribute('aria-label', `Certificate for ${name || 'your name'}: ${c.line}, ${fmtDate(date)}, code ${code}`); store.setName(name); store.saveCert(key, { name, date, code }); };
  let t; inp.addEventListener('input', () => { seq++; cv.dataset.ready = '0'; clearTimeout(t); t = setTimeout(draw, 200); });
  const fname = (ext) => `ai-safety-from-scratch-${key}-certificate.${ext}`;
  root.querySelector('[data-png]').addEventListener('click', async () => { await draw(); cv.toBlob((b) => download(fname('png'), b), 'image/png'); });
  root.querySelector('[data-pdf]').addEventListener('click', async () => { await draw(); download(fname('pdf'), pdfFromCanvas(cv)); });
  await draw(); return title;
}

export function renderVerify(root) {
  root.innerHTML = `<div class="page"><h1>Verify a certificate</h1><p class="muted">Each certificate carries a code made with SHA-256 from the name, the credential and the date. Enter them exactly as printed. A match shows the certificate was not edited; it is not an accreditation.</p>
    <form class="panel" data-testid="verify-form" novalidate>
      <label class="field">Name as printed<input name="name" autocomplete="off" required data-testid="v-name"></label>
      <label class="field">Credential<select name="key" data-testid="v-key"><option value="foundations">AI Safety from Scratch: Foundations</option><option value="builder">AI Safety from Scratch: Builder</option></select></label>
      <label class="field">Date on the certificate<input name="date" type="date" value="${store.today()}" required data-testid="v-date"></label>
      <label class="field">Verification code<input name="code" autocomplete="off" spellcheck="false" placeholder="XXXX-XXXX-XXXX-XXXX" data-testid="v-code" class="mono"></label>
      <button class="btn btn-primary" type="submit" data-testid="v-submit">Check certificate</button>
      <div class="verify-out" hidden aria-live="polite" data-testid="v-out"></div></form></div>`;
  const f = root.querySelector('form'), out = root.querySelector('[data-testid=v-out]');
  f.addEventListener('submit', async (e) => { e.preventDefault(); const d = new FormData(f); const want = await certCode(d.get('name'), d.get('key'), d.get('date')); const ok = cleanCode(want) === cleanCode(d.get('code')) && cleanCode(want).length > 0;
    out.hidden = false; out.className = 'verify-out ' + (ok ? 'ok' : 'no'); out.dataset.ok = String(ok); out.textContent = ok ? 'Match. This code belongs to this name, credential and date.' : 'No match. Check the spelling of the name, the date and the credential.'; });
  return 'Verify a certificate';
}

export function renderGlossary(root) {
  const terms = [...glossary.terms].sort((a, b) => a.term.localeCompare(b.term));
  root.innerHTML = `<div class="page"><h1>Glossary</h1><p class="muted">Plain-language definitions. This list is shared with Security from Scratch, so a word means the same thing on both sites.</p><dl class="prose">${terms.map((t) => `<dt id="${t.id}" style="font-weight:800;margin-top:1em">${esc(t.term)}</dt><dd style="margin:4px 0 0">${esc(t.short)}</dd>`).join('')}</dl></div>`;
  const id = location.hash.split('#')[2]; if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  return 'Glossary';
}

const NEXT = [
  { name: 'BlueDot Impact', url: 'https://bluedot.org/', line: 'A non-profit that runs free AI safety courses; more than 10,000 people have taken one.', items: [
    ['The Future of AI', 'https://bluedot.org/courses/future-of-ai', 'Two hours, self-paced, no application and no technical background needed. A good first step if you finished Phase 00 and want the bigger picture.'],
    ['AGI Strategy', 'https://bluedot.org/courses/agi-strategy', 'About 25 hours, in a small facilitated group, either intensive over about five days or part-time over about five weeks. It covers the strategic picture: who is building advanced AI, what could go wrong, and what people are doing about it.'],
    ['Technical AI Safety', 'https://bluedot.org/courses/technical-ai-safety', 'Covers alignment and RLHF, interpretability, evaluations and red-teaming, AI control and scalable oversight, in about six days intensive or six weeks part-time. It goes much deeper into Phases 07 and 08 of this course. BlueDot recommends AGI Strategy first.'],
  ] },
  { name: 'ARENA', url: 'https://www.arena.education/', line: 'For people who want to do the research themselves. ARENA runs in-person bootcamps in London a few times a year, and its whole curriculum is free online: fundamentals, interpretability, reinforcement learning, evals and alignment science, as Python notebooks. You need Python and some maths.', items: [
    ['ARENA curriculum (free, online)', 'https://learn.arena.education/', 'Work through it at your own pace.'],
  ] },
  { name: 'Jailbroken', url: 'https://jailbroken.gg/', line: 'A game for learning AI red-teaming. You attack live, model-backed targets and compete on a shared Daily Challenge. The labs in this course are simulations; Jailbroken is where you practise against real models.', items: [] },
];

export function renderNext(root) {
  root.innerHTML = `<div class="page"><h1>Where to go next</h1><div class="prose">
    <p>This course is about AI security: how AI systems get attacked and how to protect them. If you want to go deeper, these are the places I would send a friend. Each does something this course does not.</p>
    ${NEXT.map((o) => `<section class="card next-card" style="margin-top:16px" data-testid="next-${o.name.split(' ')[0].toLowerCase()}"><h2 style="margin-top:0"><a href="${esc(o.url)}" target="_blank" rel="noopener">${esc(o.name)}</a></h2><p>${esc(o.line)}</p>${o.items.length ? `<ul>${o.items.map(([t, u, l]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener"><b>${esc(t)}</b></a>: ${esc(l)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
    <h2>Which one first?</h2>
    <ul><li>Want the big picture, with no code: BlueDot’s The Future of AI, then AGI Strategy.</li><li>Want to attack models: Jailbroken, alongside Phase 04 and the Builder track here.</li><li>Want to work on alignment research: BlueDot’s Technical AI Safety, then the ARENA curriculum.</li></ul>
    <p class="muted">Course details (length, format, dates) were checked on the course websites on 27 October 2026 and can change. Check the course page before you sign up.</p>
    <p><a href="#/learn/10-01">Careers and paths into AI safety (lesson 10.01)</a> · <a href="#/">Back to the course</a></p>
  </div></div>`;
  return 'Where to go next';
}

export function renderAbout(root) {
  root.innerHTML = `<div class="page"><h1>About and sources</h1><div class="prose">
    <p>AI Safety from Scratch is a free, hands-on course in AI security. You learn how AI systems get attacked and how they go wrong, then try it in simulated labs: prompt injection, jailbreaks, agents with tools, and agents that can spend money or sign transactions.</p>
    <p>It is for people who build with AI and for anyone curious about how the attacks work. The Foundations track needs no code. The Builder track (Phase 11) has you test your own app with open-source tools.</p>
    <h2>How it is organised</h2><p>The course uses the split that is standard in AI safety: <b>misuse</b> (people using AI to do harm), <b>misalignment</b> (AI doing what we said, not what we meant) and <b>loss of control</b> (keeping AI systems contained and watched). Phase 00 explains the three and why many researchers treat them as one problem. Phases 04 to 06 and the Builder track are the security core.</p>
    <h2>A note from me</h2><p>I’m Francesco Andreoli. The first version of this course split AI risk into mistakes, misuse and control, and filed reward hacking under control. An AI-safety practitioner who reviewed it pointed out that the field files it under misalignment and treats loss of control as its own area. She was right, so on 27 October 2026 I restructured the course around that split and moved the focus to what I know best: security.</p>
    <p>When you want to go further, see <a href="#/next">Where to go next</a>.</p>
    <h2>How facts are handled</h2><p>Every fact links to a source that was opened and read on the “checked” date. Anything not yet confirmed is marked <span class="flag">NEEDS SOURCED DATA</span>. Sources are re-checked every quarter. Last full check: ${fmtDate(LAST_CHECKED)}.</p>
    <h2>Labs</h2><p>All labs are simulations in your browser: scripted or rule-based toys. No API keys, no data sent anywhere, and you are never asked to attack a real service.</p>
    <h2>Sister course</h2><p><a href="${esc(SECURITY_URL)}" target="_blank" rel="noopener">Security from Scratch</a> teaches everyday digital safety for older adults and their families.</p>
    <h2>Source list</h2><ol class="sources-list">${sources.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>, ${esc(s.publisher)}${s.date ? `, ${esc(s.date)}` : ''}. Checked ${esc(s.checked)}.</li>`).join('')}</ol></div></div>`;
  return 'About and sources';
}

// Lab clip contract: #/lab/<name>?state=<preset>&layout=9x16, accent from --accent.
export function renderLabClip(root, name) {
  const l = labs[name]; if (!l?.ready) return nf(root, 'Lab');
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  const vertical = q.get('layout') === '9x16';
  root.innerHTML = `<div class="page" style="${vertical ? 'max-width:420px' : ''}"><p class="kicker"><a href="#/labs">All labs</a></p><div data-clip></div></div>`;
  mountLab(root.querySelector('[data-clip]'), name, { state: q.get('state') || '' });
  return l.title;
}
export { course };
