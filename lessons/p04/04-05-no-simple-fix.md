---
id: 04-05
minutes: 7
highlight: simple fix
summary: Why can’t AI companies just patch prompt injection? Because instructions and information travel down the same channel. Defences help, but none is complete.
---
Web developers fixed most SQL injection years ago, the attack that inspired the name “prompt injection”. So why, years after the first public prompt injection examples, do AI companies still say they can’t fully fix it?

In an AI model, your instructions and the content it reads arrive as the same thing: words. There is no reliable wall between them, so defences reduce the risk but do not remove it.

:::figure one-channel
Websites can separate code from data with strict rules. A language model reads everything as one stream of words.
:::end

## Code and data share one channel

SQL injection was fixed by keeping data in a separate box that is never treated as commands. Programmers pass the user’s input as a parameter, and the database cannot run it. A language model has no such box. Your request, the email and the web page are all turned into [[term:token|tokens]] and read together, so a sentence in the email can act like an instruction.

You can train the model to be suspicious of instructions in content, and companies do. But an attacker only needs one phrasing that works. The fix that holds is to change what the model is *allowed* to do when it is fooled.

## What the experts say

OpenAI wrote this in December 2025, while explaining how it defends its AI browser agent:

:::source url="https://openai.com/index/hardening-atlas-against-prompt-injection/" by="OpenAI, “Continuously hardening ChatGPT Atlas against prompt injection attacks”" date="22 Dec 2025" checked="26 Oct 2026"
Prompt injection, much like scams and social engineering on the web, is unlikely to ever be fully “solved”.
:::end

OWASP’s entry on prompt injection is just as careful: “it is unclear if there are fool-proof methods of prevention for prompt injection.” And Simon Willison, who coined the term, points out that filters that catch most attacks are not enough, because an attacker only needs one that works: “in web application security 95% is very much a failing grade.”

## So what *does* help?

If you can’t stop the model from being fooled every time, you **limit what a fooled model can do**:

- It can’t send email if it doesn’t have a send tool.
- It can’t pay a stranger if payments need your “yes”, or if strangers aren’t on its list.
- It can’t leak your files if it can’t read them in the first place.

The last lesson of this phase covers these defences, and Phase 05 shows how they apply to agents.

:::intern proud
The intern’s team argues about whether to add a stronger filter or remove the assistant’s ability to send email. The filter catches 19 of 20 test attacks. The intern points out that the twentieth still sends the bank statement, and that without a send tool, all twenty fail.
---
When you can’t make the AI unfoolable, make being fooled harmless.
:::end

:::exercise Filter or limit?
A company’s customer-service AI can read customer records and issue refunds. A test shows prompt injections get through its filter 3 times out of 100. Suggest two changes that would help even when the filter fails.
:::solution
Examples: require a human to approve refunds above a small amount; cap refunds per day; only allow refunds to the original payment method; give the AI read access only to the record of the customer it is talking to. Each limits the damage of a successful injection instead of relying on catching it. As Willison puts it, 95% is a failing grade.
:::end

## Quick check

:::quiz
- q: Why is prompt injection hard to fix completely?
  options: ["Instructions and content reach the model as the same kind of thing: words", "AI companies haven’t tried", "Computers can’t read emails"]
  answer: 0
  explain: There is no reliable wall between your request and the text it reads.
- q: What did OpenAI write about prompt injection in December 2025?
  options: ["It is unlikely to ever be fully “solved”", "It was fixed in 2024", "It only affects old models"]
  answer: 0
  explain: OpenAI compared it to scams and social engineering on the web.
- q: If filters can’t catch every attack, what is the best design response?
  options: ["Limit what the AI can do, so a fooled AI can’t do much harm", "Use two filters and stop worrying", "Ask the AI to be more careful"]
  answer: 0
  explain: Limits work even when the model is fooled.
:::end

## Sources

- OpenAI, [Continuously hardening ChatGPT Atlas against prompt injection attacks](https://openai.com/index/hardening-atlas-against-prompt-injection/), 22 Dec 2025. Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (prevention section). Checked 26 Oct 2026.
- Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), 16 Jun 2025 (“95% is very much a failing grade”). Checked 26 Oct 2026.
- Simon Willison, [Prompt injection attacks against GPT-3](https://simonwillison.net/2022/Sep/12/prompt-injection/), 12 Sep 2022. Checked 26 Oct 2026.
