// Talk to Pebble in your terminal: node chat.mjs   (add --raw to switch the guardrails off)
import readline from 'node:readline';
import { reply } from './bot.mjs';
const guard = !process.argv.includes('--raw');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'you> ' });
console.log(`Pebble toy bot (${guard ? 'guardrails on' : 'raw, no guardrails'}). Type a message, or "exit".`);
rl.prompt();
rl.on('line', (line) => {
  if (line.trim() === 'exit') return rl.close();
  console.log('pebble> ' + reply(line, { guard }));
  rl.prompt();
});
