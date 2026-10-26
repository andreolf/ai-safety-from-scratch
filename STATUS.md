# Status: AI Safety from Scratch (draft, not launched)

Last updated 26 Oct 2026 (Asia/Makassar).

## Done
- Scaffold, Signal design system (kit tokens 1.0.0, locked), engine, 9 of 15 labs (all labs for Phases 00–06, including the flagships Fake Inbox and Agent Permission Simulator, plus Trifecta Switchboard).
- **Lessons 43 of 72**: Phases 00 (4), 01 (7), 02 (7), 03 (6), 04 (7), 05 (6), 06 (6). Every lesson has at least one visual, a mascot scene, an exercise with a worked solution, 3 quiz questions and a sources list.
- Phase tests (10 questions, pass at 80%, deterministic draw) open for Phases 00–06.
- Certificates (PNG and PDF, not accredited) and the verify page.
- Labs page (`#/labs`): every lab is playable inline in its own section, mounted lazily with IntersectionObserver, paused when off-screen, with a sticky number mini-nav and `#/labs#lab-NN` anchors. Labs inside lessons link to their section (“All labs →”). Unbuilt labs show a compact locked teaser. Security from Scratch should use the same pattern.
- “Points”, never “XP”, in all user-facing text; a unit test fails if “XP” appears in built HTML, JSON, JS strings, lessons, content or the README.
- Phase 06 shows the full disclosure note at the top of the phase page and of lesson 06.01. MetaMask is not named in Phase 06 lessons.
- Checks: `npm run check` (lesson checker plus theme guard). Tests: `npm run test:unit` and `npm run test:e2e`, using the device matrix with `--workers=1`.

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
- **EUR-Lex:** still serves a bot challenge (HTTP 202). The official Commission AI Act Explorer (ai-act-service-desk.ec.europa.eu) returns 200 for Regulation (EU) 2024/1689 and mentions a consolidated version dated 27 July 2026 and the "Digital Omnibus on AI". Re-read both before writing Phase 09.
- **consilium.europa.eu:** not re-tried this session (earlier attempts gave 403 or timed out).
- **OpenAI, Atlas prompt-injection post (22 Dec 2025):** read, and quoted in lesson 01.06.
- **FTC:** the 2023 alert was replaced by "Scammers Use Fake Emergencies To Steal Your Money". That page was verified with a browser-style fetch; curl gets 404 because the site blocks bots.

## Verified 26 Oct 2026 (Phases 04–06)
- Kit spending-limits figure quotes: ethskills wallets “Anything that moves funds gets a gate…” and OWASP LLM01 mitigation 5 “Require human approval for high-risk actions…”, both found word for word.
- The draft’s NEEDS SOURCED DATA item “no complete fix for prompt injection” is now cited to OpenAI (22 Dec 2025, “unlikely to ever be fully ‘solved’”) and OWASP LLM01 (“unclear if there are fool-proof methods”), in lesson 04.05.
- OWASP Agentic Top 10 2026 (9 Dec 2025) read in the PDF; Lakera Agent Breaker rules read; x402.org, ERC-7715 (Draft), MCP security best practices and Willison (2022, 2025) read.
- Not cited: x402 usage statistics; Tenderly, MCP Inspector and Snyk agent-scan (left for the Builder track, not re-read); MetaMask Smart Accounts Kit (not mentioned).

## Needs verification before use
- Lesson 03.05: the 5-step investment-scam flow is general background. It is attributed to Security from Scratch 08.03–08.05, whose sources need to be carried over.
- Lesson 02.04: "the EU AI Act treats hiring, loans and school places as high-risk". Confirm against Annex III when writing Phase 09.
- Links to Security from Scratch point to the planned sister site, which is not built yet, so they will 404 until it is.

## Remaining
Phases 07 (5 lessons), 08 (6), 09 (6), 10 (5) and 11 (7): 29 lessons and 6 labs.

## Notes
- The build was done locally on the box, because no CloudAgent was available.
- The draft preview is unlisted: it has a "Draft preview" banner on every page, robots noindex/nofollow, and a robots.txt with `Disallow: /`.
