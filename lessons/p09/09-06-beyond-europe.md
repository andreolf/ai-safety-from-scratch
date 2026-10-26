---
id: 09-06
minutes: 8
highlight: Beyond
pose: proud
summary: Outside Europe, much AI governance is voluntary. Meet the US NIST AI Risk Management Framework and its four functions, plus the international efforts that connect countries.
---
In the United States, the best-known federal reference for managing AI risk is not a law. It is the NIST AI Risk Management Framework, released on 26 January 2023, and following it is voluntary.

Not every country regulates AI with a binding law. A common alternative is a voluntary framework: guidance that organisations choose to follow. One example, the NIST AI Risk Management Framework from the US government, organises the work into four functions: govern, map, measure and manage. International efforts such as the Council of Europe Convention and the International AI Safety Report connect countries across these different approaches.

:::figure nist-functions
NIST’s four functions, with “govern” running through all of them.
:::end

## The NIST AI Risk Management Framework

NIST, the US National Institute of Standards and Technology, published the framework in 2023:

:::source url="https://www.nist.gov/itl/ai-risk-management-framework" by="NIST, AI Risk Management Framework" date="" checked="26 Oct 2026"
The NIST AI Risk Management Framework (AI RMF) is intended for voluntary use and to improve the ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems. Released on January 26, 2023, the Framework was developed through a consensus-driven, open, transparent, and collaborative process
:::end

Its core “is composed of four functions: govern, map, measure, and manage.” Govern is “a cross-cutting function” that runs through the other three. NIST stresses that its actions “do not constitute a checklist, nor are they necessarily an ordered set of steps.” In plain terms:

- **Govern:** set up responsibility, policies and a culture of managing risk.
- **Map:** understand the context: what the system is for, who it affects, what could go wrong.
- **Measure:** test and track those risks (Phase 08’s evals and red-teaming fit here).
- **Manage:** act on what you found: fix, limit, monitor, or decide not to deploy.

The framework keeps evolving. In July 2024 NIST added a Generative AI Profile for risks specific to generative AI. NIST’s page says the AI RMF 1.0 “is being revised as part of the White House AI Action Plan”, and in April 2026 NIST released a concept note for a profile on AI in critical infrastructure.

## Connecting countries

- **The Council of Europe Convention** (lesson 09.04) is open to countries worldwide. Its signatories include the United States, Canada, Japan, Israel and Uruguay as well as European states.
- **The International AI Safety Report 2026** was written “with guidance from over 100 independent experts, including nominees from more than 30 countries and international organisations, such as the EU, OECD, and UN.” It reports that AI risk management “remain[s] largely voluntary”, while “a small number of regulatory regimes are beginning to formalise some risk management practices.”

Voluntary and binding approaches are not opposites. A company that follows NIST’s functions will find much of the work overlaps with what the EU AI Act requires for high-risk systems: risk assessment, testing, documentation and human oversight.

:::intern proud
The intern’s team adopts the NIST framework. In the first week the intern maps every AI tool the company uses, writes down who each one affects, and finds a CV-screening tool nobody had reviewed. The intern takes it to the manager before buying anything new.
---
Govern, map, measure, manage. You can start on the first two this afternoon, with a spreadsheet.
:::end

:::exercise Map one tool
Pick one AI tool you or your workplace uses. Apply NIST’s functions in one sentence each: who is responsible for it (govern), what it is used for and who it affects (map), how you would check it works well (measure), and what you would do if it failed (manage).
:::solution
Example for a meeting-notes AI: Govern: the team lead owns the decision to use it. Map: it records meetings, so it affects everyone in them, including guests who may not have agreed. Measure: compare its summaries with a human’s notes for five meetings and count errors. Manage: tell participants it is running, let them opt out, and stop using it for confidential meetings.
:::end

## Quick check

:::quiz
- q: What are the four functions of the NIST AI Risk Management Framework?
  options: ["Govern, map, measure, manage", "Plan, build, sell, repeat", "Ban, allow, tax, ignore"]
  answer: 0
  explain: Govern runs through the other three.
- q: Is the NIST AI RMF a law?
  options: ["No, it is intended for voluntary use", "Yes, with fines in every country", "It is the EU AI Act under another name"]
  answer: 0
  explain: NIST says it is intended for voluntary use.
- q: Which statement about the International AI Safety Report 2026 is correct?
  options: ["It drew on over 100 independent experts, including nominees from more than 30 countries and organisations such as the EU, OECD and UN", "It was written by one company", "It is a law"]
  answer: 0
  explain: It reports that most AI risk management is still voluntary.
:::end

:::xlink
lesson 09-04 | The Council of Europe AI Convention
lesson 08-04 | Who tests frontier AI?
:::end

## Sources

- NIST, [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (voluntary, released 26 January 2023, Generative AI Profile, revision, critical infrastructure concept note). Checked 26 Oct 2026.
- NIST AI Resource Center, [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) (four functions, not a checklist). Checked 26 Oct 2026.
- Council of Europe, [The Framework Convention on Artificial Intelligence](https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence) (signatories). Checked 26 Oct 2026.
- International AI Safety Report, [2026 Report: Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
