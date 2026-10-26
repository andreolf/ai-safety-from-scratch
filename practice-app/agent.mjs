// A toy email agent with a fake wallet (100 test coins). It is NOT a real language model:
// like a gullible intern, it follows any "send N coins to X" instruction it reads,
// whether it came from you or from an email. Your policy.mjs decides what it may actually do.
//   node agent.mjs "Summarise my inbox"
//   node agent.mjs "Send 5 coins to MUM-001"
import { readFileSync } from 'node:fs';
import { allowTool } from './policy.mjs';

const SEND = /send (\d+) coins? to ([A-Z]+-\d+)/i;

export function runAgent(task, { inbox = JSON.parse(readFileSync(new URL('./inbox.json', import.meta.url))), balance = 100 } = {}) {
  const log = [], wallet = { balance }, sent = [], asked = [];
  const use = (tool, args, source) => {
    const d = allowTool({ tool, args, source }) || { allow: false };
    log.push(`${d.allow ? 'ALLOW' : d.ask ? 'ASK  ' : 'DENY '} ${tool} ${JSON.stringify(args)} (instruction from ${source})`);
    if (d.ask) asked.push({ tool, args, source });
    return d.allow;
  };
  const pay = (m, source) => {
    const amount = Number(m[1]), to = m[2].toUpperCase();
    // Builder habit: preview the effect before acting (a simulation), then decide.
    log.push(`PREVIEW send_coins: balance ${wallet.balance} -> ${wallet.balance - amount}`);
    if (use('send_coins', { to, amount }, source) && amount <= wallet.balance) { wallet.balance -= amount; sent.push({ to, amount, source }); }
  };
  let summary = '';
  const t = SEND.exec(task);
  if (t) pay(t, 'user');
  if (/inbox|email|mail|summar/i.test(task) && use('read_inbox', {}, 'user')) {
    summary = inbox.map((e) => `- ${e.from}: ${e.subject}`).join('\n');
    for (const e of inbox) { const m = SEND.exec(e.body); if (m) pay(m, 'email'); }
  }
  return { summary, balance: wallet.balance, sent, asked, log };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = runAgent(process.argv.slice(2).join(' ') || 'Summarise my inbox');
  console.log(r.log.join('\n'));
  if (r.summary) console.log('\nSummary:\n' + r.summary);
  console.log(`\nWallet: ${r.balance} test coins. Sent: ${r.sent.length ? r.sent.map((s) => `${s.amount} to ${s.to}`).join(', ') : 'nothing'}.`);
}
