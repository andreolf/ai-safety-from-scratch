// "The gullible intern": art from the branding kit (src/assets/mascot/*.svg, synced by
// scripts/sync-kit.mjs, not edited here). The art uses white and ink colours, so it always sits on
// a black tile; that keeps it legible in both the Signal and Daylight themes.
import { MASCOT } from './mascot-svgs.js';
export const INTERN_POSES = ['neutral', 'fooled', 'alarmed', 'proud'];
export const INTERN_ALT = {
  neutral: 'The gullible intern, a friendly cartoon robot with a lanyard badge, looking ready to help.',
  fooled: 'The gullible intern, fooled: squeezed-shut happy eyes and a big grin, holding a paper.',
  alarmed: 'The gullible intern, alarmed: wide eyes and open mouth, realising it was a trick.',
  proud: 'The gullible intern, proud: smiling with a check mark, having verified first.',
};
export function internSVG(pose = 'neutral', { title = true } = {}) {
  if (!INTERN_POSES.includes(pose)) pose = 'neutral';
  const alt = INTERN_ALT[pose];
  const art = MASCOT[pose]
    .replace(/<title>[\s\S]*?<\/title>/, title ? `<title>${alt}</title>` : '')
    .replace(/\s(role|aria-label)="[^"]*"/g, '')
    .replace('<svg ', title ? `<svg role="img" aria-label="${alt}" focusable="false" class="intern intern-${pose}" ` : `<svg aria-hidden="true" focusable="false" class="intern intern-${pose}" `);
  return `<span class="intern-tile${pose === 'fooled' ? ' intern-wobble' : ''}">${art}</span>`;
}
