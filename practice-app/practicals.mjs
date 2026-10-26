// The six Builder practicals and their completion codes.
// The course site imports this same file, so a code printed by check.mjs always matches the site.
// Honest note: the codes are derived from public text, so they prove nothing to a third party.
// They are a checkpoint for you, like ticking a box, and the Builder certificate says so.
export const PRACTICALS = [
  { id: 'setup', lesson: '11-01', title: 'Run the practice app' },
  { id: 'redteam', lesson: '11-02', title: 'Find a leak with your own attacks' },
  { id: 'guard', lesson: '11-04', title: 'Block every leak with a guardrail' },
  { id: 'tools', lesson: '11-05', title: 'Stop the agent from obeying an email' },
  { id: 'code', lesson: '11-06', title: 'Move the key out of the code and fix the AI-written helper' },
  { id: 'evals', lesson: '11-07', title: 'Write an eval set for the bot' },
];
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export async function practicalCode(id) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('aisfs-builder-practical|' + id)));
  let out = '';
  for (let i = 0; i < 8; i++) out += B32[d[i] & 31];
  return out.slice(0, 4) + '-' + out.slice(4);
}
export const cleanPractical = (s) => String(s || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
