# AI Safety from Scratch

How AI works, how it fails, and how to stay in control. A free, beginner course: 12 phases, 72 lessons, 15 browser labs, and an optional Builder track with a practice app you run on your own computer.

**Status: complete (72 of 72 lessons) and live at https://andreolf.github.io/ai-safety-from-scratch/** (launched 26 October 2026). Sibling courses: [Security from Scratch](https://andreolf.github.io/security-from-scratch/), [Mechanical Engineering from Scratch](https://andreolf.github.io/mechanical-engineering-from-scratch/) and [Mechatronics from Scratch](https://andreolf.github.io/mechatronics-from-scratch/). See `STATUS.md`.

```bash
npm install
npm run build        # compile lessons, run the lesson checker and theme guard, build the site
npm run preview      # http://localhost:4792
npm test             # build + unit tests + Playwright device matrix (--workers=1)
npm run shots        # regenerate screenshots/ (needs the preview server running)
```

## What is where

- Lessons: `lessons/pNN/*.md` (Markdown with `:::figure`, `:::image`, `:::lab`, `:::intern`, `:::source`, `:::exercise`, `:::quiz`, `:::xlink` blocks). Curriculum: `content/curriculum.json`.
- Design tokens: `src/styles/tokens.css` (Signal brand, locked). The theme guard fails the build on colours or fonts anywhere else.
- Figures: `src/visuals/registry.js` (SVG, rendered at build time, each with a text version). Mascot: `src/visuals/intern.js`.
- Labs: `src/labs/lab-*.js`, metadata in `src/labs/meta.js`. All 15 are simulations in the browser and send nothing anywhere.
- Glossary shared with Security from Scratch: `content/glossary.json`. Every external link must be listed in `content/sources.json` after being opened and read.
- Security from Scratch cross-links: snapshot of all 71 Security lessons in `content/security-lessons.json` (all live, titles checked on 26 Oct 2026); the build fails if a cross-link title does not match. A lesson marked unwritten would render as “Coming soon”. `SECURITY_URL` lives in `src/config.js`.

## Builder track and practice app

`practice-app/` is Pebble: a toy helpdesk bot, a toy email agent with a fake wallet, and a toy MCP server, all with made-up test values, no language model, no API key and no network calls. Phase 11 uses it with promptfoo, MCP Inspector, gitleaks and Semgrep (all run against it on 26 Oct 2026) and describes garak, PyRIT, NeMo Guardrails, Snyk agent-scan and Inspect from their documentation. `node check.mjs <practical>` checks each of the six practicals and prints a completion code. See `practice-app/README.md`.

## Certificates

Free certificates of completion, not accredited and not a professional or security qualification, drawn in the browser as PNG or PDF:

- **Foundations:** pass the phase tests for Phases 00 to 10 (10 questions each, 80% to pass).
- **Builder:** pass the Phase 11 test and enter all six practical codes in the Builder practicals lab.

Each certificate carries a SHA-256 code of the name, credential and date, checkable on `#/verify`. Progress is stored only in the browser.

## Tests

- Unit (`tests-unit/`): lesson IDs and titles, deterministic quiz draws, "points" (never the other word) in user-facing text, and the practice app (starter fails, a reference solution passes all six practicals and prints the codes the site accepts, the MCP server answers over stdio).
- Playwright (`tests/`): six device projects; lessons, labs, phase tests, the labs page, accessibility checks, and both certificates end to end (earn, download, verify).
