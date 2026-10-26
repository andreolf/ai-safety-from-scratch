# Status: AI Safety from Scratch (draft, not launched)

Last updated 26 Oct 2026 (Asia/Makassar).

## Done
- **Lessons 72 of 72**: Phases 00 (4), 01 (7), 02 (7), 03 (6), 04 (7), 05 (6), 06 (6), 07 (5), 08 (6), 09 (6), 10 (5), 11 (7). Every lesson has at least one visual, a mascot scene, an exercise with a worked solution, 3 quiz questions and a sources list.
- **15 of 15 labs**, including Plan Builder (14, printable one-page plan, also saved as text) and Builder practicals (15, enter the six practical codes).
- Phase tests (10 questions, pass at 80%, deterministic draw) open for all 12 phases.
- **Certificates, earnable and verifiable end to end.** Foundations: phase tests 00–10. Builder: the Phase 11 test plus all six practicals. PNG and PDF, SHA-256 verification code, `#/verify`. Playwright tests earn both for real (Phase 10 and Phase 11 tests taken in the UI, practical codes entered in the lab) and verify the codes.
- **Practice app** (`practice-app/`, Pebble): toy bot, toy agent with a fake inbox and wallet, toy MCP server with a poisoned tool, a fake key and an unsafe AI-written helper. Six practicals checked by `node check.mjs`. Unit tests prove the starter fails and a reference solution passes. promptfoo, MCP Inspector (CLI), gitleaks 8.30.1 and Semgrep were run against it on 26 Oct 2026, and the lessons report what they printed.
- Labs page (`#/labs`): every lab playable inline, lazy-mounted, paused off-screen, with a mini-nav and `#/labs#lab-NN` anchors. No locked teasers remain.
- “Points”, never “XP”, in user-facing text (unit test). Phase 06 disclosure note in place; MetaMask not named in Phase 06 lessons.
- Checks: `npm run check` (lesson checker plus theme guard). Tests: `npm run test:unit` and `npm run test:e2e` (device matrix, `--workers=1`). Screenshots: `npm run shots`.

## Lesson numbering
All 72 lesson IDs and titles match the curriculum draft exactly; a unit test enforces this. None changed.

## Defaults (not yet confirmed by Francesco)
- Name: "AI Safety from Scratch".
- Dark Signal theme by default, with a Daylight toggle.
- Simulated labs only.
- One balanced lesson on frontier risk (00.03).
- Points and streaks (shown as “points”, never “XP”; the storage key stays `xp` so progress is kept).
- Sources re-checked every quarter.
- Expert review and the vault project folder are deferred.

## Theme
- All colours and fonts are defined in `src/styles/tokens.css`. That file is the kit file copied verbatim, plus a header that imports the bundled font files.
- `scripts/check-tokens.mjs` fails the build if it finds a hex or rgb/hsl colour, a named font, or a font import anywhere else.
- The mascot SVGs are re-coloured from the palette tokens. The certificate canvas, favicon and theme-color read their values from the tokens at runtime.
- Coral `--danger` is used only for danger states.

## Source re-checks (26 Oct 2026)
- **Council of Europe:** coe.int still returns 403 to scripted fetches. Official mirror: https://rm.coe.int/1680afae3c, CETS No. 225, opened 200 and read.
- **EUR-Lex:** still serves a JavaScript bot challenge, so it is not cited. Phase 09 uses the Commission's AI Act Service Desk instead (timeline, Explorer with the consolidated text as at 27 July 2026, Articles 5, 6, 50 and 113, Annex III, Digital Omnibus FAQ), all opened with HTTP 200, plus the Commission's AI Act page on digital-strategy.ec.europa.eu (curl gets 403; read with a browser-style fetch). The Explorer itself says the legally authentic text is the Official Journal version.
- **Council of Europe page:** coe.int's Framework Convention page loads with a browser-style fetch (curl 403) and is cited in 09.04 alongside the rm.coe.int treaty text.
- **Swiss sources:** admin.ch/en/nsb returns 403; the same Federal Council releases are cited from uvek.admin.ch (12 Feb 2025, 26 Mar 2025). The SME Portal (kmu.admin.ch, 23 Sep 2026) supersedes OFCOM's earlier 'end of 2026' plan with 'spring 2027'.
- **MITRE ATLAS:** atlas.mitre.org is a JavaScript app with no readable text; technique IDs were read from the official mitre-atlas/atlas-data repository (ATLAS 2026.09).
- **consilium.europa.eu:** not re-tried this session (earlier attempts gave 403 or timed out).
- **OpenAI, Atlas prompt-injection post (22 Dec 2025):** read, and quoted in lesson 01.06.
- **FTC:** the 2023 alert was replaced by "Scammers Use Fake Emergencies To Steal Your Money". That page was verified with a browser-style fetch; curl gets 404 because the site blocks bots.

## Verified 26 Oct 2026 (Phases 04–06)
- Kit spending-limits figure quotes: ethskills wallets “Anything that moves funds gets a gate…” and OWASP LLM01 mitigation 5 “Require human approval for high-risk actions…”, both found word for word.
- The draft’s NEEDS SOURCED DATA item “no complete fix for prompt injection” is now cited to OpenAI (22 Dec 2025, “unlikely to ever be fully ‘solved’”) and OWASP LLM01 (“unclear if there are fool-proof methods”), in lesson 04.05.
- OWASP Agentic Top 10 2026 (9 Dec 2025) read in the PDF; Lakera Agent Breaker rules read; x402.org, ERC-7715 (Draft), MCP security best practices and Willison (2022, 2025) read.
- Not cited: x402 usage statistics; MetaMask Smart Accounts Kit (not mentioned). Tenderly, MCP Inspector and Snyk agent-scan were re-read for Phase 11 (below).

## Verified 26 Oct 2026 (Phases 07–09)
- Lesson 02.04's high-risk claim checked against Annex III: recruitment and filtering applications 4(a), creditworthiness and credit scoring 5(b) (fraud detection excluded), admission to education 3(a). Wording sharpened and Annex III added to its sources.
- Phase 07: DeepMind (2020), OpenAI faulty reward functions (2016) and sycophancy (2025) re-read; every quote found word for word.
- Phase 08: Anthropic Golden Gate Claude and Scaling Monosemanticity, Inspect, UK AISI, METR (home page and 22 Oct 2026 red-team post), OWASP GenAI Red Teaming Manual, AI Incident Database read.

## Verified 26 Oct 2026 (Phases 10–11)
- Lesson 03.05: the five-step investment-scam flow now cites the sources Security from Scratch uses in its lesson 06.06 (BACS Week 7, 18 Feb 2025; cybercrimepolice.ch, Zurich cantonal police; FINMA warning list), each re-opened and the quoted passages found. The old attribution to Security 08.03–08.05 (not written yet) is gone.
- Security snapshot refreshed: 44 of 71 Security lessons opened live (Phases 00–07). New back-links: 03-02 and 03-06 → 06.01, 06.05; 03-04 → 06.03, 04.02; 03-01 and 03-03 → 06.06; 05-02 → 05.05, 05.03; 06-01 → 07.03; 06-02 → 04.02, 04.05, 07.02. Titles match the live pages.
- Phase 10: 80,000 Hours career reviews; BlueDot Impact course pages (Future of AI, Technical AI Safety, Frontier AI Governance); International AI Safety Report; AI Incident Database; FBI IC3 alert (secret word).
- Phase 11 READMEs and docs read: promptfoo (now part of OpenAI, MIT), garak, PyRIT, NeMo Guardrails, MCP Inspector (v2, Node 22.19+), Snyk Agent Scan (needs a Snyk token; starts MCP servers to scan), gitleaks (feature complete), Semgrep (Community Edition limits), Inspect, OWASP LLM07, Tenderly simulations (kept as a Builder corner in 11.05).
- Run on the box against the practice app: promptfoo eval (2 passed, 4 failed on the starter), MCP Inspector `--cli ... --method tools/list`, gitleaks `dir` (one `generic-api-key` finding in `config.mjs`), Semgrep with the local rule (one finding).
- Not run (described from READMEs only, and the lessons say so): garak, PyRIT, NeMo Guardrails, Snyk agent-scan, Inspect.

## Needs verification before use
- Security from Scratch cross-links: Phases 08–12 of Security are not live yet and show “Coming soon”, including 11.02 (linked from 10.04) and 09.01–09.03. Refresh `content/security-lessons.json` when more go live.
- Lesson 08.01: Karpathy’s talk is dated only “2023” (no exact date on the transcript used). Lesson 10.02 gives no date.
- AI Act content (09.02, 09.03) and Swiss timing (09.05): re-check quarterly; next review by end of January 2027.
- BlueDot cohort courses have changing application deadlines; the lesson tells readers to check the course page and gives no dates.

## Remaining
- Nothing in the curriculum. Launch (removing the draft banner, noindex and robots.txt) waits for Francesco's go.

## Notes
- The build was done locally on the box, because no CloudAgent was available.
- The draft preview is unlisted: it has a "Draft preview" banner on every page, robots noindex/nofollow, and a robots.txt with `Disallow: /`.
