---
id: 05-02
minutes: 8
highlight: touch
summary: Least privilege in plain words. Give an agent only the access it needs, for only as long as it needs it, and check what a connection really allows.
---
OWASP names three root causes of “excessive agency” in AI apps: too many tools, too much access and too much freedom. Each one is a setting somebody chose, usually for convenience.

[[term:least-privilege|Least privilege]]: give an agent only the access it needs for the job, for only as long as it needs it. If it is fooled or makes a mistake, the damage stays small.

:::figure least-privilege
A master key versus a key for one job.
:::end

## Three ways to give too much

OWASP’s entry on Excessive Agency names the root causes:

:::source url="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" by="OWASP GenAI Security Project, LLM06:2025 Excessive Agency" date="2025" checked="26 Oct 2026"
The root cause of Excessive Agency is typically one or more of: excessive functionality; excessive permissions; excessive autonomy.
:::end

In everyday words:

- **Too many tools (functionality).** OWASP’s example: an agent only needs to *read* documents, but the add-on it uses can also *modify and delete* them.
- **Too much access (permissions).** The tool reaches more than the job needs: all your files instead of one folder, all your email instead of one label.
- **Too much freedom (autonomy).** It takes high-impact actions without checking. OWASP’s example: an add-on that “performs deletions without any confirmation from the user.”

OWASP’s first fix is simple: “Limit the extensions that LLM agents are allowed to call to only the minimum necessary.” If the agent doesn’t need to open web links, don’t give it a tool that can.

## Broad keys make big blast radiuses

The security guidance for MCP, a popular standard for connecting AI apps to tools (lesson 05-05), warns about connections that ask for every permission up front. If such a broad access token is stolen, the result is an “expanded blast radius”: the attacker can reach unrelated tools and data. Narrow permissions, asked for only when needed, limit that.

## What to look for when you connect an app

When an AI app asks to connect to your Google, Microsoft or other account, read the permission screen:

- **Read only, or read and write?** Summaries need read only.
- **Which parts?** Calendar only, or mail, contacts and files too?
- **For how long?** Can you set an end date, or remove it easily later?
- **Can it act without asking?** Look for settings like “ask before sending”.

:::intern proud
This time the intern wants an agent to prepare a weekly meeting summary. Instead of “full access to Google account”, the intern connects calendar read-only and one shared notes folder, and sets a reminder to review the connection in a month.
---
If the agent is tricked tomorrow, the worst it can do is read a calendar.
:::end

:::exercise Trim the permissions
An AI expense helper asks for: read and send email, read all files, access to your bank account, and permission to make payments. Its job is to collect receipts from email and fill a monthly spreadsheet. Which permissions does it actually need?
:::solution
Read access to email (ideally only receipts or a dedicated label) and write access to one spreadsheet. It doesn’t need to send email, read all files, see your bank account or make payments. If it offers no narrower option, use a separate email address for receipts, or don’t connect it.
:::end

## Quick check

:::quiz
- q: What does least privilege mean?
  options: ["Only the access needed, for only as long as needed", "The cheapest version of an app", "Letting the agent choose its own permissions"]
  answer: 0
  explain: Less access means a fooled agent can do less damage.
- q: Which is an example of “excessive functionality”?
  options: ["A tool meant to read documents that can also delete them", "An agent that is slow", "An agent that asks before sending"]
  answer: 0
  explain: That is OWASP’s own example.
- q: Why is a broad access token risky?
  options: ["If stolen, it opens unrelated tools and data: an expanded blast radius", "It costs more money", "It makes the AI less accurate"]
  answer: 0
  explain: The MCP security guidance warns about broad scopes for exactly this reason.
:::end

:::xlink
lesson 04-07 | Defences that help
security 05.04 | Never let a stranger control your screen
security 05.05 | Apps only from the official store
security 05.03 | Fake "virus" warnings and tech-support calls
:::end

## Sources

- OWASP GenAI Security Project, [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) (root causes, examples, mitigation 1 “Minimize extensions”). Checked 26 Oct 2026.
- Model Context Protocol, [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices) (“Scope Minimization”). Checked 26 Oct 2026.
