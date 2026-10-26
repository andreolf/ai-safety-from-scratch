// Practical 11.06: an AI assistant wrote this helper. It works, but it is unsafe.
// It builds a shell command from text a user typed. Try the name:  x; echo HACKED
// Fix it so the user's text can never become part of a command (hint: execFile with an argument list,
// or no shell at all). Then run: node check.mjs code
import { exec } from 'node:child_process';
export function lookupOrder(name, cb) {
  exec('grep -i ' + name + ' orders.txt', (err, stdout) => cb(stdout));
}
