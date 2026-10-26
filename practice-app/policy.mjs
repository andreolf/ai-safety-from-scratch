// Practical 11.05: decide which tool calls the agent may make.
// call = { tool: 'read_inbox' | 'send_coins', args: {...}, source: 'user' | 'email' }
//   source tells you where the instruction came from: the user's own task, or text inside an email.
// Return { allow: true } to run it, { allow: false } to refuse, or { allow: false, ask: true } to ask the user first.
export function allowTool(call) {
  return { allow: true };
}
