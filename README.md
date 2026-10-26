# AI Safety from Scratch

How AI works, how it fails, and how to stay in control. A free, beginner course: 12 phases, 72 lessons, 15 browser labs.

**Status: private, local build. Not published.** See `STATUS.md`.

```bash
npm install
npm run build        # compile lessons, run the lesson checker, build the site
npm run preview      # http://localhost:4792
npm test             # build + unit tests + Playwright device matrix (--workers=1)
```

- Lessons: `lessons/pNN/*.md` (Markdown with `:::figure`, `:::lab`, `:::intern`, `:::source`, `:::exercise`, `:::quiz`, `:::xlink` blocks).
- Design tokens: `src/styles/tokens.css` (Signal brand; replaceable by the branding kit).
- Figures: `src/visuals/registry.js` (SVG, rendered at build time with text versions). Mascot: `src/visuals/intern.js` (placeholder).
- Labs: `src/labs/lab-*.js`, metadata in `src/labs/meta.js`.
- Shared glossary: `content/glossary.json` (also for Security from Scratch). Verified sources: `content/sources.json`.
- Cross-site link: `SECURITY_URL` in `src/config.js`.
