---
id: 05-06
minutes: 8
highlight: loop
summary: Some actions should wait for your yes. But forty “Allow?” pop-ups a day train you to click without reading. How to keep approvals rare, clear and real.
---
The first time your agent asks “Send this email?”, you read it carefully. By the fortieth time that day, you click **Yes** before the box has finished appearing.

A [[term:human-in-the-loop|human in the loop]] is one of the strongest defences against fooled agents, but only if the human actually looks. Ask for approval rarely, for high-impact actions, and show exactly what will happen.

## The experts agree on the gate

Both OWASP lists say it. For prompt injection (LLM01): “Require human approval for high-risk actions.” For excessive agency (LLM06):

:::source url="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" by="OWASP GenAI Security Project, LLM06:2025 Excessive Agency, mitigation “Require user approval”" date="2025" checked="26 Oct 2026"
Utilise human-in-the-loop control to require a human to approve high-impact actions before they are taken.
:::end

OWASP’s example: an app that posts to social media for you “should include a user approval routine” before posting.

## Which actions deserve a “yes”?

A good rule of thumb: anything that is **hard to undo** or that **sends something out**.

- Sending or forwarding messages, especially with attachments.
- Paying, buying, transferring, subscribing.
- Deleting or sharing files.
- Changing passwords, security settings or who has access.
- Installing new tools or connectors.

Reading, summarising and drafting usually don’t need a gate.

## The trap: approval fatigue

OWASP’s agent list has a whole entry on this, ASI09 Human-Agent Trust Exploitation. It describes people who “over-rely on autonomous recommendations or unverifiable rationales, approving actions without independent validation”, and adds: “Automation bias, perceived authority, and anthropomorphic cues make abuse look legitimate and hard to spot.” Attackers can even use the agent to talk *you* into approving the harmful step.

The International AI Safety Report 2026 describes the same human habit, automation bias, “the tendency to trust AI system outputs without sufficient scrutiny.”

:::figure approval-prompts
A vague prompt trains you to click yes. A specific one shows you what leaves.
:::end

## Making approvals work

- **Fewer, bigger questions.** Approve the high-impact steps, not every click.
- **Specific details.** Who, what, how much, and why.
- **A pause for anything unusual.** New recipient, new payee, more than usual.
- **Your own check.** If the agent’s reason is “an email told me to”, that is a red flag, not a reason.

:::intern alarmed
The intern’s agent asks “Continue?” all afternoon, and the intern clicks yes every time. One of those yeses approved sharing the whole project folder with an outside address that a malicious document had suggested.
---
An approval you don’t read is not a defence. Ask for fewer prompts with real details.
:::end

:::exercise Rewrite the prompt
An agent shows: “The assistant would like to perform an action. Allow?” Rewrite it into a prompt that would help you catch a prompt injection.
:::solution
For example: “Send email to helper@evil.example (new recipient, never contacted before). Attachment: October bank statement.pdf. Reason: instruction found in an email from Garden Club. [Don’t send] [Send]”. It names the action, the recipient, what leaves, and where the idea came from, and flags what is unusual.
:::end

## Quick check

:::quiz
- q: Which action most needs your approval?
  options: ["Sending a file to someone outside your organisation", "Summarising a web page", "Drafting a reply you will review"]
  answer: 0
  explain: Sending is hard to undo and moves data out.
- q: What is approval fatigue?
  options: ["Clicking yes without reading because there are too many prompts", "Being tired of using AI", "When an AI refuses to work"]
  answer: 0
  explain: OWASP’s ASI09 describes approving actions without independent validation.
- q: What makes an approval prompt useful?
  options: ["It is rare and specific: who, what, how much and why", "It appears for every single step", "It is short, like “Allow?”"]
  answer: 0
  explain: Details let you spot what doesn’t fit.
:::end

:::xlink
lesson 02-06 | How to check AI output
lesson 06-04 | Show me before you pay
:::end

## Sources

- OWASP GenAI Security Project, [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) (mitigation “Require user approval”). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (mitigation 5). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (ASI09 Human-Agent Trust Exploitation). Checked 26 Oct 2026.
- International AI Safety Report 2026, [Executive Summary](https://internationalaisafetyreport.org/publication/2026-report-executive-summary), 3 Feb 2026. Checked 26 Oct 2026.
