---
id: 04-07
minutes: 9
highlight: Defences
pose: proud
summary: No single defence stops prompt injection, but layers do limit the damage. OWASP’s seven mitigations in plain words, and the Fake Inbox defence panel.
---
## The hook

A house with one good lock still gets burgled. A house with a lock, a light, a neighbour who notices and nothing valuable left by the window usually doesn’t. AI security works the same way.

## The one idea

**Since no filter catches every prompt injection, protect yourself with layers: give the AI less power, make it ask before risky actions, separate outside content, check what goes out, and test it like an attacker.**

:::figure defence-layers
Five layers, based on OWASP’s list of mitigations. Step through them.
:::end

## OWASP’s seven mitigations

OWASP’s 2025 entry lists seven ways to reduce prompt injection risk. In plain words:

1. **Constrain the model’s behaviour.** Tell it clearly what its job is, and to ignore attempts to change that. (Helpful, but can be overridden.)
2. **Define and check output formats.** If a summariser should only output a summary, block anything else, like links or commands.
3. **Filter inputs and outputs.** Look for known attack patterns and for sensitive data leaving.
4. **Least privilege.** Give the app its own limited access, only what it needs. More in lesson 05-02.
5. **Require human approval for high-risk actions.**
6. **Segregate and identify external content.** Mark what came from outside so the system treats it as less trusted.
7. **Adversarial testing.** Regularly attack your own system, treating the model as an untrusted user.

Number 5 is the one you can switch on yourself in many apps today:

:::source url="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" by="OWASP GenAI Security Project, LLM01:2025 Prompt Injection" date="2025" checked="26 Oct 2026"
Require human approval for high-risk actions. Implement human-in-the-loop controls for privileged operations to prevent unauthorized actions.
:::end

## Try it: the defence panel

Open **Level 3: defences**. Try each defence on its own, then together:

- **Label emails as untrusted** (mitigation 6). Notice the message: it helps, but the hidden text pretends to come from you.
- **Ask me before sending anything** (mitigation 5). The assistant is still fooled, but it must show you what it wants to send.
- **Remove the send tool** (mitigation 4). The assistant is still fooled, and it simply can’t do the harmful thing.

:::lab fake-inbox level=defence
## Your personal checklist

- In AI apps with email, files or payments, **turn on approval** for sending, sharing, buying and deleting.
- **Connect only what you need.** A summariser doesn’t need permission to send.
- **Be suspicious of urgent instructions in AI summaries.** Check the original.
- **Disconnect apps you no longer use.** Lesson 06-06 shows how to take permissions back.

:::intern proud
The intern sets up the work assistant again: read-only access to the inbox, no send tool, and an “ask me first” rule for calendar changes. The same Garden Club email arrives. The assistant is fooled, tries to forward the bank email, and simply can’t.
---
The intern didn’t make the AI smarter. The intern made it less powerful, and that was enough.
:::end

:::exercise Pick the layers
Your new AI travel assistant wants access to your email, calendar and saved card to “book trips for you”. Choose three settings or limits that would make a prompt injection in a hotel email much less harmful.
:::solution
Examples: approval before any booking or payment (human in the loop); access only to travel-related emails or a separate travel inbox (least privilege); a spending cap or a virtual card with a small limit; no permission to send email on your behalf; and checking any “change of payment details” directly with the hotel. Each limits what a fooled assistant can do.
:::end

## Quick check

:::quiz
- q: Which defence still works when the AI has been completely fooled?
  options: ["Removing its ability to do the harmful action, or requiring your approval first", "Telling it in its instructions to ignore attacks", "Using a longer prompt"]
  answer: 0
  explain: Limits and approvals don’t depend on the model noticing the attack.
- q: What does “least privilege” mean for an AI app?
  options: ["Give it only the access it needs for its job", "Give it the cheapest subscription", "Let it decide what access it needs"]
  answer: 0
  explain: OWASP lists least privilege as a mitigation; a summariser does not need to send.
- q: Why is labelling outside content as untrusted helpful but not enough?
  options: ["Attackers can write text that pretends to come from you, and the model may still follow it", "Labels slow the AI down", "Labels are illegal in some countries"]
  answer: 0
  explain: Labels help the model, but they are not a wall.
:::end

:::xlink
lesson 05-02 | Permissions: what can it touch?
lesson 05-06 | Humans in the loop
:::end

## Sources

- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (“Prevention and Mitigation Strategies”, items 1 to 7). Checked 26 Oct 2026.
