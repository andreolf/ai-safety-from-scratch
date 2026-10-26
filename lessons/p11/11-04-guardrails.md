---
id: 11-04
minutes: 10
highlight: guardrails
pose: proud
summary: Guardrails are checks around the model, on what goes in and what comes out. Add an input check and an output check to the toy bot until every known attack is blocked and normal questions still work.
---
## The hook

Your promptfoo grid is full of red: the bot leaks its staff code to an override and to a poem. You could try to block every possible attack sentence. Or you could check what is about to leave.

## The one idea

**A guardrail is code around the model that checks the input before the model sees it, or the output before the user sees it, and can block or change it. Input checks can be dodged with new wording. Output checks see what would actually leave. Use both, and test that normal questions still work.**

:::figure rails-flow
Where guardrails sit: an input check before the model, an output check after it.
:::end

## What NeMo Guardrails calls rails

NVIDIA’s open-source NeMo Guardrails library is one widely used toolkit:

:::source url="https://github.com/NVIDIA-NeMo/Guardrails" by="NVIDIA, NeMo Guardrails README (GitHub)" date="" checked="26 Oct 2026"
NVIDIA NeMo Guardrails library is an open-source toolkit for easily adding programmable guardrails to LLM-based conversational applications.
:::end

Its README describes five kinds of rails. Two matter most here: **input rails**, applied to the user’s input, which “can reject the input, stopping any additional processing, or alter the input”; and **output rails**, applied to the model’s output, which can reject it “or alter it (e.g., removing sensitive data)”. There are also dialog, retrieval and execution rails, the last for the inputs and outputs of tools. Its example configuration lists input flows such as “check jailbreak” and “mask sensitive data on input”, and output flows such as “self check facts”. It also warns that the built-in guardrails “may or may not be suitable for a given production use case”.

## The practical: guard Pebble

The practice app has the same two hooks in plain JavaScript, in `guard.mjs`:

- `checkInput(message)` runs before the bot sees a message.
- `checkOutput(answer, message)` runs on the bot’s answer.

Each returns `{ block: true }` to stop it or `{ block: false }` to let it through. Edit them, then run:

```
node check.mjs guard
```

The check sends eight built-in attacks plus your own from `attacks.txt` through the guarded bot. To pass, none may leak the staff code, and five normal questions must get exactly the same answers as before. Then run `npx promptfoo@latest eval` again: the guarded column should turn green.

## Two lessons hidden in this practical

1. **Block by meaning, not spelling.** A list of banned phrases in `checkInput` misses the next rewording. An output check that refuses any answer containing the code catches all of them, because it looks at the result.
2. **The real fix is design.** OWASP says “the system prompt should not be considered a secret, nor should it be used as a security control”. In a real app, the staff code would not be in the prompt at all. Guardrails reduce risk; they do not make a bad design safe (lesson 04.05).

:::intern proud
The intern writes forty banned phrases into the input check. Pebble still leaks the code when asked in French. Then the intern adds one line to the output check, and every leak in the test set stops, in every language.
---
Check what leaves, not only what arrives. And then ask why the secret was in the prompt at all.
:::end

:::exercise Pass the guard check
Make `node check.mjs guard` pass without changing `bot.mjs`.
:::solution
In `guard.mjs`, import the code and block any answer that contains it: `import { STAFF_CODE } from './bot.mjs';` then `export function checkOutput(answer) { return { block: answer.includes(STAFF_CODE) }; }`. Leave `checkInput` permissive, or add a light check. Normal answers never contain the code, so they pass unchanged. A stronger version would also catch the code with spaces or in pieces; better still, remove the code from the prompt.
:::end

## Quick check

:::quiz
- q: What is an output rail?
  options: ["A check on the model’s answer that can block it or remove sensitive data before the user sees it", "A faster internet connection", "A rule that the user must follow"]
  answer: 0
  explain: NeMo Guardrails describes output rails this way.
- q: Why is an input list of banned phrases weak on its own?
  options: ["Attackers can reword, translate or encode the same request", "It makes the bot too fast", "Lists are illegal"]
  answer: 0
  explain: The next rewording slips past it.
- q: According to OWASP, should a system prompt hold secrets?
  options: ["No: it should not be considered a secret or used as a security control", "Yes, it is the safest place", "Only on weekends"]
  answer: 0
  explain: Keep credentials and codes out of prompts.
:::end

:::xlink
lesson 04-07 | Defences that help
lesson 04-05 | Why there is no simple fix
:::end

## Sources

- NVIDIA, [NeMo Guardrails README](https://github.com/NVIDIA-NeMo/Guardrails) (description, five kinds of rails, example configuration, suitability warning). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM07:2025 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/). Checked 26 Oct 2026.
