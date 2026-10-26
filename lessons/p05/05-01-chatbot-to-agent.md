---
id: 05-01
minutes: 7
highlight: agent
summary: A chatbot answers. An agent acts. When AI can use your email, browser, files or money, its mistakes and tricks turn into actions.
---
Ask a chatbot to “book me a table for Friday” and it writes a nice paragraph about restaurants. Ask an AI [[term:agent|agent]] the same thing and it opens a booking site, picks a time, fills in your name and maybe pays the deposit.

Same request. Very different consequences if something goes wrong.

An agent is an AI that uses tools, such as email, a browser, files or payments, to do things for you, often several steps in a row without asking. That makes it useful, and it turns every mistake or trick into an action.

:::figure chat-to-agent
From words to actions, in three steps.
:::end

## Words versus actions

Everything from Phases 01 to 04 still applies to agents: they [[term:hallucination|make things up]], they can be [[term:sycophancy|people-pleasers]], and they can be fooled by [[term:prompt-injection|prompt injection]]. The difference is what happens next.

- A **chatbot** that is wrong gives you a wrong sentence. You can read it, doubt it and ignore it.
- An **agent** that is wrong may send the wrong email, delete the wrong file or pay the wrong person, before you notice.

OWASP, which tracks software security risks, described this in its 2025 list for AI apps. Its entry “Excessive Agency” says an AI app can cause damage when it has more functionality, more permissions or more autonomy than it needs. Its December 2025 list just for agents, the OWASP Top 10 for Agentic Applications 2026, opens with the problem from Phase 04:

:::source url="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/" by="OWASP Top 10 for Agentic Applications 2026, ASI01 Agent Goal Hijack" date="9 Dec 2025" checked="26 Oct 2026"
agents and the underlying model cannot reliably distinguish instructions from related content.
:::end

## Common agent tools

- **Email and messages:** read, draft, send.
- **Browser:** search, open pages, fill in forms.
- **Files and documents:** read, edit, share, delete.
- **Calendar and contacts.**
- **Payments:** cards, bank connections, crypto wallets. Phase 06 is about these.
- **Code:** some agents can run programs on a computer.

Each tool is a power. The rest of this phase is about choosing which powers to hand over, and when.

:::intern fooled
The intern gives a new agent full access to email, calendar and the company card, “so it can handle everything”. On day one it handles a lot: it accepts a meeting from a stranger, replies to a phishing email, and renews a software subscription nobody uses.
---
An agent does what it decides is your goal, using every power you gave it. Give it fewer powers.
:::end

:::exercise Chatbot or agent?
Which of these are agents? (1) An AI that writes a draft reply you copy and send yourself. (2) An AI that reads your inbox and sends replies automatically. (3) An AI browser that books flights for you. (4) An AI that explains a tax form.
:::solution
(2) and (3) are agents: they take actions with tools. (1) and (4) are chatbots: they produce words that you choose what to do with. For (1), you are the “approval step”, which is safer.
:::end

## Quick check

:::quiz
- q: What makes an AI an agent?
  options: ["It uses tools to take actions for you, often in several steps", "It answers questions very fast", "It has a friendly name"]
  answer: 0
  explain: Agents act through tools such as email, browsers, files or payments.
- q: Why are agent mistakes more serious than chatbot mistakes?
  options: ["They become actions, such as sending, deleting or paying, before you can check", "Agents make more spelling errors", "Agents are always less accurate"]
  answer: 0
  explain: A chatbot gives you words to judge. An agent acts.
- q: What does OWASP say agents and their models cannot reliably do?
  options: ["Distinguish instructions from related content", "Read long documents", "Use more than one tool"]
  answer: 0
  explain: That is why prompt injection becomes “agent goal hijack”.
:::end

## Sources

- OWASP GenAI Security Project, [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), published 9 Dec 2025 (ASI01). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). Checked 26 Oct 2026.
