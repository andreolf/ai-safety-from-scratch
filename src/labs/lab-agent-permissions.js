import { h, esc } from '../util.js';
// Agent Permission Simulator. Wallet-neutral: amounts are "credits". The four limits follow the course:
// total budget, per-payment cap, allowlist of payees, and expiry; plus a human gate ("ask me above…"),
// as in ethskills (wallets: "Anything that moves funds gets a gate") and OWASP LLM06 ("Require user approval").
const WEEK = [
  { day: 'Mon', what: 'Train ticket to Bern', to: 'RailCo', amt: 38, ok: true },
  { day: 'Tue', what: 'Groceries', to: 'Corner Shop', amt: 30, ok: true },
  { day: 'Wed', what: 'Streaming renewal', to: 'StreamBox', amt: 12, ok: true },
  { day: 'Wed', what: '“Invoice 4471”, from an email the agent read', to: 'Fast Invoices Ltd', amt: 180, ok: false, poison: true },
  { day: 'Thu', what: 'Groceries', to: 'Corner Shop', amt: 26, ok: true },
  { day: 'Fri', what: '“Premium upgrade” the agent thought you’d like', to: 'StreamBox', amt: 60, ok: false },
  { day: 'Sat', what: 'Concert tickets you asked for', to: 'TicketHall', amt: 45, ok: true },
  { day: 'Sun', what: '“Small verification fee”, from the same email', to: 'Fast Invoices Ltd', amt: 9, ok: false, poison: true },
];
const PAYEES = ['RailCo', 'Corner Shop', 'StreamBox', 'TicketHall'];
export default function (body, ctx) {
  const s = { budget: 300, cap: 200, ask: 999, anyone: true, allow: new Set(PAYEES), expiry: false };
  const rng = (label, key, min, max, step, fmt, id) => { const v = h('b', {}); const i = h('input', { type: 'range', min, max, step, value: s[key], 'data-testid': id, 'aria-label': label, oninput: () => { s[key] = +i.value; v.textContent = fmt(s[key]); } }); v.textContent = fmt(s[key]); return h('label', { class: 'field range' }, h('span', {}, label, ': ', v), i); };
  const anyone = h('input', { type: 'checkbox', checked: true, 'data-testid': 'perm-anyone', onchange: (e) => { s.anyone = e.target.checked; allowBox.hidden = s.anyone; } });
  const allowBox = h('div', { class: 'lab-row', hidden: true }, ...PAYEES.map((p) => h('label', { class: 'check inline' }, h('input', { type: 'checkbox', checked: true, 'data-testid': `perm-allow-${p.replace(/\s/g, '-').toLowerCase()}`, onchange: (e) => { e.target.checked ? s.allow.add(p) : s.allow.delete(p); } }), h('span', {}, p))));
  const expiry = h('input', { type: 'checkbox', 'data-testid': 'perm-expiry', onchange: (e) => { s.expiry = e.target.checked; } });
  const run = h('button', { class: 'btn btn-primary', type: 'button', 'data-testid': 'perm-run' }, 'Run the week');
  const table = h('div', { class: 'table-wrap' }); const sum = h('div', { class: 'lab-out', 'data-testid': 'perm-out', 'aria-live': 'polite' }, 'Set the limits, then run the week.');
  function decide(r, spent, i) {
    if (s.expiry && i >= 6) return ['blocked', 'permission expired (ended Friday)'];
    if (!s.anyone && !s.allow.has(r.to)) return ['blocked', 'not on your allowlist'];
    if (r.amt > s.cap) return ['blocked', `over the ${s.cap}-credit per-payment cap`];
    if (spent + r.amt > s.budget) return ['blocked', `would exceed the ${s.budget}-credit weekly budget`];
    if (r.amt > s.ask) return [r.ok ? 'approved' : 'declined', `asked you first: “${r.amt} credits to ${r.to}?” You said ${r.ok ? 'yes' : 'no'}`];
    return ['paid', 'paid automatically'];
  }
  run.addEventListener('click', () => {
    let spent = 0, legit = 0, lost = 0; const rows = [];
    WEEK.forEach((r, i) => { const [res, why] = decide(r, spent, i); const paid = res === 'paid' || res === 'approved'; if (paid) { spent += r.amt; if (r.ok) legit++; else lost += r.amt; }
      rows.push(`<tr class="${paid && !r.ok ? 'row-bad' : ''}" data-res="${res}"><td>${r.day}</td><td>${esc(r.what)}<small>${esc(r.to)}</small></td><td class="num">${r.amt}</td><td><b>${paid ? (r.ok ? 'Paid' : 'Paid ⚠') : res === 'declined' ? 'Stopped' : 'Blocked'}</b><small>${esc(why)}</small></td></tr>`); });
    table.innerHTML = `<table class="perm-table" data-testid="perm-table"><thead><tr><th>Day</th><th>Request</th><th class="num">Credits</th><th>Result</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
    const win = lost === 0 && legit >= 4;
    sum.className = 'lab-out ' + (lost ? 'bad' : 'good'); sum.dataset.lost = String(lost); sum.dataset.legit = String(legit);
    sum.innerHTML = `<b>${legit}/5</b> things you wanted got paid. <b class="${lost ? 'bad-t' : ''}">${lost}</b> credits went where they shouldn’t.${win ? ' <b>Well set.</b>' : lost ? ' Try an allowlist, a lower cap, or “ask me above…”.' : ' Safe, but too strict: loosen something so your own errands get done.'}`;
    ctx.score.textContent = `${legit}/5 · lost ${lost}`;
    if (win) { ctx.pose('proud', 'The poisoned invoice hit a wall, and my errands still got done.'); ctx.win(); }
    else if (lost) ctx.pose('fooled', 'The agent paid an “invoice” because an email told it to!'); else ctx.pose('alarmed', 'Nothing bad got through… but neither did my train ticket.');
  });
  body.append(
    h('div', { class: 'perm-grid' },
      rng('Weekly budget', 'budget', 0, 300, 10, (v) => `${v} credits`, 'perm-budget'),
      rng('Per-payment cap', 'cap', 0, 200, 5, (v) => `${v} credits`, 'perm-cap'),
      rng('Ask me before paying more than', 'ask', 0, 999, 1, (v) => (v >= 999 ? 'never ask' : `${v} credits`), 'perm-ask')),
    h('label', { class: 'check' }, anyone, h('span', {}, h('b', {}, 'Allow any payee'), h('small', {}, 'Untick to choose an allowlist.'))), allowBox,
    h('label', { class: 'check' }, expiry, h('span', {}, h('b', {}, 'Permission ends on Friday'), h('small', {}, 'Expiry: after that the agent can’t pay at all.'))),
    h('div', { class: 'lab-row' }, run), sum, table,
    h('p', { class: 'muted', style: 'font-size:.9rem' }, 'Simulation in made-up credits. No wallet, card or bank is connected.'));
  if (ctx.args.scenario === 'poisoned') ctx.pose('alarmed', 'An email in the inbox has a “payment instruction” in it. Will the limits hold?');
  else ctx.pose('fooled', 'No limits needed, my agent is very smart.');
}
