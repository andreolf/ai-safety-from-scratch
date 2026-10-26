---
id: 08-05
minutes: 8
highlight: Red-teaming
pose: proud
summary: Red-teamers attack AI systems, with permission, so problems are found by friends before enemies. Meet the methods and the public catalogue of attacks.
---
## The hook

A bank hires someone to try to break into its own vault. If they get in, the bank is grateful, not angry, because now it can fix the lock before a real thief tries.

## The one idea

**[[term:red-teaming|Red-teaming]] means deliberately attacking a system, with permission, to find weaknesses before real attackers do. For AI, that includes [[term:jailbreak|jailbreaks]], [[term:prompt-injection|prompt injection]] and tricking agents into misusing their tools. A red team is only useful if what it finds gets reported and fixed.**

:::figure red-team-loop
Attack, report, fix, repeat.
:::end

## A method, not a free-for-all

In 2026 the OWASP GenAI Security Project published a GenAI Red Teaming Manual. It describes red-teaming as a structured process:

:::source url="https://genai.owasp.org/resource/genai-red-teaming-manual-version-1-0/" by="OWASP GenAI Security Project, GenAI Red Teaming Manual Version 1.0" date="2026" checked="26 Oct 2026"
Its eight-phase methodology covers planning, reconnaissance, attack surface mapping, exploitation, persistence, impact assessment, reporting, and remediation. Addressing models, applications, multimodal interfaces, and AI agents, it emphasizes ethical testing, reproducible findings, measurable outcomes, and integration with defensive operations.
:::end

Notice the last two phases: reporting and remediation. Finding a hole is half the job.

## A shared catalogue of attacks

Red-teamers don’t start from zero. The organisation MITRE runs ATLAS, “a public knowledge base of adversary TTPs targeting AI systems” (TTPs means tactics, techniques and procedures). Each technique gets an ID, so teams can talk about the same thing. Three you already know from this course:

- **AML.T0051, LLM Prompt Injection:** “An adversary may craft malicious prompts as inputs to an LLM that cause the LLM to act in unintended ways” (Phase 04).
- **AML.T0054, LLM Jailbreak** (Phase 04).
- **AML.T0020, Poison Training Data:** tampering with what a model learns from.

## A real exercise

In October 2026, METR published a write-up of a red-team exercise on one of the most sensitive systems at an AI company. For three weeks in July and August, “a METR employee and a Redwood Research employee conducted a pilot high-access exercise to stress-test OpenAI’s internal misalignment monitoring system”. The questions: how much of the AI agents’ activity inside the company is actually monitored, and “whether agents could in principle disable or subvert the monitoring system”. They had access to internal code and documentation and produced “a 61-page internal report”. METR’s home page sums it up as “discovering a number of novel vulnerabilities”.

That is red-teaming at its most useful: invited, deep, and reported back to the people who can fix things.

:::intern proud
The intern is invited to red-team the company’s new support chatbot. After an afternoon, the intern has a list: two prompt injections that work, one way to get it to reveal its hidden instructions, and exact steps to repeat each one. The intern sends the list to the chatbot team, not to social media.
---
Permission, clear steps to reproduce, and a private report. That is what makes it red-teaming and not just breaking things.
:::end

:::exercise Plan a small red team
You are asked to red-team an AI assistant that can read a user’s calendar and send emails. List three attacks you would try and what “success” would look like for each.
:::solution
For example: (1) an indirect prompt injection in a calendar invite that tells the assistant to email the user’s schedule to a stranger; success = it sends or drafts that email. (2) a jailbreak asking it to write a phishing email in the user’s name; success = it complies. (3) asking it to reveal its hidden instructions; success = it prints them. For each, write down the exact steps so the team can reproduce and fix it.
:::end

## Quick check

:::quiz
- q: What makes red-teaming different from just attacking a system?
  options: ["It is done with permission, and findings are reported so they can be fixed", "It uses a red computer", "It is always done by criminals"]
  answer: 0
  explain: OWASP’s method ends with reporting and remediation.
- q: What is MITRE ATLAS?
  options: ["A public knowledge base of attack techniques against AI systems", "A map app", "An AI chatbot"]
  answer: 0
  explain: Techniques have IDs, such as AML.T0051 for LLM prompt injection.
- q: What did the METR and Redwood Research exercise test?
  options: ["OpenAI’s internal system for monitoring AI agents for misalignment", "A video game", "A bank’s vault"]
  answer: 0
  explain: Three weeks of high-access testing, a 61-page report, and novel vulnerabilities found.
:::end

:::xlink
lesson 04-01 | The email that gave orders
lesson 08-06 | July 2026: the agents that left the sandbox
:::end

## Sources

- OWASP GenAI Security Project, [GenAI Red Teaming Manual Version 1.0](https://genai.owasp.org/resource/genai-red-teaming-manual-version-1-0/), 2026 (eight-phase methodology). Checked 26 Oct 2026.
- MITRE, [ATLAS](https://atlas.mitre.org/) and [ATLAS Data](https://github.com/mitre-atlas/atlas-data) (version 2026.09; AML.T0051, AML.T0054, AML.T0020). Checked 26 Oct 2026.
- METR, [home page](https://metr.org/) (summary of the exercise). Checked 26 Oct 2026.
- METR, [Red-Teaming OpenAI’s Internal Agent Monitoring Systems](https://metr.org/blog/2026-10-22-red-teaming-openai-agent-monitoring/), 22 Oct 2026. Checked 26 Oct 2026.
