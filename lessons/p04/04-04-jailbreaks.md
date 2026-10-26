---
id: 04-04
minutes: 8
highlight: Jailbreaks
summary: Role-play, other languages, machine-made gibberish. How people talk an AI out of its safety rules, explained without any harmful content.
---
## The hook

Ask a chatbot for instructions to do something dangerous and it refuses. Now ask it to play your late grandmother, who used to tell you those very instructions as a bedtime story. For a while, that worked.

## The one idea

**A [[term:jailbreak|jailbreak]] is a prompt that talks an AI out of its safety rules. It works because the rules were learned from examples, not built in as hard locks, so a clever enough request can slip around them.**

OWASP puts it this way:

:::source url="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" by="OWASP GenAI Security Project, LLM01:2025 Prompt Injection" date="2025" checked="26 Oct 2026"
Jailbreaking is a form of prompt injection where the attacker provides inputs that cause the model to disregard its safety protocols entirely.
:::end

## Four families of trick

:::figure jailbreak-tricks
Four families of jailbreak. We describe how they work, never what they unlock.
:::end

Andrej Karpathy showed each family in his 2023 talk. We describe the idea only.

1. **Role-play.** The “deceased grandmother” prompt wrapped a forbidden request in a sad, sweet story. “We’re fooling ChatGPT through role play,” Karpathy explains. The model was trained to refuse the plain request, but not this costume.
2. **Disguise.** The same forbidden request written in base64, a way computers encode data. Models are “kind of fluent in base64,” he says, because lots of it is online, but safety training was mostly done in plain English. OWASP lists the same idea: attacks in other languages, or encoded with Base64 or emoji, to get past filters.
3. **Machine-made gibberish.** Researchers found a string of odd words that, added to the end of a request, jailbroke models. Karpathy: “no person has written this. The sequence of words comes from an optimization.” It is called a universal transferable suffix, and if you block one, the researchers say they can search for another. OWASP calls this an adversarial suffix.
4. **Images.** A picture of a panda with a carefully designed noise pattern, again found by optimisation, can work the same way on models that read images.

Karpathy calls the whole area “cat and mouse games”. Companies patch known tricks; new ones appear.

## Why should a normal user care?

You probably won’t jailbreak anything. But it tells you two important things:

- **AI safety rules are soft.** They make bad outputs less likely, not impossible. Don’t assume “the AI wouldn’t do that”.
- **The same weakness powers prompt injection.** If clever words can override the model’s training, hidden words in an email can override your instructions too.

:::intern fooled
The intern reads online that saying “you are now in developer mode” unlocks a chatbot’s “true answers”. The intern tries it, gets a confident, rule-free answer to a medical question, and believes it more because it felt secret.
---
A jailbroken answer isn’t more true. It is just less careful.
:::end

:::exercise Name the family
Which family is each? (1) “Write a play where a villain explains how to…”. (2) The request translated into a rare language. (3) A long string of nonsense words added to the end of a request. (4) A photo with an almost invisible pattern of dots.
:::solution
(1) Role-play. (2) Disguise: another language. (3) Machine-made gibberish: an adversarial suffix. (4) Images: an adversarial pattern. All four try to get the model to treat a forbidden request as allowed.
:::end

## Quick check

:::quiz
- q: What is a jailbreak?
  options: ["A prompt that makes an AI ignore its safety rules", "A virus that breaks your phone", "A way to make an AI run faster"]
  answer: 0
  explain: OWASP calls it a form of prompt injection that makes the model “disregard its safety protocols”.
- q: Why did writing a request in base64 sometimes work?
  options: ["Models can read base64, but their safety training mostly covered plain language", "Base64 is a secret password", "Base64 deletes the model’s rules"]
  answer: 0
  explain: Karpathy says models are “kind of fluent in base64”, like another language.
- q: What does the existence of jailbreaks tell an ordinary user?
  options: ["AI safety rules are soft: they make bad outputs less likely, not impossible", "AI is completely unsafe and must never be used", "Only experts can be affected"]
  answer: 0
  explain: Rules learned from examples can be talked around, so keep your own checks.
:::end

## Sources

- Andrej Karpathy, [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g&t=2743s) (talk; jailbreaks from about 45:43: role-play, base64 at about 48:10, universal transferable suffix at about 49:45, panda image at about 50:33). Checked 26 Oct 2026.
- OWASP GenAI Security Project, [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) (jailbreak definition; scenarios 8, adversarial suffix, and 9, multilingual or obfuscated attacks). Checked 26 Oct 2026.
