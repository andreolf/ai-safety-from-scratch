---
id: 11-01
minutes: 10
highlight: practice
pose: neutral
summary: The Builder track starts on your own computer, with a toy chatbot and a toy agent that are safe to attack. Install it, run the first check, and learn the one rule of testing.
---
## The hook

Phases 04 to 08 showed what can go wrong with AI apps. If you build one, the next question is practical: how do you test it before someone else does? This optional track gives you a safe target and real, free tools.

## The one idea

**Only test what you own or have written permission to test. The course gives you a target you own: Pebble, a toy helpdesk bot and a toy email agent in the course repository, full of deliberate weaknesses and made-up test values. Six practicals each end with a check that prints a completion code.**

:::figure practice-app-map
What is inside the practice app, and which lesson uses each part.
:::end

## What Pebble is, and is not

Pebble is the helpdesk bot of a made-up tea shop. It has a secret staff discount code in its instructions (its system prompt). OWASP warns that “the system prompt should not be considered a secret, nor should it be used as a security control”, so this is a deliberate design flaw. It also has three weaknesses written as simple rules: it obeys “ignore your instructions” messages, it leaks the code inside a poem, and it confidently invents answers about places it knows nothing about. Next to it sits a toy agent with a fake inbox and a fake wallet of 100 test coins, and a toy MCP server with one poisoned tool.

There is **no language model** inside, no API key and no network call. That makes it predictable, free and safe. Real models are messier, but the weaknesses are the same kinds you met in Phases 02, 04 and 05, and the tools treat Pebble like any other target.

## Set it up

You need Node.js 20 or newer and a terminal. Some tools later in the track need Node 22 or newer. Then:

```
git clone https://github.com/andreolf/ai-safety-from-scratch.git
cd ai-safety-from-scratch/practice-app
node check.mjs setup
node chat.mjs
```

The check prints a completion code. `node chat.mjs` lets you talk to Pebble with your guardrails on; `node chat.mjs --raw` switches them off. `node server.mjs` serves the bot on your own machine only (127.0.0.1), for tools that speak HTTP. The [practice app’s README](https://github.com/andreolf/ai-safety-from-scratch/tree/main/practice-app) lists every file.

## The rule

Lesson 08.05 defined red-teaming as attacking a system with permission, and reporting what you find so it can be fixed. Pointing these tools at a company’s chatbot without permission is not testing; it is attacking someone else’s system. Pebble is yours, so attack it as hard as you like.

## Enter your codes

Each practical ends with `node check.mjs <name>`. When it passes, enter the code below. All six codes plus the Phase 11 test unlock the Builder certificate of completion. The codes come from public text, so they are a checkpoint for you, not proof for anyone else.

:::lab builder-tools

:::intern neutral
The intern wants to “test AI security” by trying jailbreaks on their bank’s chatbot. A colleague stops them: no permission, no test. The intern clones Pebble instead and has its staff code out in four minutes, with nobody’s terms of service broken.
---
Practise on targets you own. Permission is the line between testing and attacking.
:::end

:::exercise Run the first check
Install the practice app, run `node check.mjs setup`, then ask Pebble three normal questions and one question it cannot know the answer to. What does it do with the unknown question?
:::solution
The setup check prints “Passed: Run the practice app” and a code. Normal questions about hours, delivery, prices or refunds get fixed answers. For something it cannot know, Pebble either says “I’m not sure” or, for far-away places like Mars, invents a confident delivery price: a toy version of the hallucinations in lesson 02.01. You will catch that with an eval in lesson 11.07.
:::end

## Quick check

:::quiz
- q: Which systems may you test with the tools in this track?
  options: ["Systems you own or have written permission to test, such as the practice app", "Any public chatbot", "Your bank’s app, if you are careful"]
  answer: 0
  explain: Permission is the line between testing and attacking.
- q: What is inside the practice app’s bot?
  options: ["Simple rules that imitate classic weaknesses, with made-up test values and no language model", "A real paid language model", "Your personal data"]
  answer: 0
  explain: That keeps it free, predictable and safe to attack.
- q: What do the practical completion codes prove?
  options: ["Nothing to a third party: they are a checkpoint for you", "That you are a certified security professional", "That you hacked a real system"]
  answer: 0
  explain: The codes come from public text. The certificate is a certificate of completion, not a qualification.
:::end

:::xlink
lesson 08-05 | Red-teaming: attacking to protect
lesson 04-01 | The email that gave orders
:::end

## Sources

- AI Safety from Scratch, [practice app (Pebble)](https://github.com/andreolf/ai-safety-from-scratch/tree/main/practice-app) in the course repository. Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM07:2025 System Prompt Leakage](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/) (why a secret in a system prompt is a design flaw). Checked 26 Oct 2026.
