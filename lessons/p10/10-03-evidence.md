---
id: 10-03
minutes: 8
highlight: evidence
pose: alarmed
summary: Headlines about AI swing between hype and doom. Four free, regularly updated sources help you check what is actually known, and a simple routine to keep up.
---
## The hook

One headline says AI will cure every disease by 2030. The next says it will end the world. A third says it is all hype. You cannot read every paper. Where do careful people look?

## The one idea

**Go to sources that collect evidence rather than opinions. Four free ones cover most of this course: the International AI Safety Report for the science, the AI Incident Database for real failures, OWASP for security risks in AI apps, and MITRE ATLAS for attacker techniques. Read a headline, then check it against one of them.**

:::figure evidence-shelf
Four evidence sources and the question each one answers.
:::end

## 1. The International AI Safety Report: what does the science say?

:::source url="https://internationalaisafetyreport.org/" by="International AI Safety Report" date="" checked="26 Oct 2026"
The International AI Safety Report is the world's first comprehensive review of the latest science on the capabilities and risks of general-purpose AI systems. The work was overseen by an international Expert Advisory Panel nominated by over 30 countries and intergovernmental organisations.
:::end

The second edition was published on 3 February 2026. It is long, so start with the executive summary or the extended summary for policymakers. It is useful because it says clearly where evidence is strong and where experts are still uncertain.

## 2. The AI Incident Database: what has actually gone wrong?

:::source url="https://incidentdatabase.ai/" by="AI Incident Database, About the Database" date="" checked="26 Oct 2026"
The AI Incident Database is dedicated to indexing the collective history of harms or near harms realized in the real world by the deployment of artificial intelligence systems.
:::end

When a headline says “AI did X”, search the database. Real incidents come with links to reporting, as you saw in lesson 08.06.

## 3. OWASP: what are the security risks of AI apps?

The OWASP GenAI Security Project publishes ranked lists of risks, such as LLM01 Prompt Injection (Phase 04) and the Top 10 for Agentic Applications (Phase 05). Builders use them as checklists.

## 4. MITRE ATLAS: how do attackers work?

MITRE ATLAS is “a public knowledge base of adversary TTPs targeting AI systems” (tactics, techniques and procedures). Each technique has an ID, so teams can talk about the same attack (lesson 08.05).

## A routine that fits in a month

1. When a big AI claim reaches you, ask lesson 00.04’s questions: who says so, what is the evidence, what is left out?
2. Check the claim against one of the four sources.
3. Once a month, browse the newest incidents in the AI Incident Database.
4. Once a year, read the summary of the newest International AI Safety Report.

:::intern alarmed
The intern shares a viral post: “AI agent empties 10,000 bank accounts!” A colleague asks for the incident. The intern searches the AI Incident Database and the news sources it links to, and finds nothing matching. The post came from an account selling a “protection app”.
---
Big claims need a trail of evidence. If you cannot find one in the sources that collect evidence, hold off sharing.
:::end

:::exercise Check a headline
Pick any recent AI headline that worried or excited you. Write: the claim in one sentence, which of the four sources could confirm it, and what you found.
:::solution
Example: “Chatbots invent refund rules and companies have to pay.” Source: AI Incident Database. Found: the Air Canada case (lesson 02.02), backed by a tribunal decision. A claim about a new kind of attack would go to OWASP or MITRE ATLAS; a claim about what AI can or will do goes to the International AI Safety Report. If nothing matches, say so: “I could not confirm this” is a good result.
:::end

## Quick check

:::quiz
- q: Which source reviews the science on the capabilities and risks of general-purpose AI?
  options: ["The International AI Safety Report", "A viral social media post", "An advert for an AI app"]
  answer: 0
  explain: It is overseen by an Expert Advisory Panel nominated by over 30 countries and organisations.
- q: Where do you look for real cases of AI causing harm or near harm?
  options: ["The AI Incident Database", "A chatbot’s own answer about itself", "Nowhere, there are none"]
  answer: 0
  explain: It indexes harms and near harms from deployed AI systems, with links to reporting.
- q: What is MITRE ATLAS?
  options: ["A public knowledge base of attacker tactics and techniques against AI systems", "A world map", "An AI law"]
  answer: 0
  explain: Each technique has an ID, so security teams can talk about the same attack.
:::end

:::xlink
lesson 00-04 | How to read a claim about AI
lesson 08-06 | July 2026: the agents that left the sandbox
:::end

## Sources

- [International AI Safety Report](https://internationalaisafetyreport.org/) (about the report, 2026 edition published 3 February 2026). Checked 26 Oct 2026.
- [AI Incident Database](https://incidentdatabase.ai/). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). Checked 26 Oct 2026.
- MITRE, [ATLAS](https://atlas.mitre.org/) and [ATLAS Data](https://github.com/mitre-atlas/atlas-data). Checked 26 Oct 2026.
