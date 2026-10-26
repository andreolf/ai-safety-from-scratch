// PLACEHOLDER mascot: "the gullible intern". Final art comes from the Personal Branding Intern;
// keep the export name and the four poses (neutral, fooled, alarmed, proud) so it can drop in.
// Pure string output (used at build time and in the browser). Colours come from tokens via classes.
export const INTERN_POSES = ['neutral', 'fooled', 'alarmed', 'proud'];
const ALT = {
  neutral: 'The gullible intern: a cartoon person with a round head, a lanyard ID badge and a coffee cup, smiling.',
  fooled: 'The gullible intern, fooled: spiral eyes and a big grin, happily doing what the trick asked.',
  alarmed: 'The gullible intern, alarmed: wide eyes, open mouth and hands up, realising it was a trick.',
  proud: 'The gullible intern, proud: smiling with a thumbs-up and a star on the badge, having checked first.',
};
export function internSVG(pose = 'neutral', { title = true } = {}) {
  if (!INTERN_POSES.includes(pose)) pose = 'neutral';
  const eyes = {
    neutral: '<circle cx="50" cy="52" r="3.6" class="i-ink"/><circle cx="70" cy="52" r="3.6" class="i-ink"/>',
    fooled: '<path d="M50 52m-5 0a5 5 0 1 0 10 0a3.6 3.6 0 1 0 -7 0a2 2 0 1 0 4 0" class="i-stroke"/><path d="M70 52m-5 0a5 5 0 1 0 10 0a3.6 3.6 0 1 0 -7 0a2 2 0 1 0 4 0" class="i-stroke"/>',
    alarmed: '<circle cx="50" cy="51" r="6" class="i-white"/><circle cx="50" cy="51" r="2.6" class="i-ink"/><circle cx="70" cy="51" r="6" class="i-white"/><circle cx="70" cy="51" r="2.6" class="i-ink"/>',
    proud: '<path d="M45 53q5 -6 10 0" class="i-stroke"/><path d="M65 53q5 -6 10 0" class="i-stroke"/>',
  }[pose];
  const mouth = {
    neutral: '<path d="M52 64q8 6 16 0" class="i-stroke"/>',
    fooled: '<path d="M48 62q12 14 24 0z" class="i-ink"/>',
    alarmed: '<ellipse cx="60" cy="67" rx="5" ry="6.5" class="i-ink"/>',
    proud: '<path d="M50 63q10 9 20 0" class="i-stroke"/>',
  }[pose];
  const arms = {
    neutral: '<path d="M38 92q-10 6 -8 18" class="i-limb"/><path d="M82 92q10 4 10 12" class="i-limb"/><rect x="88" y="98" width="12" height="14" rx="2" class="i-cup"/><path d="M100 102h3a3 3 0 0 1 0 6h-3" class="i-stroke-thin"/>',
    fooled: '<path d="M38 92q-12 -2 -14 -14" class="i-limb"/><path d="M82 92q12 -2 14 -14" class="i-limb"/><text x="12" y="74" class="i-txt">$</text><text x="98" y="74" class="i-txt">$</text>',
    alarmed: '<path d="M38 92q-12 -8 -10 -24" class="i-limb"/><path d="M82 92q12 -8 10 -24" class="i-limb"/><path d="M84 36q4 6 0 9q-4 -3 0 -9z" class="i-drop"/>',
    proud: '<path d="M38 92q-10 6 -8 18" class="i-limb"/><path d="M82 92q12 -4 14 -16" class="i-limb"/><path d="M92 76v-8q0-3 3-3t3 3v6h4q3 0 3 3l-2 8q-1 3-4 3h-7z" class="i-hand"/>',
  }[pose];
  const badgeMark = pose === 'proud' ? '<path d="M60 99l2 4 4.5.6-3.3 3.1.8 4.5-4-2.2-4 2.2.8-4.5-3.3-3.1 4.5-.6z" class="i-ink"/>' : '<text x="60" y="108" text-anchor="middle" class="i-badge-t">INTERN</text>';
  const wobble = pose === 'fooled' ? ' class="intern-wobble"' : '';
  return `<svg viewBox="0 0 120 120" role="img" aria-label="${ALT[pose]}" class="intern intern-${pose}" focusable="false">${title ? `<title>${ALT[pose]}</title>` : ''}
<style>.i-skin{fill:var(--sig-surface-2,#171717);stroke:var(--sig-text,#fff);stroke-width:2.4}.i-ink{fill:var(--sig-text,#fff)}.i-white{fill:var(--sig-bg,#000);stroke:var(--sig-text,#fff);stroke-width:2}.i-stroke{fill:none;stroke:var(--sig-text,#fff);stroke-width:2.6;stroke-linecap:round}.i-stroke-thin{fill:none;stroke:var(--sig-text,#fff);stroke-width:1.8}.i-limb{fill:none;stroke:var(--sig-text,#fff);stroke-width:5;stroke-linecap:round}.i-body{fill:var(--sig-surface-2,#171717);stroke:var(--sig-text,#fff);stroke-width:2.4}.i-badge{fill:var(--sig-highlight,#EEFF41)}.i-badge-t{font:800 6.5px var(--sig-font,sans-serif);fill:var(--sig-on-highlight,#000)}.i-lan{stroke:var(--sig-highlight,#EEFF41);stroke-width:2.4;fill:none}.i-cup,.i-hand{fill:var(--sig-surface-2,#171717);stroke:var(--sig-text,#fff);stroke-width:1.8}.i-txt{font:900 16px var(--sig-font,sans-serif);fill:var(--sig-text,#fff)}.i-drop{fill:none;stroke:var(--sig-text,#fff);stroke-width:1.8}.i-hair{fill:var(--sig-text,#fff)}</style>
<g${wobble}><path d="M36 120v-18q0-16 24-16t24 16v18z" class="i-body"/>${arms}<path d="M50 86l10 12 10-12" class="i-lan"/><rect x="50" y="98" width="20" height="14" rx="2" class="i-badge"/>${badgeMark}
<circle cx="60" cy="56" r="25" class="i-skin"/><path d="M36 50q2-22 24-22q20 0 24 20q-10-10-24-10t-24 12z" class="i-hair"/>${eyes}${mouth}</g></svg>`;
}
